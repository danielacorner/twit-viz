import React, { useEffect, useRef, useState } from "react";
import { ForceGraph2D, ForceGraph3D } from "react-force-graph";
import NodeTooltip from "../NodeTooltip";
// https://www.npmjs.com/package/react-force-graph
import styled from "styled-components/macro";
import { useForceGraphProps } from "./useForceGraphProps";
import {
  useConfig,
  useLikesByUserId,
  useRetweetsByTweetId,
  useTweets,
} from "../../providers/store";
// https://www.npmjs.com/package/d3-force-cluster
import { Tweet } from "../../types";
import { uniqBy } from "lodash";
import { EMPTY_TWEET } from "../../utils/emptyTweet";
import GraphRightClickMenu from "./GraphRightClickMenu";
import { useTheForce } from "./useTheForce";
import { useFetchBotScoreForTweet } from "components/common/useFetchBotScoreForTweet";

const GraphStyles = styled.div`
  width: 100%;
`;

const NetworkGraph = () => {
  return (
    <GraphStyles>
      <Graph />
      <NodeTooltip />
      <GraphRightClickMenu />
    </GraphStyles>
  );
};

// https://github.com/vasturiano/react-force-graph
function Graph() {
  const { fgRef, forceGraphProps } = useForceGraphProps();
  const { is3d, showUserNodes, replace } = useConfig();
  const tweets = useTweets();
  const likesByUserId = useLikesByUserId();
  const retweetsByTweetId = useRetweetsByTweetId();

  // uncomment to grab the current state and copy-paste into mockTweetsData.json

  // console.log("🌟🚨: Graph -> mockTweetsData", {
  //   tweets,
  //   retweetsByTweetId,
  //   likesByUserId,
  // });

  // dynamic force graph updates WITHOUT re-rendering every node example: https://github.com/vasturiano/react-force-graph/blob/master/example/dynamic/index.html

  // New force graph nodes should be able to mount without causing all others to re-mount
  // But, for some reason, using graphData as ForceGraph props caused every node to re-render on every change of graphData.

  // Instead, it seems to work if we manually sync it to some state,
  // and use the setState (setGraph) callback function to update

  // sync internal state to prevent node re-renders
  const [graph, setGraph] = useState({ nodes: [], links: [] });
  const [userNodes, setUserNodes] = useState([] as Tweet[]);

  const userToLikesLinks = showUserNodes
    ? userNodes.reduce((acc, userNode) => {
        const userLikes = likesByUserId[userNode.id_str];
        if (userLikes) {
          const likedTweetLinks = userLikes.map((likedTweetId) => {
            const source = Number(likedTweetId);
            const target = Number(userNode.id_str);
            return { source, target };
          });
          return [...acc, ...likedTweetLinks];
        } else {
          return acc;
        }
      }, [])
    : [];

  const tweetToRetweetsLinks = showUserNodes
    ? tweets.reduce((acc, tweet) => {
        const retweetsOfThisTweet = retweetsByTweetId[tweet.id_str];
        if (retweetsOfThisTweet) {
          const linksFromRetweetsOfThisTweet = retweetsOfThisTweet.map(
            (idOfOriginalTweet) => {
              const source = Number(idOfOriginalTweet);
              const target = Number(tweet.id_str);
              return { source, target };
            }
          );
          return [...acc, ...linksFromRetweetsOfThisTweet];
        } else {
          return acc;
        }
      }, [])
    : [];

  const graphWithUsers = {
    ...graph,
    nodes: [...graph.nodes, ...(showUserNodes ? userNodes : [])],
    links: [
      ...graph.links,
      ...tweetToRetweetsLinks,
      ...(showUserNodes
        ? [
            // links from each user to their tweets
            ...tweets.map((t) => ({
              // source: its user
              source: Number(t.user.id_str),
              // target: the tweet
              target: Number(t.id_str),
            })),
            // links from each user to their likes
            ...userToLikesLinks,
          ]
        : []),
    ],
  };

  //
  // show/hide user nodes
  //

  useEffect(() => {
    if (!showUserNodes) {
      setUserNodes([]);
    } else {
      // add nodes for each user

      const nonUniqueUserNodes: Tweet[] = tweets.map((tweet) => ({
        ...EMPTY_TWEET,
        id: Number(tweet.user.id_str),
        id_str: tweet.user.id_str,
        user: tweet.user,
        isUserNode: true,
      }));

      // deduplicate
      const newUserNodes = uniqBy(nonUniqueUserNodes, (d) => d.user.id_str);
      setUserNodes(newUserNodes);
    }
  }, [showUserNodes, tweets]);

  //
  // sync graph with store
  //

  useEffect(() => {
    const tweetsWithUser: Tweet[] = tweets
      // id <- +id_str
      .map((t) => ({
        ...t,
        id: Number(t.id_str),
      }))
      .filter((t) => Boolean(t.user?.id_str));
    // filter out tweets without users

    const nodeIds = graph.nodes.map((node) => node.id_str);

    // to prevent existing node re-renders, we'll spread existing nodes, and only spread new nodes on the end

    // if replacing, replace all
    const newNodes = replace
      ? tweets
      : // new nodes are ones whose ids aren't already in the graph
        tweetsWithUser.filter((node) => !nodeIds.includes(node.id_str));

    // * consider spreading newLinks if not doing so causes a performance issue

    setGraph((prev) => {
      return {
        ...prev,
        links: [],
        nodes: [
          ...(replace
            ? []
            : prev.nodes) /* .filter(tweet=>showUserNodes?true:!tweet.isUserNode)*/,
          ...newNodes,
        ],
      };
    });
    // eslint-disable-next-line
  }, [tweets]);

  const fg = fgRef.current as any;

  //
  // use the force!
  //
  useTheForce(fg, graph);

  // when new tweets arrive, fetch their bot scores
  useGenerateBotScoresOnNewTweets();

  return (
    <div>
      {is3d ? (
        // https://www.npmjs.com/package/react-force-graph
        <ForceGraph3D
          ref={fgRef}
          graphData={graphWithUsers}
          {...forceGraphProps}
        />
      ) : (
        <ForceGraph2D
          ref={fgRef}
          graphData={graphWithUsers}
          {...forceGraphProps}
        />
      )}
    </div>
  );
}

export default NetworkGraph;

/** when tweets change, fetch bot scores for each */
function useGenerateBotScoresOnNewTweets() {
  const tweets = useTweets();
  const fetchBotScoreForTweet = useFetchBotScoreForTweet();

  // faily rate limit of 500 so just fetch 1 per load
  const foundOne = useRef(false);

  // fetch only every 1s due to RapidAPI free tier rate limit
  useEffect(() => {
    // fetch the first one only
    tweets.forEach((tweet) => {
      if (!foundOne.current && !tweet.botScore) {
        console.log("🌟🚨: useGenerateBotScoresOnNewTweets -> tweet", tweet);
        setTimeout(() => {
          fetchBotScoreForTweet(tweet);
        }, 1001);
        foundOne.current = true;
      }
    });
  }, [tweets]);
}

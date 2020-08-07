import React, { useState } from "react";
import styled from "styled-components/macro";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import useStore, { useSelectedNode } from "../../store";

export const USER_INFO_WIDTH = 200;

const UserInfoStyles = styled.div`
  height: ${USER_INFO_WIDTH}px;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
`;
export default function UserInfo() {
  const tweet = useSelectedNode();
  console.log("🌟🚨: UserInfo -> tweet", tweet);
  const addTweetsFromServer = useStore((state) => state.addTweetsFromServer);
  const [loading, setLoading] = useState(false);
  const [numTweets, setNumTweets] = useState(50);
  const user = tweet?.user;
  // const [user, setUser] = useState(tweet?.user || null);

  // fetch user profile on mount
  // useEffect(() => {
  //   fetch(
  //     `/api/user_info?id_str=${user?.id_str}&screen_name=${user?.screen_name}`
  //   )
  //     .then((resp) => resp.json())
  //     .then(({ data }) => {
  //       console.log("🌟🚨: UserInfo -> resp", data);
  //       setUser(data);
  //     });
  // }, []);

  const fetchTimeline = async () => {
    setLoading(true);
    const resp = await fetch(
      `/api/user_timeline?id_str=${user?.id_str}&num=${numTweets}`
    );
    const { data } = await resp.json();
    setLoading(false);
    addTweetsFromServer(data);
  };
  const profileImgUrl = `${user?.profile_image_url_https.slice(
    0,
    -"_normal.jpg".length
  )}.jpg`;

  return (
    <UserInfoStyles>
      <a
        href={`https://twitter.com/${user?.screen_name}/`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="avatar">
          <img src={profileImgUrl} alt="" />
          <img src={user?.profile_image_url_https} alt="" />
        </div>
      </a>
      <div className="screenName">{user?.screen_name}</div>
      <Button variant="outlined" disabled={loading} onClick={fetchTimeline}>
        {loading ? <CircularProgress /> : "Fetch user timeline"}
      </Button>
      <TextField
        label="How many tweets?"
        value={numTweets}
        onChange={(e) => setNumTweets(+e.target.value)}
        type="number"
        inputProps={{
          step: 10,
        }}
      />
    </UserInfoStyles>
  );
}

import { ClickAwayListener, Modal } from "@material-ui/core";
import TweetContent from "components/TweetContent/TweetContent";
import { TOOLTIP_WIDTH } from "components/NetworkGraph/NodeTooltip";
import useStore, { useSelectedNode } from "providers/store";
import React from "react";
import styled from "styled-components/macro";

const SelectedTweetModal = () => {
  const selectedNode = useSelectedNode();
  const setSelectedNode = useStore((state) => state.setSelectedNode);
  return (
    <Modal open={Boolean(selectedNode)}>
      <SelectedTweetModalStyles>
        <ClickAwayListener onClickAway={() => setSelectedNode(null)}>
          <div className="tweetContentWrapper">
            {selectedNode && <TweetContent tweet={selectedNode} />}
          </div>
        </ClickAwayListener>
      </SelectedTweetModalStyles>
    </Modal>
  );
};

const SelectedTweetModalStyles = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  .tweetContentWrapper {
    box-sizing: content-box;
    padding: 1.5em;
    background: hsla(0, 0%, 0%, 0.8);
    max-width: ${TOOLTIP_WIDTH}px;
  }
`;

export default SelectedTweetModal;
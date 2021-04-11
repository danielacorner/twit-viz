import { Button } from "@material-ui/core";
import { Body1, ColumnDiv, RowDiv } from "components/common/styledComponents";
import { BtnStreamNewTweets } from "components/Controls/Buttons/BtnStreamNewTweets";
import { HowManyTweets } from "components/Controls/Inputs";
import { SearchForm } from "components/Controls/SearchForm";
import NetworkGraph from "components/NetworkGraph/NetworkGraph";
import { useConfig, useSetTweets } from "providers/store";
import React from "react";

import styled from "styled-components/macro";

const NavAndVizStyles = styled.div`
  display: grid;
  grid-gap: 0.5em;
  padding: 0.5em 1em;
`;
const NavBarStyles = styled.div`
  display: grid;
  grid-template-columns: 200px 140px auto 1fr auto auto;
  align-items: baseline;
  grid-gap: 1em;
`;

const NavAndViz = () => {
  return (
    <NavAndVizStyles>
      <NavBarStyles>
        <HowManyTweets />
        <BtnStreamNewTweets />
        <Body1 style={{ height: "fit-content" }}>or</Body1>
        <SearchForm />
        {/* <ColumnDiv
          style={{
            height: 42,
            transform: "translateY(-21px) scale(0.7)",
            transformOrigin: "left",
          }}
        >
          <BtnDeleteAllTweets />
        </ColumnDiv> */}
      </NavBarStyles>
      <RowDiv>
        <NetworkGraph />
      </RowDiv>
    </NavAndVizStyles>
  );
};

export default NavAndViz;

// function BtnDeleteAllTweets() {
//   const deleteAllTweets = useDeleteAllTweets();
//   return (
//     <Button color="secondary" variant="contained" onClick={deleteAllTweets}>
//       Delete all
//     </Button>
//   );
// }

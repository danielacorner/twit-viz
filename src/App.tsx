import React, { useState } from "react";
import "./App.css";
import NetworkGraph from "./components/NetworkGraph";
import { COLOR_BY, FILTER_BY } from "./utils/constants";
import Controls from "./components/Controls";
import { transformTweetsIntoGraphData } from "./utils/transformData";
import styled from "styled-components/macro";

export const CONTROLS_WIDTH = 200;

const AppStyles = styled.div`
  display: grid;
  grid-template-columns: ${CONTROLS_WIDTH}px 1fr;
`;

function App() {
  const [is3d, setIs3d] = useState(false);
  const [colorBy, setColorBy] = useState(
    COLOR_BY.sentiment as keyof typeof COLOR_BY | null
  );
  const [tweetsFromServer, setTweetsFromServer] = useState(null);
  const [isVideoChecked, setIsVideoChecked] = useState(false);
  const [isImageChecked, setIsImageChecked] = useState(false);
  const [countryCode, setCountryCode] = useState("All");
  const [lang, setLang] = useState("All");
  const allowedMediaTypes = [
    ...(isVideoChecked ? ["video"] : []),
    ...(isImageChecked ? ["photo"] : []),
  ];
  const mediaType =
    allowedMediaTypes.length === 2
      ? FILTER_BY.imageAndVideo
      : allowedMediaTypes.includes("photo")
      ? FILTER_BY.imageOnly
      : allowedMediaTypes.includes("video")
      ? FILTER_BY.videoOnly
      : null;

  return (
    <AppStyles className="App">
      <Controls
        {...{
          setTweetsFromServer,
          setIs3d,
          colorBy,
          setColorBy,
          setIsVideoChecked,
          setIsImageChecked,
          isVideoChecked,
          isImageChecked,
          mediaType,
          countryCode,
          setCountryCode,
          is3d,
          lang,
          setLang,
        }}
      />
      <NetworkGraph
        is3d={is3d}
        colorBy={colorBy}
        allowedMediaTypes={allowedMediaTypes}
        graphDataFromServer={
          tweetsFromServer && transformTweetsIntoGraphData(tweetsFromServer)
        }
      />
    </AppStyles>
  );
}

export default App;

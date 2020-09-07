import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Switch,
  Select,
  Button,
  TextField,
  CircularProgress,
  InputLabel,
  FormControl,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { FILTER_BY, FILTER_LEVELS } from "../../utils/constants";
import countryCodes from "../../utils/countryCodes";
import languages from "../../utils/languages";
import { useConfig, useSetTweets } from "../../providers/store";
import { TwoColFormStyles } from "./ControlsStyles";
import CheckIcon from "@material-ui/icons/Check";
import { Div } from "../DivStyles";
import styled from "styled-components/macro";
import SelectGeolocation from "./SelectGeolocation";

const FetchTweetsControlsStyles = styled.div`
  h4 {
    margin: 1em 0 0.5em;
  }
`;

const FetchTweetsControls = () => {
  return (
    <FetchTweetsControlsStyles className="fetchTweetsControls controlsContainer">
      <h3>Fetch New Tweets</h3>
      <SwitchReplace />
      <h4>Filters</h4>
      <TweetFilterControls />
      <h4>Stream Tweets</h4>
      <BtnStreamNewTweets />
      <h4>Search Tweets</h4>
      <SearchForm />
      <FetchUserTweetsForm />
    </FetchTweetsControlsStyles>
  );
};

export default FetchTweetsControls;

function TweetFilterControls() {
  return (
    <div className="tweetFilterControls">
      <HowManyTweets />
      <MediaTypeCheckboxes />
      <SelectFilterLevel />
      <SelectCountry />
      <SelectGeolocation />
      <SelectLanguage />
    </div>
  );
}

function BtnStreamNewTweets() {
  const { lang, countryCode, numTweets, filterLevel, mediaType } = useConfig();
  const setTweets = useSetTweets();

  const [loading, setLoading] = useState(false);

  const fetchNewTweets = async () => {
    setLoading(true);
    // after 10 seconds, stop loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);

    const langParam = lang !== "All" ? `&lang=${lang}` : "";
    const mediaParam = mediaType ? `&mediaType=${mediaType}` : "";
    const countryParam =
      countryCode !== "All" ? `&countryCode=${countryCode}` : "";

    const resp = await fetch(
      `/api/stream?num=${numTweets}&filterLevel=${filterLevel}${mediaParam}${countryParam}${langParam}`
    );

    const data = await resp.json();
    setLoading(false);
    clearTimeout(timer);

    setTweets(data);
  };

  return (
    <Button
      type="submit"
      className="btnFetch"
      disabled={loading}
      onClick={fetchNewTweets}
      variant="outlined"
    >
      {loading ? <CircularProgress /> : "Stream New Tweets"}
    </Button>
  );
}

// TODO: abstract forms
function SearchForm() {
  const {
    searchTerm,
    numTweets,
    setConfig,
    lang,
    mediaType,
    countryCode,
  } = useConfig();
  const [loading, setLoading] = useState(false);
  const setTweets = useSetTweets();

  const fetchSearchResults = async () => {
    setLoading(true);
    // after 10 seconds, stop loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);

    const langParam = lang !== "All" ? `&lang=${lang}` : "";
    const mediaParam = mediaType ? `&mediaType=${mediaType}` : "";
    const countryParam =
      countryCode !== "All" ? `&countryCode=${countryCode}` : "";
    const resp = await fetch(
      `/api/search?term=${searchTerm}&num=${numTweets}${langParam}${mediaParam}${countryParam}`
    );
    const data = await resp.json();
    setLoading(false);
    clearTimeout(timer);

    setTweets(data);
  };
  return (
    <TwoColFormStyles
      onSubmit={(e) => {
        e.preventDefault();
        fetchSearchResults();
      }}
    >
      <TextField
        label="Search for..."
        value={searchTerm}
        onChange={(e) => setConfig({ searchTerm: e.target.value })}
        type="text"
      />
      <IconButton disabled={loading || searchTerm === ""} type="submit">
        <CheckIcon />
      </IconButton>
    </TwoColFormStyles>
  );
}

function FetchUserTweetsForm() {
  const [userHandle, setUserHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const setTweets = useSetTweets();
  const { numTweets } = useConfig();

  const fetchUserTweets = async () => {
    setLoading(true);
    // after 10 seconds, stop loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10 * 1000);

    const resp = await fetch(
      `/api/user_timeline?screen_name=${userHandle}&num=${numTweets}`
    );
    const data = await resp.json();
    setLoading(false);
    clearTimeout(timer);

    setTweets(data);
  };

  return (
    <TwoColFormStyles
      onSubmit={(e) => {
        e.preventDefault();
        fetchUserTweets();
      }}
    >
      <TextField
        label={loading ? <CircularProgress /> : "Fetch user timeline..."}
        value={userHandle}
        onChange={(e) => setUserHandle(e.target.value)}
        type="text"
      />
      <IconButton disabled={loading || userHandle === ""} type="submit">
        <CheckIcon />
      </IconButton>
    </TwoColFormStyles>
  );
}

function HowManyTweets() {
  const { numTweets, mediaType, setConfig } = useConfig();

  useEffect(() => {
    // if searching for media, reduce num tweets
    if (mediaType) {
      setConfig({ numTweets: 25 });
    }
  }, [mediaType, setConfig]);

  return (
    <TextField
      label="How many tweets?"
      value={numTweets}
      onChange={(e) => setConfig({ numTweets: +e.target.value })}
      type="number"
      inputProps={{
        step: [
          FILTER_BY.imageAndVideo,
          FILTER_BY.imageOnly,
          FILTER_BY.videoOnly,
        ].includes(mediaType)
          ? 5
          : 50,
      }}
    />
  );
}

function SelectLanguage() {
  const { setConfig, lang } = useConfig();
  return (
    <FormControl>
      <InputLabel id="language">Language</InputLabel>
      <Select
        labelId="language"
        onChange={(event) => {
          setConfig({ lang: String(event.target.value) });
        }}
        value={lang}
      >
        <MenuItem value="All">
          <em>All</em>
        </MenuItem>
        {languages.map(({ code, name }) => (
          <MenuItem key={code} value={code}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectCountry() {
  const { countryCode, setConfig } = useConfig();
  return (
    <FormControl>
      <InputLabel id="location">Country</InputLabel>
      <Select
        labelId="location"
        onChange={(event) => {
          setConfig({ countryCode: event.target.value as string });
        }}
        value={countryCode}
      >
        <MenuItem value="All">
          <em>All</em>
        </MenuItem>
        {Object.entries(countryCodes).map(([code, countryName]) => (
          <MenuItem key={code} value={code}>
            {countryName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function SelectFilterLevel() {
  const { filterLevel, setConfig } = useConfig();

  return (
    <FormControl>
      <InputLabel id="filter-level">Filter level</InputLabel>
      <Select
        labelId="filter-level"
        onChange={(event) => {
          setConfig({
            filterLevel: event.target.value as keyof typeof FILTER_LEVELS,
          });
        }}
        value={filterLevel}
      >
        <MenuItem value={FILTER_LEVELS.medium}>Medium</MenuItem>
        <MenuItem value={FILTER_LEVELS.low}>Low</MenuItem>
        <MenuItem value={FILTER_LEVELS.none}>None</MenuItem>
      </Select>
    </FormControl>
  );
}

function SwitchReplace() {
  const { replace, setConfig } = useConfig();
  return (
    <Div css={``}>
      <span>
        Add
        <Switch
          onChange={() => setConfig({ replace: !replace })}
          checked={replace}
        />
        Replace
      </span>
    </Div>
  );
}

const MediaTypeCheckboxesStyles = styled.div`
  display: grid;
  max-width: 200px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
`;

function MediaTypeCheckboxes() {
  const {
    isVideoChecked,
    isImageChecked,
    setConfig,
    isAllChecked,
  } = useConfig();

  return (
    <MediaTypeCheckboxesStyles className="checkboxes">
      <FormControlLabel
        control={
          <Checkbox
            checked={isAllChecked}
            onChange={() => setConfig({ isAllChecked: !isAllChecked })}
            name="checkedA"
          />
        }
        label="All"
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={isAllChecked}
            checked={isVideoChecked || isAllChecked}
            onChange={() => setConfig({ isVideoChecked: !isVideoChecked })}
            name="checkedA"
          />
        }
        label="Video"
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={isAllChecked}
            checked={isImageChecked || isAllChecked}
            onChange={() => setConfig({ isImageChecked: !isImageChecked })}
            name="checkedA"
          />
        }
        label="Image"
      />
    </MediaTypeCheckboxesStyles>
  );
}

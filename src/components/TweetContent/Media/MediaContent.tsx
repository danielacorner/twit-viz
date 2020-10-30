import React, { useRef, useEffect, useState } from "react";
import { MediaItem } from "../../../utils/utils";
import VideoWithControls from "./VideoWithControls";

type MediaProps = MediaItem & {
  autoPlay: boolean;
  containerWidth: number;
  containerHeight: number;
  numImages: number;
  isTooltip: boolean;
  isBottomDrawer: boolean;
};
export default function MediaContent({
  autoPlay,
  containerWidth,
  containerHeight,
  isTooltip,
  numImages,
  isBottomDrawer,
  ...mediaItem
}: MediaProps) {
  const { poster, src, type, sizes } = mediaItem;

  // focus the video player when it starts playing
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef.current && (videoRef.current as any).focus && autoPlay) {
      (videoRef.current as any).focus();
    }
  }, [autoPlay]);

  // play video on first click
  const [clickedOnce, setClickedOnce] = useState(false);
  const handleClick = () => {
    if (!clickedOnce) {
      setClickedOnce(true);
    }
  };

  const VIDEO_CONTROLS_HEIGHT = 100;
  const isVideo = mediaItem.type === "video";
  return (
    <div
      onClick={handleClick}
      className="media"
      style={{
        ...(isVideo && isBottomDrawer
          ? { height: containerHeight / numImages - VIDEO_CONTROLS_HEIGHT }
          : {}),
        width: containerWidth,
        position: "relative",
      }}
    >
      {["video", "animated_gif"].includes(type) ? (
        autoPlay || clickedOnce ? (
          <VideoWithControls
            {...{ videoRef, isTooltip, containerWidth, mediaItem }}
          />
        ) : (
          // must use custom element to enable lazy-loading poster image
          <div
            className="poster"
            style={{
              height: (containerWidth * sizes.large.h) / sizes.large.w,
              width: containerWidth,
            }}
          >
            <img
              loading="lazy"
              src={poster}
              alt=""
              width={containerWidth / numImages}
              height={(containerWidth * sizes.large.h) / sizes.large.w}
            />
          </div>
        )
      ) : (
        <a
          className="imgLink"
          href={src}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            loading="lazy"
            src={src}
            alt=""
            width={containerWidth}
            height={(containerWidth * sizes.large.h) / sizes.large.w}
          />
        </a>
      )}
    </div>
  );
}

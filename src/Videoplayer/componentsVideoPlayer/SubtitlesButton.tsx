import React, { useState } from "react";
import subtitles from "../../../assets/Subtitles.svg";
export default function SubtitlesButton() {
  const [isVisible, setIsVisible] = useState<boolean>();
  const toggleSubtitles = () => {
    setIsVisible(!isVisible);
  };
  return (
    <button
      onClick={toggleSubtitles}
      className={isVisible ? "opacity-100" : "opacity-0"}
    >
      <img>{subtitles}</img>
    </button>
  );
}

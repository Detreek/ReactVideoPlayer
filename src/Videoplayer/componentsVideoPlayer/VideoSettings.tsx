import type { Level } from "hls.js";

import React, { useState } from "react";

export default function VideoSettings(props: {
  setQualityLevel: React.Dispatch<React.SetStateAction<number>>;
  qualityLevelList: Array<Level> | null;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <button
      onClick={() => setIsVisible(!isVisible)}
      className={isVisible ? "opacity-100" : "opacity-0"}
    >
      {props.qualityLevelList?.map((e, _) => (
        <ul onClick={() => props.setQualityLevel(_)}>{e.name}</ul>
      ))}
    </button> // UDP: idk what is wrong
  );
}

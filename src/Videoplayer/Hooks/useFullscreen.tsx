import React from "react";
import { useState, useEffect } from "react";

export default function useFullscreen(
  fullScreanContext: React.RefObject<HTMLDivElement | null>,
) {
  const [fullScreenState, setFullScreenState] = useState<boolean>(false);

  useEffect(() => {
    if (!fullScreanContext.current) {
      return;
    }
    if (fullScreenState) {
      fullScreanContext.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [fullScreenState]);
  useEffect(() => {
    if (fullScreenState) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFullScreenState(false);
    }
    return () => {
      setFullScreenState(false);
    };
  }, [fullScreanContext]);
  return { fullScreenState, setFullScreenState };
}

import { useState, useEffect } from "react";
import type { VideoContextWrapper } from "../types/VideoContextWrapper";

export default function useTimeline(videoContext: VideoContextWrapper) {
  const [duration, setDuration] = useState<number>(0); // sec
  const [timestamp, setTimestamp] = useState<number>(0); // sec
  const [metadataLoaded, setMetadataLoaded] = useState<boolean>(false);
  const [playState, setPlayState] = useState<boolean>(true); //isPlaying?????????????
  const [realTimestamp, setRealTimestamp] = useState<number>(0);
  const [bufferedTime, setBufferedTime] = useState<number | null>(null);

  useEffect(() => {
    // debugger
    const updateBufferedTime = () => {
      const buffered = videoContext.buffered;
      let total = 0;

      for (let i = 0; i < buffered.length; i++) {
        total += buffered.end(i) - buffered.start(i);
      }

      setBufferedTime(total);
      return total;
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlayState(!videoContext.pause);
    setDuration(videoContext.duration);
    setTimestamp(videoContext.time);
    updateBufferedTime();
  }, [metadataLoaded, videoContext, bufferedTime]);
  useEffect(() => {
    videoContext.setPaused(playState);
  }, [playState, videoContext]);
  useEffect(() => {
    if (videoContext.time === timestamp) {
      return;
    }
    videoContext.setTime(timestamp);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRealTimestamp(timestamp);
    console.log("UseEffect", timestamp, "Timestamp");
    return;
  }, [timestamp, videoContext]);

  const setTimestampImidiate = (timestamp: number) => {
    return setRealTimestamp(timestamp);
  };

  return {
    duration,
    timestamp: realTimestamp,
    setTimestamp,
    setMetadataLoaded,
    playState,
    setPlayState,
    setTimestampImidiate,
  };
}

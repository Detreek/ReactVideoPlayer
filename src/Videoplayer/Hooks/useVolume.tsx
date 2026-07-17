import { useState, useEffect } from "react";
import { VideoContextWrapper } from "../types/VideoContextWrapper";
export default function useVolume(videoContext: VideoContextWrapper) {
  const [volume, setVolume] = useState<number>(0.5);
  const [muteState, setMuteState] = useState<boolean>(false);

  useEffect(() => {
    setVolume(videoContext.volume);
    setMuteState(videoContext.muted);
  }, [videoContext]);
  useEffect(() => {
    videoContext.setMute(muteState);
  }, [muteState]);
  useEffect(() => {
    videoContext.setVolume(volume);
  }, [volume]);
  return { volume, setVolume, muteState, setMuteState };
}

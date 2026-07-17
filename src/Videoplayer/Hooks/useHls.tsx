import { useEffect, useState, useRef } from "react";

import Hls, { Level, type MediaPlaylist } from "hls.js";
export default function useHls(
  videoContext: React.RefObject<HTMLVideoElement | null>,
  m8u3Url: string,
) {
  const hlsRef = useRef<Hls | null>(null);

  // Level part
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null); // Level for logic
  const [qualityLevelList, setQualityLevelList] = useState<Level[] | null>(
    null,
  ); // Levels for represent in UI to choose manual
  const [autoLevelSwitch, setAutoLevelSwitch] = useState<boolean>(false); // auto-switch levels
  // Level part

  //audioTrack part
  const [currentAudioTrack, setCurrentAudioTrack] =
    useState<MediaPlaylist | null>(null);
  const [audioTracksList, setAudioTracksList] = useState<
    MediaPlaylist[] | null
  >([]);
  //audioTrack part

  //Subtitles part
  const [currentSubtitles, setCurrentSubtitles] =
    useState<MediaPlaylist | null>(null);
  const [subtitlesList, setsubtitlesList] = useState<MediaPlaylist[] | null>(
    [],
  );
  //Subtitles part

  const Createhls = (m3u8Url: string): Hls => {
    if (m3u8Url === null || m3u8Url === undefined) {
      throw "no m8u3Url";
    }
    if (videoContext.current === null) {
      throw "no video element";
    }
    const config = {
      // Replace limitRenditionByPlayerDimensions: true
      capLevelToPlayerSize: true,
    };
    const hls = new Hls(config);
    hls.loadSource(m3u8Url);
    hls.attachMedia(videoContext.current);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log("video and hls.js are now bound together !");
    });

    hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data) {
      const qualityLevelList = data.levels;
      const allSubtitles = data.subtitleTracks;
      const allAudioTracks = data.audioTracks;

      setQualityLevelList(qualityLevelList);
      setAudioTracksList(allAudioTracks);
      setsubtitlesList(allSubtitles);
    });

    //     hls.trigger(Hls.Events.BUFFER_FLUSHING, {
    //     startOffset: 0,
    //     endOffset: Number.POSITIVE_INFINITY,
    // });
    //     })

    return hls;
  };

  useEffect(() => {
    const hls = Createhls(m8u3Url);
    if (hls === null) {
      return;
    }
    hlsRef.current = hls;

    console.log(qualityLevelList);
    console.log(hls.levels);
    return () => {
      hls.destroy();
    };
  }, [m8u3Url]);

  useEffect(() => {
    if (hlsRef.current === null) {
      return;
    }
    if (currentLevel === null) {
      return;
    }
    const levelIndex = qualityLevelList?.indexOf(currentLevel) ?? -1;
    hlsRef.current.currentLevel = levelIndex;
  }, [currentLevel]);

  return { currentLevel, setCurrentLevel, qualityLevelList };
}

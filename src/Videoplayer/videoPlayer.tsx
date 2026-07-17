import { useEffect, useRef } from "react";
// import Hls from "hls.js"
import useVolume from "./Hooks/useVolume";
import { useHotkeys } from "react-hotkeys-hook";
// import './videoPlayer.css'
import PlayButton from "./componentsVideoPlayer/PlayButton";
import fullscreen from "../../assets/Fullscreen.svg";
import fullscreenOut from "../../assets/FullscreenOut.svg";
import settings from "../../assets/Settings.svg";
import clsx from "clsx";
import TimeLine from "./componentsVideoPlayer/Timeline";
import VolumeButton from "./componentsVideoPlayer/VolumeButton";
import useTimeline from "./Hooks/useTimeline";
import useFullscreen from "./Hooks/useFullscreen";
import useMouseMove from "./Hooks/useMouseMove";
import useHls from "./Hooks/useHls";
import Hls from "hls.js";
import VideoSettings from "./componentsVideoPlayer/VideoSettings";
import Time from "./componentsVideoPlayer/Time";
import SubtitlesButton from "./componentsVideoPlayer/SubtitlesButton";
import FullScreenButton from "./componentsVideoPlayer/FullScreenButton";
function VideoPlayer(props: { m8u3Url: string }) {
  const videoContext = useRef<HTMLVideoElement | null>(null);
  const fullscreenContext = useRef<HTMLDivElement | null>(null);

  const {
    duration,
    timestamp,
    setTimestamp,
    setMetadataLoaded,
    playState,
    setPlayState,
    setTimestampImidiate,
  } = useTimeline(videoContext);

  const { volume, setVolume, muteState, setMuteState } =
    useVolume(videoContext);
  const { fullScreenState, setFullScreenState } =
    useFullscreen(fullscreenContext);
  const { isMoving, Movehandler, cleanup } = useMouseMove(1000);
  const { qualityLevel, setQualityLevel, qualityLevelList } = useHls(
    videoContext,
    props.m8u3Url,
  );

  // useEffect part

  // useEffect((() => {

  //     if (playState) {
  //         console.log("play")
  //         PlayVideo()
  //     }
  //     else {

  //         PauseVideo()
  //     }
  // }), [playState])
  // useEffect part is over

  useHotkeys("space", (event) => {
    event.preventDefault();
    setPlayState(!playState);
  });
  useHotkeys("ArrowLeft", (event) => {
    event.preventDefault();
    FiveSecBefore();
  });
  useHotkeys("ArrowRight", (event) => {
    event.preventDefault();
    FiveSecForward();
  });
  useHotkeys("ArrowUp", (event) => {
    event.preventDefault();
    VolumeLouder();
  });
  useHotkeys("ArrowDown", (event) => {
    event.preventDefault();
    VolumeQuiet();
  });
  useHotkeys("m", (event) => {
    event.preventDefault();
    MuteVideo();
  }); // hotkeys mb add something else

  const FiveSecBefore = () => {
    if (!videoContext.current) {
      return;
    }

    setTimestamp((timestamp) => timestamp - 5);
  };
  const FiveSecForward = () => {
    if (!videoContext.current) {
      return;
    }

    setTimestamp((timestamp) => timestamp + 5);
  };
  const PlayVideo = () => {
    setPlayState(true);
  };
  const PauseVideo = () => {
    setPlayState(false);
  };
  const MuteVideo = () => {
    if (muteState) {
      setMuteState(false);
      return;
    }
    // TODO: VideoVolume have visible problem on range button

    setMuteState(true);
  };
  const VolumeLouder = () => {
    if (volume > 0.95) {
      setVolume(1);

      return;
    }
    setVolume(volume + 0.05);
  };
  const VolumeQuiet = () => {
    if (volume <= 0.05) {
      setVolume(0);

      return;
    }
    setVolume(volume - 0.05);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
      id="videoplayer"
    >
      <video
        ref={videoContext}
        className="absolute inset-0 w-full h-full object-contain"
        onLoadedMetadata={() => {
          setMetadataLoaded(true);
          console.log(qualityLevelList);
        }}
        onClick={() => (playState ? PauseVideo() : PlayVideo())}
        onTimeUpdate={(e) => {
          console.log("OnTImeUpdate", e.currentTarget.currentTime);
          setTimestampImidiate(e.currentTarget.currentTime);
        }}
      />
      <div
        id="pop-up-menu"
        className={clsx(
          "absolute inset-0 flex flex-col justify-end transition-opacity duration-300 pointer-events-none",
          isMoving ? "opacity-100" : "opacity-0",
        )}
      >
        <div>
          <PlayButton
            playState={playState}
            setplatestate={setPlayState}
          ></PlayButton>
          <VolumeButton
            videoVolume={volume}
            setVideoVolume={setVolume}
          ></VolumeButton>
          <Time sec={timestamp} duration={duration}></Time>
        </div>
        <TimeLine
          videoTime={timestamp}
          videoDuration={duration}
          setVideoTime={setTimestamp}
        ></TimeLine>
        <div>
          <SubtitlesButton />
          <VideoSettings
            qualityLevelList={qualityLevelList}
            setQualityLevel={setQualityLevel}
          />
          <FullScreenButton
            fullscreenState={fullScreenState}
            setFullscreenState={setFullScreenState}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;

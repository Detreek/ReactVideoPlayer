import { useEffect, useRef } from "react"
// import Hls from "hls.js"
import { PipWrapper, PipTrigger } from "@pip-it-up/react";
import useVolume from "./Hooks/useVolume";
import { getVideoData } from "./logic";
import { useHotkeys } from 'react-hotkeys-hook';
// import './videoPlayer.css'
import play from '../../assets/Play.svg'
import pause from "../../assets/Pause.svg"
import fullscreen from "../../assets/Fullscreen.svg"
import fullscreenOut from '../../assets/FullscreenOut.svg'
import clsx from "clsx";
import TimeLine from "./componentsVideoPlayer/Timeline";
import VolumeRangeButton from "./componentsVideoPlayer/VolumeRangeButton";
import useTimeline from "./Hooks/useTimeline";
import useFullscreen from "./Hooks/useFullscreen";
import useMouseMove from "./Hooks/useMouseMove";
import useHls from "./Hooks/useHls";
import Hls from "hls.js";
function videoPlayer(props: { m8u3Url: string }) {
    const videoContext = useRef<HTMLVideoElement | null>(null)
    const fullscreenContext = useRef<HTMLDivElement | null>(null)

    const { duration, timestamp, setTimestamp, setMetadataLoaded, playState, setPlayState, setTimestampImidiate } = useTimeline(videoContext)
    const { volume, setVolume, muteState, setMuteState } = useVolume(videoContext)
    const { fullScreenState, setFullScreenState } = useFullscreen(fullscreenContext)
    const { isMoving, Movehandler, cleanup } = useMouseMove(1000)
    const { qualityLevel, setQualityLevel, qualityLevelList } = useHls(videoContext, props.m8u3Url)

    // useEffect part



    useEffect((() => {

        if (playState) {
            console.log("play")
            PlayVideo()
        }
        else {

            PauseVideo()
        }
    }), [playState])
    // useEffect part is over

    useHotkeys('space', (event) => {
        event.preventDefault();
        setPlayState(!playState)
    })
    useHotkeys('ArrowLeft', (event) => {
        event.preventDefault()
        FiveSecBefore()

    })
    useHotkeys('ArrowRight', (event) => {
        event.preventDefault()
        FiveSecForward()
    })
    useHotkeys('ArrowUp', (event) => {
        event.preventDefault()
        VolumeLouder()
    })
    useHotkeys('ArrowDown', (event) => {
        event.preventDefault()
        VolumeQuiet()
    })
    useHotkeys('m', (event) => {
        event.preventDefault()
        MuteVideo()
    }) // hotkeys mb add something else


    const FiveSecBefore = () => {
        if (!videoContext.current) {
            return
        }

        setTimestamp((timestamp) => timestamp - 5)

    }
    const FiveSecForward = () => {

        if (!videoContext.current) {
            return
        }

        setTimestamp((timestamp) => timestamp + 5)
    }
    const PlayVideo = () => {

        setPlayState(true)

    }
    const PauseVideo = () => {

        setPlayState(false)
    }
    const MuteVideo = () => {

        if (muteState) {


            setMuteState(false)
            return
        }
        // TODO: VideoVolume have visible problem on range button

        setMuteState(true)
    }
    const VolumeLouder = () => {
        if (volume > 0.95) {
            setVolume(1)


            return

        }
        setVolume(volume + 0.05)

    }
    const VolumeQuiet = () => {
        if (volume <= 0.05) {
            setVolume(0)


            return

        }
        setVolume(volume - 0.05)

    }



    return (

        <div className={`relative max-w-4xl mx-auto bg-black rounded-xl overflow-hidden shadow-2xl`} ref={fullscreenContext} onMouseMove={Movehandler}
        >

            <video ref={videoContext} className="w-full h-auto" onLoadedMetadata={() => {
                setMetadataLoaded(true)
                console.log(qualityLevelList)
            }}
                onClick={() => playState ? PauseVideo() : PlayVideo()}
                onTimeUpdate={(e) => {

                    console.log("OnTImeUpdate", e.currentTarget.currentTime)
                    setTimestampImidiate(e.currentTarget.currentTime);


                }} />
            <div className={clsx("absolute inset-0 transition-opacity duration-300 pointer-events-none", isMoving ? "  opacity-100" : " opacity-0")}>
                {/* "pop-up-window" */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="mb-2 px-2">
                    <TimeLine videoDuration={duration} videoTime={timestamp} setVideoTime={setTimestamp}></TimeLine></div>

                <div className="flex items-center justify-between px-3 pb-2">
                    <div className="flex items-center gap-2">
                        <VolumeRangeButton setVideoVolume={setVolume} videoVolume={volume}></VolumeRangeButton>
                        <button onClick={() => playState ? PauseVideo() : PlayVideo()} className="w-6 h-6" ><img src={playState ? play : pause}></img></button>
                    </div>
                    <button onClick={() => { setFullScreenState(V => !V) }}
                        className="w-6 h-6"><img src={fullScreenState ? fullscreen : fullscreenOut}></img></button>

                </div>
            </div>



        </div >
    )

}

export default videoPlayer




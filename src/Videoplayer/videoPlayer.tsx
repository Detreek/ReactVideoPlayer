import { useEffect, useRef } from "react"
import Hls from "hls.js"
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
function videoPlayer() {
    const videoContext = useRef<HTMLVideoElement>(null)
    const fullscreenContext = useRef<HTMLDivElement | null>(null)

    const { duration, timestamp, setTimestamp, setMetadataLoaded, playState, setPlayState, setTimestampImidiate } = useTimeline(videoContext)
    const { volume, setVolume, muteState, setMuteState } = useVolume(videoContext)
    const { fullScreenState, setFullScreenState } = useFullscreen(fullscreenContext)
    const { isMoving, Movehandler, cleanup } = useMouseMove(1000)

    function Createhls(m3u8Url?: string): Hls {
        if (m3u8Url === null || m3u8Url === undefined) {
            throw "no m8u3Url"

        }
        if (videoContext.current === null) {
            throw "no video element"

        }
        const config = {
            // Replace limitRenditionByPlayerDimensions: true
            capLevelToPlayerSize: true,
        };
        const hls = new Hls(config);
        hls.attachMedia(videoContext.current)
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {

            console.log('video and hls.js are now bound together !');
        });

        hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data) {
            const highestQualityIndex = data.levels.length - 1;
            hls.currentLevel = highestQualityIndex;

            console.log('manifest loaded, found ' + data.levels.length + ' quality level',);

            if (videoContext.current === null) {
                throw "no video element"

            }
        });

        hls.loadSource(m3u8Url);


        return hls
    } // dont touch anything !!!!
    async function LoadVideo(): Promise<Hls | null> {

        const data = await getVideoData()

        if (!videoContext.current) {
            return (null)
        }
        if (data === undefined) {
            return (null)
        }
        return Createhls(data.m8u3Url)

    } // and this also dont touch
    // useEffect part

    useEffect(() => {
        let hls: Hls | null
        (async () => hls = await LoadVideo())()



        return () => hls?.destroy()


    }, [])

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

        <div className={`relative`} ref={fullscreenContext} onMouseMove={Movehandler}
        >
            <div className="video-not-fullscrean" >
                <video ref={videoContext} className="w-full h-auto" onLoadedMetadata={() => {
                    setMetadataLoaded(true)

                }}
                    onClick={() => playState ? PauseVideo() : PlayVideo()}
                    onTimeUpdate={(e) => {

                        console.log("OnTImeUpdate", e.currentTarget.currentTime)
                        setTimestampImidiate(e.currentTarget.currentTime);


                    }}>
                    <div className={clsx("absolute bottom-0 left-0 right-0", isMoving ? "  opacity-100" : " opacity-0")}>
                        {/* "pop-up-window" */}
                        <TimeLine videoDuration={duration} videoTime={timestamp} setVideoTime={setTimestamp}></TimeLine>
                        <VolumeRangeButton setVideoVolume={setVolume} videoVolume={volume}></VolumeRangeButton>
                        <button onClick={() => playState ? PauseVideo() : PlayVideo()} className="w-5 h-5" ><img src={playState ? play : pause}></img></button>

                        <button onClick={() => { setFullScreenState(V => !V) }}
                            className="w-5 h-5"><img src={fullScreenState ? fullscreen : fullscreenOut}></img></button>

                    </div>
                </video>
                <audio></audio>
            </div>
        </div >
    )

}

export default videoPlayer




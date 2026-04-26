import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import type { Video } from "./DTO/Video";
import { getVideoData } from "./logic";
import { useHotkeys } from 'react-hotkeys-hook';
import './videoPlayer.css'
function videoPlayer() {

    const hlsContext = useRef<Hls>(null);
    const [videoData, setVideoData] = useState<Video | undefined>();
    const [VideoVolume, setVideoVolume] = useState<number>(50);
    const [VideoVolumeState, setVideoVolumeState] = useState<boolean>(true)
    const [VideoTime, setVideoTime] = useState<number>(0)
    const [VideoState, setVideoState] = useState<boolean>(false)
    const [VideoDuration, setVideoDuration] = useState<number>(0); //string type for HTML tag
    const [IsFullScreenState, setFullScreenState] = useState<boolean>(false) // isFullscreen 
    const fullscreenContext = useRef<HTMLDivElement | null>(null)


    const videoContext = useRef<HTMLVideoElement>(null)
    function Createhls(m3u8Url?: string): void {
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

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            const highestQualityIndex = data.levels.length - 1;
            hls.currentLevel = highestQualityIndex;

            console.log('manifest loaded, found ' + data.levels.length + ' quality level',);
            const StopTime = videoData?.timeStop ?? 0
            if (videoContext.current === null) {
                throw "no video element"

            }

            videoContext.current.currentTime = StopTime

        });

        hls.loadSource(m3u8Url);


        hlsContext.current = hls
    }
    async function LoadVideo(): Promise<void> {

        const data = await getVideoData()

        if (!videoContext.current) {
            return
        }
        if (data === undefined) {
            return
        }
        setVideoData(data)

        if ((data).timeStop !== 0) {
            setVideoTime(data.timeStop) // last session (maybe need to use localstorage - this is the best chs)
        }

        Createhls(data.m8u3Url)


    }
    // useEffect part

    useEffect(() => {

        LoadVideo()
        if (!videoContext.current) {
            return
        }

        return () => hlsContext.current?.destroy()


    }, [])



    useEffect((() => {
        VolumeChange()
    }), [VideoVolume])
    // useEffect((() => {
    //     RewindVideo()
    // }), [VideoTime])
    useEffect((() => {
        console.log("state UseEffect")
        if (VideoState) {
            console.log("play")
            PlayVideo()
        }
        else {

            PauseVideo()
        }
    }), [VideoState])

    // useEffect part is over
    useHotkeys('space', (event) => {
        event.preventDefault()
        setVideoState(!VideoState)
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
    })
    const toggleFullscreen = () => {
        if (!videoContext.current) {
            return
        }
        if (!fullscreenContext.current) {
            return
        }
        if (IsFullScreenState) {
            fullscreenContext.current.requestFullscreen()
            setFullScreenState(false)
        }
        document.exitFullscreen()
        setFullScreenState(true)
    }
    const FiveSecBefore = () => {
        if (!videoContext.current) {
            return
        }
        videoContext.current.currentTime += 5
        setVideoTime((VideoTime) => VideoTime - 5)

    }
    const FiveSecForward = () => {

        if (!videoContext.current) {
            return
        }
        videoContext.current.currentTime += 5
        setVideoTime((VideoTime) => VideoTime + 5)
    }
    const PlayVideo = () => {
        console.log("Playvideo")
        videoContext.current?.play()
        setVideoState(true)
    }
    const PauseVideo = () => {

        videoContext.current?.pause()
        setVideoState(false)
    }
    const MuteVideo = () => {
        if (videoContext.current === null) {
            return
        }
        if (VideoVolumeState) {
            setVideoVolume(videoContext.current.volume)
            videoContext.current.volume = 0
            setVideoVolumeState(false)
            return
        }
        // TODO: VideoVolume have visible problem on range button
        videoContext.current.volume = VideoVolume
        setVideoVolumeState(true)
    }
    const VolumeLouder = () => {
        if (videoContext.current === null) {
            return
        }
        if (videoContext.current.volume > 0.95) {
            videoContext.current.volume = 1

            setVideoVolume(videoContext.current.volume)
            return

        }
        videoContext.current.volume += 0.05
        setVideoVolume(VideoVolume + 5)
    }
    const VolumeQuiet = () => {
        if (videoContext.current === null) {
            return
        }
        if (videoContext.current.volume <= 0.05) {
            videoContext.current.volume = 0

            setVideoVolume(videoContext.current.volume)
            return

        }
        videoContext.current.volume -= 0.05
        setVideoVolume(VideoVolume - 5)
    }
    const RewindVideo = () => {
        if (!videoContext.current) {
            return
        }

        videoContext.current.currentTime = VideoTime


    }
    const VolumeChange = () => {
        if (videoContext.current === null) {
            return
        }
        videoContext.current.volume = VideoVolume / 100
    }


    return (

        <div className={`video-player-box${IsFullScreenState ? 'fullscreen-active' : ''}`}
            ref={fullscreenContext}>
            <div className="pop-up-window">

                <input type="range" min={0} max={VideoDuration} className="video-length"
                    value={VideoTime} onChange={(e) => {
                        const newTime = parseInt(e.target.value)
                        setVideoTime(newTime);
                        if (videoContext.current) videoContext.current.currentTime = newTime;
                    }}></input>
                <input type="range" min={0} max={100} className="Volume"
                    value={VideoVolume} onChange={(e) => { setVideoVolume(parseInt(e.target.value)) }}></input>
                <button onClick={PlayVideo}>play</button>
                <button onClick={PauseVideo}>STOP</button>
                <button onClick={toggleFullscreen}
                    className="fullScreen-button"></button>
            </div>
            <div className="video-not-fullscrean">
                <video ref={videoContext} className="video" onLoadedMetadata={() => {
                    if (videoContext.current) {
                        setVideoDuration(videoContext.current.duration)
                    }

                }}
                    onClick={() => VideoState ? PauseVideo() : PlayVideo()}
                    onTimeUpdate={() => {
                        if (videoContext.current) {
                            setVideoTime(videoContext.current.currentTime);
                        }
                    }}></video>
            </div>

        </div >)
}

export default videoPlayer




import { useEffect, useRef, useState, type Key } from "react"
import Hls from "hls.js"
import type { Video } from "./DTO/Video";
import { getVideoData } from "./logic";
function videoPlayer() {

    const [hlsContext, setHls] = useState<Hls>();
    const [videoData, setVideoData] = useState<Video>();
    const [VideoVolume, setVideoVolume] = useState<number>(50);
    const [VideoTime, setVideoTime] = useState<number>(0)
    const [VideoState, setVideoState] = useState<boolean>(true)
    const [VideoDuration, setVideoDuration] = useState<string>("-:--"); //string type for HTML tag

    const videoContext = useRef<HTMLVideoElement>(null)
    function Createhls(m8u3Url?: string): void {
        if (m8u3Url === null || m8u3Url === undefined) {
            throw "no m8u3Url"

        }
        if (videoContext.current === null) {
            throw "no video element"

        }
        const hls = new Hls();
        hls.attachMedia(videoContext.current)
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            console.log('video and hls.js are now bound together !');
        });
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {

            console.log('manifest loaded, found ' + data.levels.length + ' quality level',);
            const StopTime = videoData?.timeStop ?? 0
            if (videoContext.current === null) {
                throw "no video element"

            }
            videoContext.current.currentTime = StopTime
        });
        hls.loadSource(m8u3Url); // put here your link to .m3u8 file


        setHls(hls)
    }
    async function LoadVideo(): Promise<void> {

        const data = await getVideoData()

        setVideoData(data)
        if ((data).timeStop !== 0) {

        }
        if (data === undefined) {
            return
        }
        Createhls(data.m8u3Url)
    }

    useEffect(() => {

        LoadVideo()
        if (!videoContext.current) {
            return
        }
        const strMaxDuration = videoContext.current.duration
        setVideoDuration(strMaxDuration.toString())
        // PlayVideo()


    }, [])
    useEffect((() => {

        document.addEventListener("keydown", KeyDownHandler)
        return () => (document.removeEventListener("keydown", KeyDownHandler))

    }), [])
    useEffect((() => {
        VolumeChange()
    }), [VideoVolume])
    useEffect((() => {
        RewindVideo()
    }), [VideoTime])
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
    const KeyDownHandler = (e: globalThis.KeyboardEvent) => {
        console.log("прошел в хендлер")
        if (e.repeat) {
            return
        }
        if (e.key == ' ') {

            setVideoState(!VideoState)
        }
        if (e.key == 'ArrowLeft') {

            FiveSecBefore()
        }
        if (e.key == 'ArrowRight') {

            FiveSecForward()
        }

    }
    const FiveSecBefore = () => {
        if (!videoContext.current) {
            return
        }
        videoContext.current.currentTime += VideoTime - 5

    }
    const FiveSecForward = () => {

        if (!videoContext.current) {
            return
        }
        videoContext.current.currentTime += VideoTime + 5
    }
    const PlayVideo = () => {
        console.log("Playvideo")
        videoContext.current?.play()
        setVideoState(true)
    }
    const PauseVideo = () => {
        hlsContext!.pauseBuffering()
        videoContext.current?.pause()
        setVideoState(false)
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

        <div className="video-player-box">
            <div className="pop-up-window">

                <input type="range" min={0} max={VideoDuration} className="Video-length"
                    value={VideoTime} onChange={(e) => { setVideoTime(parseInt(e.target.value)) }}></input>
                <input type="range" min={0} max={10} className="Volume"
                    value={VideoVolume} onChange={(e) => { setVideoVolume(parseInt(e.target.value)) }}></input>
            </div>
            <video ref={videoContext} className="video"></video>
            <button onClick={PlayVideo}>play</button>
            <button onClick={PauseVideo}>STOP</button>
        </div>)
}

export default videoPlayer
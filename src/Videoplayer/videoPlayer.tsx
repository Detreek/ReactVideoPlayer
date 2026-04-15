import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import type { Video } from "./DTO/Video";
import { getVideoData } from "./logic";
function videoPlayer() {

    const [hlsContext, setHls] = useState<Hls>();
    const [videoData, setVideoData] = useState<Video>();
    const [VideoVolume, setVideoVolume] = useState<number>(50);
    const [videoTime, setVideoTime] = useState<number>()
    const [videoLoadedState, setVideoLoadedState] = useState<boolean>(false);

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
        debugger
        LoadVideo()
        setVideoLoadedState(true)
        PlayVideo


    }, [])
    useEffect((() => {
        VolumeChange
    }), [VideoVolume])
    const PlayVideo = () => {

        videoContext.current?.play()
    }
    const PauseVideo = () => {
        hlsContext!.pauseBuffering()
        videoContext.current?.pause()

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

                <input type="range" min={0} max={videoData?.timeDuration} className="Video-length"
                    value={videoTime} onChange={(e) => { }}></input>
                <input type="range" min={0} max={10} className="Volume"
                    value={VideoVolume} onChange={(e) => { setVideoVolume(parseInt(e.target.value)), VolumeChange() }}></input>
            </div>
            <video ref={videoContext} className="video"></video>
            <button onClick={PlayVideo}>FIdhisfijiewsjipfewijpfwjpiefpjioewjipfwjpefjpoiwejfjpweojpfojp</button>
            <button onClick={PauseVideo}>STOOOOOOOP</button>
        </div>)
}

export default videoPlayer
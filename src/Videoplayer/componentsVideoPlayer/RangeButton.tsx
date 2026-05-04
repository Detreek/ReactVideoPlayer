type RangeButtonProps = {
    videoDuration: number;
    videoTime: number;
    videoContext: HTMLVideoElement | null;
    setVideoTime: (n: number) => void
}
function RangeButton({ videoContext, videoDuration: VideoDuration, videoTime: VideoTime, setVideoTime }: RangeButtonProps) {
    return (
        <input type="range" min={0} max={VideoDuration} className="video-length"
            value={VideoTime} onChange={(e) => {
                const newTime = parseInt(e.target.value)
                setVideoTime(newTime);
                if (videoContext) videoContext.currentTime = newTime;
            }}></input>);
}
export default RangeButton
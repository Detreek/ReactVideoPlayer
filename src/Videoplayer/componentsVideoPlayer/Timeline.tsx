type RangeButtonProps = {
    videoDuration: number;
    videoTime: number;
    setVideoTime: (n: number) => void
}
function TimeLine({ videoDuration: VideoDuration, videoTime: VideoTime, setVideoTime }: RangeButtonProps) {
    return (
        <input type="range" min={0} max={VideoDuration} className="video-length"
            value={VideoTime} onChange={(e) => {
                const newTime = parseInt(e.target.value)
                console.log("Timeline, was editing", newTime, "- new TIme", VideoTime, "VIDTime")
                setVideoTime(newTime);

            }}></input>);
}
export default TimeLine
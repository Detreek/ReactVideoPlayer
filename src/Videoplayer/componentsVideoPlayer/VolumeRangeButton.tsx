type VolumeRangeButtonProps = {
    videoVolume: number;
    setVideoVolume: (n: number) => void
}
function VolumeRangeButton(props: VolumeRangeButtonProps) {
    return (<input type="range" min={0} max={100} className="Volume"
        value={props.videoVolume} onChange={(e) => { props.setVideoVolume(parseInt(e.target.value)) }}></input>)
}
export default VolumeRangeButton
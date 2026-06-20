type VolumeRangeButtonProps = {
    videoVolume: number;
    setVideoVolume: (n: number) => void
}
function VolumeRangeButton(props: VolumeRangeButtonProps) {
    const MAX_VOLUME = 100;
    return (<input type="range" min={0} max={MAX_VOLUME} className="Volume"
        value={props.videoVolume * MAX_VOLUME} onChange={(e) => { props.setVideoVolume(parseInt(e.target.value) / MAX_VOLUME) }}></input>)
}
export default VolumeRangeButton
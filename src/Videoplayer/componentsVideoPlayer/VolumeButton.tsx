
function VolumeButton(props: { videoVolume: number, setVideoVolume: (n: number) => void }) {
    const MAX_VOLUME = 100;
    return (<input type="range" min={0} max={MAX_VOLUME} className="Volume"
        value={props.videoVolume * MAX_VOLUME} onChange={(e) => { props.setVideoVolume(parseInt(e.target.value) / MAX_VOLUME) }}></input>)
}
export default VolumeButton
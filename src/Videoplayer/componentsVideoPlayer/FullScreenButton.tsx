import React from 'react'
import fullscreen from '../../../assets/Fullscreen.svg'
import fullscreenOut from '../../../assets/FullscreenOut.svg'
export default function FullScreenButton(props: { fullscreenState: boolean, setFullscreenState: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <button onClick={() => props.setFullscreenState}><img>{props.fullscreenState ? fullscreen : fullscreenOut}</img></button>
    )
}

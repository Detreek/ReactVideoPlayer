import React from 'react'
import play from '../../assets/Play.svg'
import pause from "../../assets/Pause.svg"

export default function PlayButton(props: { playState: boolean, setplatestate: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <button onClick={() => props.setplatestate(!props.playState)}>
            <img>{props.playState ? play : pause}</img>
        </button>
    )
}

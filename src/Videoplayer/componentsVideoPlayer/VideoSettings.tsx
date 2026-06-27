import type Hls from 'hls.js'
import React, { useState } from 'react'

export default function VideoSettings(props: { setQualityLevel: React.Dispatch<React.SetStateAction<number>>, qualityLevelList: Array<string> }) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    return (
        <button onClick={() => setIsVisible(!isVisible)}>{props.qualityLevelList.map((e, _) => (<ul onClick={() => props.setQualityLevel(_)}>e</ul>))}</button> // this piece of shit next update better to use EVENTS!
    )
}

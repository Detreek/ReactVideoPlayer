import React from 'react'
import { useState, useEffect } from 'react'
export default function useVolume(videoContext: React.RefObject<HTMLVideoElement | null>) {
    const [volume, setVolume] = useState(0.5)
    const [muteState, setMuteState] = useState(false)

    useEffect(() => {
        if (!videoContext.current) {
            return
        }
        setVolume(videoContext.current.volume)
        setMuteState(videoContext.current.muted)
    }, [videoContext.current])
    useEffect(() => {
        if (!videoContext.current) {
            return
        }
        videoContext.current.muted = muteState
    }, [muteState])
    useEffect(() => {
        if (!videoContext.current) {
            return
        }
        videoContext.current.volume = volume
    }, [volume])
    return { volume, setVolume, muteState, setMuteState }
}

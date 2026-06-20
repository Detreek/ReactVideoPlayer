import React, { type Ref } from 'react'
import { useState, useEffect } from 'react'

export default function useTimeline(videoContext: React.RefObject<HTMLVideoElement | null>) {

    const [duration, setDuration] = useState<number>(0) // sec
    const [timestamp, setTimestamp] = useState<number>(0) // sec
    const [metadataLoaded, setMetadataLoaded] = useState<boolean>(false)
    const [playState, setPlayState] = useState<boolean>(true) //isPlaying?????????????
    useEffect(() => {
        // debugger
        if (!videoContext.current) {

            return

        }
        setPlayState(!videoContext.current.paused)
        setDuration(videoContext.current.duration)
        setTimestamp(videoContext.current.currentTime)
    }, [videoContext.current, metadataLoaded,])
    useEffect(() => {

        if (!playState) {
            videoContext.current?.pause()
            return
        }
        videoContext.current?.play()
        return
    }, [playState])
    useEffect(() => {

        if (!videoContext.current || videoContext.current.currentTime === timestamp) {
            return
        }
        videoContext.current.currentTime = timestamp

        return
    }, [timestamp])
    return { duration, timestamp, setTimestamp, setMetadataLoaded, playState, setPlayState }
}

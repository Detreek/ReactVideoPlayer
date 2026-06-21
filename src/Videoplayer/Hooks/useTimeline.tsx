import React from 'react'
import { useState, useEffect } from 'react'

export default function useTimeline(videoContext: React.RefObject<HTMLVideoElement | null>) {

    const [duration, setDuration] = useState<number>(0) // sec
    const [timestamp, setTimestamp] = useState<number>(0) // sec
    const [metadataLoaded, setMetadataLoaded] = useState<boolean>(false)
    const [playState, setPlayState] = useState<boolean>(true) //isPlaying?????????????
    const [realTimestamp, setRealTimestamp] = useState<number>(0)
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
        setRealTimestamp(timestamp)
        console.log("UseEffect", timestamp, "Timestamp")
        return
    }, [timestamp])

    const setTimestampImidiate = (timestamp: number) => {
        return setRealTimestamp(timestamp)
    }
    return { duration, timestamp: realTimestamp, setTimestamp, setMetadataLoaded, playState, setPlayState, setTimestampImidiate }
}

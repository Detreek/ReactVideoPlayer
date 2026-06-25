import Hls from "hls.js"
import { useEffect, useState } from "react";


export default function useHls(videoContext: React.RefObject<HTMLVideoElement>, m3u8Url: string) {
    const [quality, setQuality] = useState(-1)

    function Createhls(): Hls {
        if (m3u8Url === null || m3u8Url === undefined) {
            throw "no m8u3Url"

        }
        if (videoContext.current === null) {
            throw "no video element"

        }
        const config = {
            // Replace limitRenditionByPlayerDimensions: true
            capLevelToPlayerSize: true,
        };
        const hls = new Hls(config);
        hls.loadSource(m3u8Url);
        hls.attachMedia(videoContext.current)
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {

            console.log('video and hls.js are now bound together !');
        });

        hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data) {
            const highestQualityIndex = data.levels.length - 1;
            hls.currentLevel = highestQualityIndex;
        })


        return hls
    }




    useEffect(() => {
        const hls = Createhls()
        console.log(hls.levels);
        setQuality(hls.currentLevel)
    }, [])
    return {}
}


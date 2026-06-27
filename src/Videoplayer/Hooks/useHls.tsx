import Hls from "hls.js"
import { useEffect, useState } from "react";

export default function useHls(videoContext: React.RefObject<HTMLVideoElement | null>, m8u3Url: string) {
    const [hls, setHls] = useState<Hls | null>(null)
    const [qualityLevel, setQualityLevel] = useState(-1)
    const [qualityLevelList, setQualityLevelList] = useState<Array<string> | null>(null)


    const Createhls = (m3u8Url: string): Hls => {
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

            const qualityLevelMANIFEST: string[] = data.levels.map<string>((e) => (e.width.toString())) // govno code

            setQualityLevelList(qualityLevelMANIFEST)


        })



        return hls
    }






    useEffect(() => {
        const hls = Createhls(m8u3Url)
        if (hls === null) {
            return
        }
        setHls(hls)
        console.log(qualityLevelList)
        console.log(hls.levels);
        return () => { hls.destroy() }
    }, [])

    useEffect(() => {
        if (hls === null) {
            return
        }

        hls.currentLevel = qualityLevel;
    }, [qualityLevel])

    return { qualityLevel, setQualityLevel, qualityLevelList, }
}


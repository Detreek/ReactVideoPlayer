import axios from 'axios';
import { type Video } from './DTO/Video';
const mainUrl = "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8" // Your main url endpoint

export async function getVideoData() : Promise<Video>{
    const videoData = await axios.get<Video>(mainUrl)
    // return(videoData.data)
    return({id: 1,
    m8u3Url:"http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
    timeDuration : 3000, // sec
    Name : "hdis",
    timeStop : 0})
    
}
export async function postVideo(UserId : number) {
    return await `api/${UserId}.m3u8`
    
}


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'

import VideoPlayer from './Videoplayer/videoPlayer.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <VideoPlayer m8u3Url='http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8' />
  </StrictMode>,
)

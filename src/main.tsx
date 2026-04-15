import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './SideBar.tsx'
import VideoPlayer from './Videoplayer/videoPlayer.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <VideoPlayer />
  </StrictMode>,
)

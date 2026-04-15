
import { useState } from 'react'
import './SideBar.css'

function SideBar(){
    const [sideBarState, setSideBarState] = useState(false)
    const openSideBar = () => {
        setSideBarState(true)
    }
    const closeSideBar = () => {
        setSideBarState(false)
    }
    return(
    <div className='top-div'>
        <button onClick={openSideBar} className={`button ${sideBarState ? 'invisible' : ''}`}>Открыть</button> {/* открывающая кнопка (за пределами sideBar-а) */}
        <div className={`bar-button ${sideBarState ? '' : 'invisible'}`} onClick={closeSideBar}></div>
        <div className={`sidebar ${sideBarState ? 'active' : ''}`}>
            
            <h1>Это SideBar</h1>
            <text>а это текст SideBar-а</text>
        </div>
    </div>)
}


export default SideBar
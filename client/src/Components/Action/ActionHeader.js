import React, {useState} from "react"
import "./actionheader.css"

const ActionHeader = ({ headerStatus, onBurgerClick, isOnline }) => {
    const [state, setState] = useState(false)
    const handleStatusChange = (e) => {
        setState(state ? false : true)
        isOnline(e.target.checked)
    }

    return (
        <div className="action_header_container" >
            <div className="burger" onClick={onBurgerClick} ></div>
            <div>
                <h4>{ headerStatus }</h4>
            </div>
            <div className="slide_container" >
                <label className="switch">
                    <input type="checkbox" checked={state} onChange={handleStatusChange} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default ActionHeader
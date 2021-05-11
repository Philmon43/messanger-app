import React from "react"
import "./button.css"

const Button = ({btnType, btnName, handleBtnClick}) => {
    return (
        <div onClick={handleBtnClick} className={`button ${btnType}`}>{btnName}</div>
    )
}

export default Button
import React, { useState } from "react"
import "./input.css"

const Input = ({handleInputVal, placeholder, type}) => {
    const [val, setVal] = useState("")

    const handleInputChange = (e) => {
        setVal(e.target.value)
        handleInputVal(e.target.value)
    }
    return (
        <input className="input" value={val} onChange={handleInputChange} placeholder={placeholder} type={type}/>
    )
}

export default Input
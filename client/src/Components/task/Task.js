import React from "react"
import "./task.css"

const Task = ({children, type}) => {
    return (
        <div className="taskPopUp">
            <div className={`box ${type}`}>
                {children}
            </div>
        </div>
    )
}

export default Task
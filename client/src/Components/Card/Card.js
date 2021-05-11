import React from "react"
import "./card.css"

const Card = ({children, height}) => {
    return (
        <div className="card" style={{height: height}}>
            {children}
        </div>
    )
}

export default Card
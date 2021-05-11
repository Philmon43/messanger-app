import React, { useEffect, useRef, useState } from "react"
import Button from "../Button/Button"
import "./actionfooter.css"

const ActionFooter = ({data, deliveryCompleted}) => {
    const [state, setState] = useState(false)
    const footerConteiner = useRef(null)

    useEffect(() => {
        if (state) {
            footerConteiner.current.classList.remove("colaps")
            footerConteiner.current.classList.add("expand")
            return 
        }
        footerConteiner.current.classList.remove("expand")
        footerConteiner.current.classList.add("colaps")
    }, [state])

    const handleFooterBarClick = () => {
        setState(state ? false : true)
    }

    return (
        <div className="action_footer_container" ref={footerConteiner}>
            <div className="bar" onClick={handleFooterBarClick} />
            {data&&<div className="task__desc">
                <div>{data.task}</div>
                <div>{data.desc}</div>
                <Button
                    btnName="Task Completed"
                    btnType="primary"
                    handleBtnClick={deliveryCompleted}
                />
            </div>}
        </div>
    )
}

export default ActionFooter
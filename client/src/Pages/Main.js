import React, { useEffect, useState } from "react"
import Button from "../Components/Button/Button"
import "./main.css"
import { useCookies } from "react-cookie"
import Axios from "../Axios/Axios"
import Maps from "../Components/googleMaps/Maps"
import ActionHeader from "../Components/Action/ActionHeader"
import ActionFooter from "../Components/Action/ActionFooter"
import Task from "../Components/task/Task"

const Main = ({ data,  onLogOut}) => {
    const [cookies] = useCookies();
    const [sideBar, setSideBar] = useState(false)
    const [online, setOnline] = useState(false)
    const [task, setTask] = useState(null)
    const [hasTask, setHasTask] = useState(false)
    const [accepted, setAccepted] = useState(null)

    useEffect(() => {
        const fetchInterval = setInterval(async() => {
            if (!task&&online) {
                const data = await (await fetchData()).data
                if (data.length > 0) {
                    setTask(data)
                    setHasTask(true)
                }
            }
        }, 5000);
        return () => clearInterval(fetchInterval)
    })


    const fetchData = async () => {
        const data = await Axios.get("/get-tasks", { headers: { "Authorization": cookies.token } })
        return data
    }
    


    const handleLogout = async () => {
        try {
            const response = await Axios.post("/users/logout", {}, { headers: { "Authorization": cookies.token } })
            if (response.status === 200) {
                onLogOut(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const isOnlineStatus = (val) => {
        setOnline(val)
    }

    const hadleAcceptedTask = async () => {
        const data = task
        const res = (await Axios.get("/customer/" + task[0].owner, { headers: { "Authorization": cookies.token } })).data
        const acceptedData = {...data[0], ...res[0]}
        setAccepted(acceptedData)
        setHasTask(false)
    }


    const onDeliveryCimplete = async () => {
        await Axios.patch("/task-completed/"+task[0]._id,{}, { headers: { "Authorization": cookies.token }})
        setTask(null)
        setHasTask(false)
        setAccepted(null)
    }

    return (
        <div className="main__action__page">
            {sideBar&&<div className="sidebar">
                <div>
                    <div className="profile_img"></div>
                    <h2>{data.firstName} {data.lastName}</h2>
                </div>
                <div className="states">
                    <div><h2>💳  Payouts</h2></div>
                    <div><h2>📅  Scheduled hours</h2></div>
                    <div><h2>📊 States</h2></div>
                    <div><h2>⚙️ settings</h2></div>
                </div>
                <Button
                    btnName="SignOut"
                    btnType="signin"
                    handleBtnClick={handleLogout}
                />
            </div>}
            <div className="map__container">
                <ActionHeader
                    headerStatus={online ? accepted?accepted.restaurant.name:"Waiting for task" : "You Are Offline"}
                    onBurgerClick={() => setSideBar(sideBar ? false : true)}
                    isOnline={isOnlineStatus}
                />

                {hasTask&&<Task type="pickup">
                    <div>
                        <h2>Restaurant</h2>
                        <div>{task[0].restaurant.name}</div>
                        <h2>Street</h2>
                        <div>{task[0].restaurant.street}</div>
                    </div>
                    <Button
                        btnName="Start"
                        btnType="primary"
                        handleBtnClick={hadleAcceptedTask}
                    />
                </Task>}

                <Maps data={accepted} />
                <ActionFooter data={accepted} deliveryCompleted={() => onDeliveryCimplete()} />
            </div>
        </div>
    )
}

export default Main
import React, {useState } from "react"
import Button from "../Components/Button/Button"
import Card from "../Components/Card/Card"
import Input from "../Components/Input/Input"
import "./login.css"
import Axios from "../Axios/Axios"
import {useCookies} from "react-cookie"


const SignIn = ({ onRegister, onLogIn, handleSuccess }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [, setCookie] = useCookies();

    const user = {
        email,
        password
    }

    const handleUserSignIn = async () => {
        try {
            const data = await Axios.post("/users/login", user)
            if (data.status === 200) {
                setCookie("token", data.data.token)
                setError(false)
                handleSuccess(true)
            }
        } catch (e) {
            setError(true)
        }
    }

    return (
        <Card>
            <h3>SignIn</h3>
            <Input
                placeholder="Email"
                type="text"
                handleInputVal={(val) => setEmail(val)}
            />

            <Input
                placeholder="Password"
                type="password"
                handleInputVal={(val) => setPassword(val)}
            />
            <Button
                btnName="SignIn"
                btnType="signin"
                handleBtnClick={handleUserSignIn}
            />
            <div className="login__nav">
                <Button
                    btnName="LogIn"
                    btnType="navigationBtn"
                    handleBtnClick={onLogIn}
                />
                <div className="line"></div>
                <Button
                    btnName="Register"
                    btnType="navigationBtn"
                    handleBtnClick={onRegister}
                />
            </div>
            {error&&<div style={{color: "red"}}>User not found,Please check your email or password</div>}
        </Card>
    )
}

const SignUp = ({ onRegister, onLogIn,handleSuccess }) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [, setCookie] = useCookies();

    const user = { firstName, lastName, email, password }
    
    const handleUserRegistration = async () => {
        try {
            const {data} = await Axios.post("/users/register", user)
            setCookie("token", data.token)
            setError(false)
            handleSuccess(true)
        } catch (e) {
            setError(true)
        }
    }

    return (
        <Card>
            <h3>Register</h3>
            <Input
                placeholder="First Name"
                type="text"
                handleInputVal={(val) => setFirstName(val)}
            />

            <Input
                placeholder="Last Name"
                type="text"
                handleInputVal={(val) => setLastName(val)}
            />

            <Input
                placeholder="Email"
                type="text"
                handleInputVal={(val) => setEmail(val)}
            />

            <Input
                placeholder="password"
                type="password"
                handleInputVal={(val) => setPassword(val)}
            />

            <Button
                btnName="SignUp"
                btnType="signin"
                handleBtnClick={handleUserRegistration}
            />
            <div className="login__nav">
                <Button
                    btnName="LogIn"
                    btnType="navigationBtn"
                    handleBtnClick={onLogIn}
                />

                <div className="line"></div>

                <Button
                    btnName="Register"
                    btnType="navigationBtn"
                    handleBtnClick={onRegister}
                />
            </div>
            {error&&<div style={{color: "red"}}>Unable to register, Please check your email or password</div>}
        </Card>
    )
}

const Login = ({success}) => {
    const [signIn, setSignIn] = useState(true)
    
    return (
        <div className="login" >
            {signIn
                ?
                <SignIn
                    onLogIn={() => setSignIn(true)}
                    onRegister={() => setSignIn(false)}
                    handleSuccess= {val => success(val)}
                />
                :
                <SignUp
                    onLogIn={() => setSignIn(true)}
                    onRegister={() => setSignIn(false)}
                    handleSuccess= {val => success(val)}
                />}
        </div>
    )
}

export default Login
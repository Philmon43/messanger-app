import React, { useEffect, useState } from "react"
import Login from "./Pages/Login"
import Main from "./Pages/Main"
import { useCookies } from "react-cookie"
import Axios from "./Axios/Axios"


const App = () => {
  const [login, setLogin] = useState(false)
  const [cookies,] = useCookies(["token"]);
  const [user, setUser] = useState("")
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Axios.get("/", { headers: { "Authorization": cookies.token } })
        if (data.status === 200) {
          setLogin(true)
          setUser(data.data)
        }
      }catch (e) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [cookies]);
  
  return (
    <>
      {login ? <Main data={user} onLogOut={(val) => setLogin(val) } />:<Login success={() => setLogin(true)} />}
    </>
  )
}

export default App
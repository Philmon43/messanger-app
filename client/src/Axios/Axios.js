import axios from "axios";

let url = "http://localhost:5000"

if (process.env.NODE_ENV === "production") {
    url = "/"
}

export default axios.create({
    baseURL: url,
})
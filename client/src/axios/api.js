import axios from "axios";

const Api = axios.create({
    baseURL:'http://localhost:2000/api'
})


export default Api
import axios from "axios";
import { USER_TOKEN } from "../constants/localstorage";

export const API_URL: string = `http://localhost:5000/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers!.authorization= `Bearer ${localStorage.getItem(USER_TOKEN)}` !
    return config
})

export default $api
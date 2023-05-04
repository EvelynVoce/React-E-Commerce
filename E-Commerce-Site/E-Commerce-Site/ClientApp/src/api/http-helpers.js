import axios from "axios";

export const client = axios.create({
    baseURL: "https://localhost:7272/api/",
    timeout: 30000
})
import axios from "axios";

export const client = axios.create({
    /*baseURL: "https://localhost:7245/api/",*/ // C# API
    baseURL: "http://localhost:8000/api/", // Python API
    timeout: 30000
})
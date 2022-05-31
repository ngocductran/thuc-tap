import axios from "axios"

// const headers = { 'Content-Type': 'application/json' }

const instance = axios.create({
    baseURL:"http://127.0.0.1:8080/api/team",
});

export const getAllTeam = (url:string) =>{
    return instance.get(url)
}


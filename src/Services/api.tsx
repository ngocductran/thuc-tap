import axios from "axios"

const headers = { 'Content-Type': 'application/json' }

const instance = axios.create({
    baseURL:"http://127.0.0.1:8080/api/work",
});

export const getAllWork = (url:string) =>{
    return instance.get(url)
}

export const getWorkByID = (url:string) =>{
    return instance.get(url)
}

export const updateWork = (url:string, data:string) =>{
    return instance.put(url, data, {headers: headers})
}

export const delWorkByID = (url:string) =>{
    return instance.delete(url)
}

import { api } from "../utility/requester.js";

const Base_URL = "http://localhost:3030/";
const endpoints = {
    login: "users/login",
    register: "users/register",
    logout: "users/logout"
}



async function login(data){
    return await api.post(Base_URL+endpoints.login,data);
}


async function register(data){
    return await api.post(Base_URL+endpoints.register,data);
}

async function logout(){
    return await api.get(Base_URL+endpoints.logout);
}

export const userService ={
    login,
    register,
    logout
}
import { api } from "../utility/requester.js"


const Base_URL = "http://localhost:3030/data";
const endpoints = {
    myFurniture: (userId)=>`/catalog?where=_ownerId%3D%22${userId}%22`,
    furniture: "/catalog"
}


async function createFurniture(data) {
    return await api.post(Base_URL + endpoints.furniture, data);
}

async function getAllFurniture(){
    return await api.get(Base_URL+endpoints.furniture);
}

async function getFurnitureDetails(id){
    return await api.get(Base_URL+endpoints.furniture + `/${id}`);
}

async function updateFurniture(id,data){
    return await api.put(Base_URL+endpoints.furniture + `/${id}`,data);
}


async function delFurniture(id){
    return await api.del(Base_URL+endpoints.furniture + `/${id}`);
}

async function getMyFurniture(userId){
    return await api.get(Base_URL+endpoints.myFurniture(userId));
}


export const dataService={
    createFurniture,
    getAllFurniture,
    getFurnitureDetails,
    updateFurniture,
    delFurniture,
    getMyFurniture
}
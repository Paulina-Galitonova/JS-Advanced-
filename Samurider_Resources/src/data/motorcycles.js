import { del, get, post, put } from "./request.js";

const endpoints = {
    dashboard: "/data/motorcycles?sortBy=_createdOn%20desc",
    motorcycle : "/data/motorcycles",

    motorById: "/data/motorcycles/",
}


export async function getAllMotors() {
    return get(endpoints.dashboard);
}

export async function getMotorById(id) {
    return get(endpoints.motorById + id);
}

export async function createMotor(model,imageUrl,year,mileage,contact,about) {
    return post(endpoints.motorcycle, { model,imageUrl,year,mileage,contact,about })
}

export async function updateMotor(id, data) {
    return put(endpoints.motorById + id, data);
}

export async function deleteMotor(id) {
    return del(endpoints.motorById + id);
}


export async function searchByQuery(query) {
    return await get(`/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
  }
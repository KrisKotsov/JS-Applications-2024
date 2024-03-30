import { get, post, put, del } from './request.js';

const endpoints = {
    dashboard: '/data/cars?sortBy=_createdOn%20desc',
    cars: '/data/cars',
    details: '/data/cars/'
}

export async function getAllCars() {
    return get(endpoints.dashboard);
}

export async function createCar(model, imageUrl, price, weight, speed, about) {
    return post(endpoints.cars, {
        model,
        imageUrl,
        price,
        weight,
        speed,
        about
    });
}

export async function getCarById(id) {
    return get(endpoints.details + id);
}

export async function deleteCar(id) {
    return del(endpoints.details + id);
}

export async function updateCar(id, data) {
    return put(endpoints.details + id, data)
}
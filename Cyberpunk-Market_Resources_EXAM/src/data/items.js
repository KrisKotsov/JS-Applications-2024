import { get, post, put, del } from "./request.js";

const endpoints = {
    allItems: '/data/cyberpunk?sortBy=_createdOn%20desc',
    items: '/data/cyberpunk',
    details: '/data/cyberpunk/'
}

export async function getAllItems() {
    return get(endpoints.allItems)
}

export async function sellItem(item, imageUrl, price, availability, type, description) {
    return post(endpoints.items, {
        item,
        imageUrl,
        price,
        availability,
        type,
        description
    })
}

export async function getItemById(id) {
    return get(endpoints.details + id)
}

export async function updateItem(id, data) {
    return put(endpoints.details + id, data)
}

export async function deleteItem(id) {
    return del(endpoints.details + id)
}

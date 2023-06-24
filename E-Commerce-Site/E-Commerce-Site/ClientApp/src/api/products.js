import { client } from "./http-helpers";

export const getProducts = () => {
    return client.get('getProducts').then(response => response.data);
}

export const getItemDetails = (id) => {
    return client.get(`getItemDetails/${id}`).then(response => response.data);
}

export const getProductType = (product_type) => {
    return client.get(`getProductType/${product_type}`).then(response => response.data);
}

export const getProductTypes = () => {
    return client.get(`getProductTypes`).then(response => response.data);
}
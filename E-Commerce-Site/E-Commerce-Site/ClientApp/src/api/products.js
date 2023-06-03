import { client } from "./http-helpers";

export const getProducts = () => {
    return client.get('getProducts').then(response => response.data);
}

export const getItemDetails = (id) => {
    return client.get(`getItemDetails/${id}`).then(response => response.data);
}
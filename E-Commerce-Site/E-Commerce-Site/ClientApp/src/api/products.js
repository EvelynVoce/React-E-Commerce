import { client } from "./http-helpers";

export const getProducts = () => {
    return client.get('getProducts').then(response => response.data);
}
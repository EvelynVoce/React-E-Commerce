import { client } from "./http-helpers";

export const addItemToCart = (userID, productID, quantity) => {
    return client.post('addItemToCart', { userID, productID, quantity }).then(response => response.data);
}
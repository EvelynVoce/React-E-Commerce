import { client } from "./http-helpers";

export const addItemToCart = (userID, productID, quantity) => {
    return client.post('addItemToCart', { userID, productID, quantity }).then(response => response.data);
}

export const getCartItems = (userID) => {
    return client.get(`getCartItems/${userID}`).then(response => response.data);
}

export const getProductsInCart = (productIdsInCart) => {
    return client.get(`getProductsInCart/${productIdsInCart}`).then(response => response.data);
}

export const updateStoredQuantity = (cartId, quantityChange) => {
    return client.post('updateQuantity', { cartId, quantityChange }).then(response => response.data);
}
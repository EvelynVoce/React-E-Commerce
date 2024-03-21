// @ts-ignore
import { client } from "./http-helpers";
import cart from "../Models/Cart";

export const addItemToCart = (userID: string, productID: string, quantity: number) => {
    return client.post('addItemToCart', { userID, productID, quantity }).then((response: { data: null; }) => response.data);
}

export const getCartItems = (userID: string) => {
    return client.get(`getCartItems/${userID}`).then((response: { data: cart[]; }) => response.data);
}

/*export const getProductsInCart = (productIdsInCart) => {
    return client.get(`getProductsInCart/${productIdsInCart}`).then(response => response.data);
}*/

export const updateStoredQuantity = (cartId: string, quantityChange: number) => {
    return client.post('updateQuantity', { cartId, quantityChange }).then((response: { data: null; }) => response.data);
}

export const removeItem = (cartId: string) => {
    return client.post('removeItem', { cartId }).then((response: { data: null; }) => response.data);
}
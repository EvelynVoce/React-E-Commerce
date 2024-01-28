import { client } from "./http-helpers";

export const addLikedItem = (userID, productID) => {
    return client.post('addLikedItem', { userID, productID }).then(response => response.data);
}

/*
export const getLikedItems = (userID) => {
    return client.get(`getCartItems/${userID}`).then(response => response.data);
}

export const removeLikedItem = (cartId) => {
    return client.post('removeItem', { cartId }).then(response => response.data);
}*/

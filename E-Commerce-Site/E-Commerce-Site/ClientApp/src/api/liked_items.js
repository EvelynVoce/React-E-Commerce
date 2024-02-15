﻿import { client } from "./http-helpers";

export const addLikedItem = (userID, productID) => {
    return client.post('addLikedItem', { userID, productID }).then(response => response.data);
}

export const removeLikedItem = (userID, productID) => {
    return client.post('removeLikedItem', { userID, productID }).then(response => response.data);
}

export const getLikedItems = (userID) => {
    return client.get(`get_liked_items/${userID}`).then(response => response.data);
}

export const getIsLiked = (userID, productID) => {
    return client.get(`get_is_liked/${userID}/${productID}`).then(response => response.data);
}


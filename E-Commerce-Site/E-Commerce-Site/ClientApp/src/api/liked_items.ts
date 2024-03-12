import { client } from "./http-helpers";
import Products from "../Models/Products";

export const addLikedItem = (userID: string, productID: string) => {
    return client.post('addLikedItem', { userID, productID }).then((response: { data: null; }) => response.data);
}

export const removeLikedItem = (userID: string, productID: string) => {
    return client.post('removeLikedItem', { userID, productID }).then((response: { data: null; }) => response.data);
}

export const getLikedItems = (userID: string) => {
    return client.get(`get_liked_items/${userID}`).then((response: { data: Products[]; }) => response.data);
}

export const getIsLiked = (userID: string, productID: string) => {
    return client.get(`get_is_liked/${userID}/${productID}`).then((response: { data: boolean; }) => response.data);
}


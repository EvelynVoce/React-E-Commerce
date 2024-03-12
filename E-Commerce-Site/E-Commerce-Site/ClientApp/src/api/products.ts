import { client } from "./http-helpers";
import Products from "../Models/Products";
import SpecificProduct from "../Models/SpecificProducts";

export const getProducts = () => {
    return client.get('getProducts').then((response: { data: Products[]; }) => response.data);
}

export const getItemDetails = (id: string) => {
    return client.get(`getItemDetails/${id}`).then((response: { data: SpecificProduct[]; }) => response.data);
}

export const getProductType = (product_type: string) => {
    return client.get(`getProductType/${product_type}`).then((response: { data: Products[]; }) => response.data);
}

export const getProductTypes = () => {
    return client.get(`getProductTypes`).then((response: { data: string[]; }) => response.data);
}
export const search = (criteria: string) => {
    return client.get(`search/${criteria}`).then((response: { data: Products[]; }) => response.data);
}
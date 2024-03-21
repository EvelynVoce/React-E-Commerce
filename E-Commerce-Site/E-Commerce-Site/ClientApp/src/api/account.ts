// @ts-ignore
import { client } from "./http-helpers";

export const addUser = (username: string, password: string) => {
    return client.post('addUser', { username, password }).then((response: { data: null; }) => response.data);
}

export const availableUsername = (username: string) => {
    return client.get(`availableUsername/${username}`).then((response: { data: boolean; }) => response.data);
}

export const login = (username: string, password: string) => {
    return client.post(`login`, { username, password }).then((response: { data: string; }) => response.data);
}
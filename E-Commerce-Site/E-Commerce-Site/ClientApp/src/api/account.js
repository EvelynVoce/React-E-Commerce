import { client } from "./http-helpers";

export const addUser = (username, password) => {
    return client.post('addUser', { username, password }).then(response => response.data);
}

export const availableUsername = (username) => {
    return client.get(`availableUsername/${username}`).then(response => response.data);
}

export const login = (username, password) => {
    return client.post(`login`, { username, password }).then(response => response.data);
}
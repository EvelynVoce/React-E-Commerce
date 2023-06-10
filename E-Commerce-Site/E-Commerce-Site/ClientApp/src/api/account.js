import { client } from "./http-helpers";

export const addUser = (username, password) => {
    return client.post('addUser', { username, password }).then(response => response.data);
}
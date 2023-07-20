import axios from 'axios';

const usersUrl = 'http://localhost:8085';


export const getUsers = async (props) => {
    return await axios.post(`${usersUrl}/`, props);
}

export const addUser = async (user) => {
    return await axios.post(`${usersUrl}/create`, user);
}
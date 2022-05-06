import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://sphereproject.herokuapp.com/api/',
})
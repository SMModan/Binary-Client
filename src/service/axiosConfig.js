import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    // timeout: 1000,
    // headers: {'Content-Type': 'application/json; charset=utf-8'}
});
// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default instance;
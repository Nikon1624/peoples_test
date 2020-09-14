import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'https://swapi.dev/api/',
    responseType: 'json'
});

export {HTTP};
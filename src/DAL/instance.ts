import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.flickr.com/services/rest'
})
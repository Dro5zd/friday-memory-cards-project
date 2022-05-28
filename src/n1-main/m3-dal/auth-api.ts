import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})

export const authAPI = {
    getTest() {
        return instance.get('ping')
    },
}

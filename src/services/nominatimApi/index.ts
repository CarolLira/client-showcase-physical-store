import axios from 'axios';

export const storeApi = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org/'
});
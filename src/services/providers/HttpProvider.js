import axios from 'axios';
import { config  } from '../../config/constants';

const HttpProvider = axios.create({
    baseURL: `${config.api}`,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

HttpProvider.interceptors.request.use(async config => {
    let session = localStorage.getItem('session');    
    session = session ? JSON.parse(session) : '';
    config.headers['Authorization'] = `Bearer ${session.token}`;    
    return config;
}, err => {
    console.log('Request error');
    return Promise.reject(err);        
});

export default HttpProvider;
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
    /*
        Redirects to homepage when user is signed in and manually removes the session from LocalStorage and
        tries to make a request. Otherwise, just adds Authorization header.
    */
   if (!session & window.location.pathname !== '/' & window.location.pathname !== '/signin' & window.location.pathname !== '/signup') {
       window.location = '/';
   } else {
       session = session ? JSON.parse(session) : '';
       config.headers['Authorization'] = `Bearer ${session.token}`;
   }
   return config;
}, err => {
    console.log('Request error');
    return Promise.reject(err);        
});

export default HttpProvider;
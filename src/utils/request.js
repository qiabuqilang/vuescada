import axios from 'axios';
import { Message } from 'element-ui';


const tcy8 = sessionStorage.getItem('_tcy8');

const serviceConfig = tcy8 ? {
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {                     
    'Content-Type': ' application/json',
    Accept: ' application/json',
    Authorization: `Basic ${tcy8}`,  
      
  },  
} : {
  baseURL: process.env.BASE_API,
  timeout: 5000,
  headers: {
                     
    'Content-Type': ' application/json',
    Accept: ' application/json',
    
  },
  auth: {
    username: '',
    password: '',
  },
};

const service = axios.create(serviceConfig);
service.interceptors.request.use(
  config => 
    config
  ,
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  response => response,

  (error) => {
    console.log(`err${error}`);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
export default service;

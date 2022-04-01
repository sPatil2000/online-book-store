// import httpClient from '../http-common2';

// const getAll = () => {
//   return httpClient.get('');
// };

// const create = (data) => {
//   return httpClient.post('', data);
// };

// const get = (id) => {
//   return httpClient.get(`${id}`);
// };

// const update = (data) => {
//   return httpClient.put('', data);
// };

// const remove = (id) => {
//   return httpClient.delete(`/${id}`);
// };
// export default { getAll, create, get, update, remove };
import axios from 'axios';
import { Component } from 'react';
import authHeader from './auth-header';
import AuthService from './auth.service';


const API_URL = 'http://localhost:9090/api/cart/';

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.token){
    const token = 'Bearer ' + user.token;
    config.headers.Authorization =  token;
  }

  return config;
});

class CartService {

  async getAll() {
         return await axios.get(API_URL);
   }
   async get(id){
    return await axios.get(API_URL +`${id}`);
   }
   async update(data) {
    return await axios.put(API_URL,data);
   }

   async create (data)
   {
     return await axios.post(API_URL,data);
   }

async remove(id) {
   return await axios.delete(API_URL+ "delete/" + `${id}`); 
}

async removeall(id) {
  return await axios.delete(API_URL); 
}
}
export default new CartService();
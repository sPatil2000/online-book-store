import axios from 'axios';
import { Component } from 'react';
import authHeader from './auth-header';
import AuthService from './auth.service';


const API_URL = 'http://localhost:9090/api/order/';

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.token){
    const token = 'Bearer ' + user.token;
    config.headers.Authorization =  token;
  }

  return config;
});


class OrderService {
 
   async getAll(){
    return await axios.get(API_URL );
   }
   

    async create(data) {
      return await axios.post(API_URL,data);
}

 
};


export default new OrderService();

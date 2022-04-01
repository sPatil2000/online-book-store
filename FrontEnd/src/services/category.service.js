import axios from 'axios';
import { Component } from 'react';
import authHeader from './auth-header';
import AuthService from './auth.service';


const API_URL = 'http://localhost:9090/api/admin/category/';

axios.interceptors.request.use( config => {
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.token){
    const token = 'Bearer ' + user.token;
    config.headers.Authorization =  token;
  }

  return config;
});


class CategoryService {
  async getAll() {
         return await axios.get(API_URL);
   }
   async get(id){
    return await axios.get(API_URL +`${id}`);
   }
   async update(data) {
    return await axios.put(API_URL,data);
   }

    async create(data) {
      return await axios.post(API_URL,data);
}
async remove(id) {
  return await axios.delete(API_URL +`${id}`);
 }
 
};


export default new CategoryService();


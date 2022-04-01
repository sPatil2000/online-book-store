import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:9090/api/admin/product/',
  headers: {
    'Content-Type': 'application/json',
  },
});

import axios from "axios";

const API_URL = "http://localhost:9090/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
         // alert(JSON.stringify(response.data)); //data is display in alert 
          localStorage.setItem("user", JSON.stringify(response.data));
         // alert(localStorage.getItem("user"));
        }

        return response.data;
      });
  }

  logout() {
    //alert("Sucessfully Logout");
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();


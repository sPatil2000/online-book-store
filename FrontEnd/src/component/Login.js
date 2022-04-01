/* import { useState } from "react";
import AuthService from "../service/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };




const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");





    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await AuthService.login(username, password).then(
            () => {
              this.props.history.push("/home")
              window.location.reload();
            },
            (error) => {
              console.log(error);
            }
          );
        } catch (err) {
          console.log(err);
        }
      };













return (
    <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
  );
};

export default Login; */


import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { ReactComponent as Logo } from "../assests/person-295.svg";
import Admin from './Admin';
import "../assests/css/login.css"
import google from "../assests/google.svg";
import linkedin from "../assests/linkedin.svg";
import facebook from "../assests/facebook.svg";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          const user = JSON.parse(localStorage.getItem('user'));
          if(user.roles.includes("ADMIN"))
          {
           // alert(user.roles);
            this.props.history.push("/admin");
          }
          else //customer
          {
            //alert(user.role);
            this.props.history.push("/viewproduct");
          }
          
          
          
          alert(this.state.username +" Login successfully");

        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: "Login failed please try again!"
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  
  render() {
    return (
   <div>

  
      <div className="div-login">
          <Form onSubmit={this.handleLogin} ref={c => { this.form = c;}}>
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                          />
                        </div>




                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required]}
                          />
                        </div>



                        <div className="form-group">
                          <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                          </button>
                        </div>





                      {this.state.message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {this.state.message}
                          </div>
                        </div>
                      )}



                      <CheckButton
                        style={{ display: "none" }}
                        ref={c => {
                          this.checkBtn = c;
                        }}
                      />
                      <h6>Not a member ?<u><a href="/signup">signup now</a></u></h6>
                   
                  <center><> <img src={google} width="25" height="25"></img> </>
    
                  <> <img src={linkedin} width="25" height="25"></img></>
                   <><img src={facebook} width="35" height="35"></img></></center>
                    </Form>
                    

      </div>
      </div>
    );
  }
}
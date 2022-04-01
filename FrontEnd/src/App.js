import React from "react";
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Component, useState} from 'react'; 
import Register from "./component/Register";
import Home from "./component/Home";
import Login from "./component/Login";
import ProductList from "./component/ProductList";
import Category from "./component/Category";
import CategoryList from "./component/CategoryList";
import AddProduct from "./component/AddProduct";
import Books from "./component/Books";
import Cartt from "./component/Cartt"; 
import Admin from "./component/Admin"; 
import NavbarComp from "./component/NavbarComp";
import ViewProduct from "./component/ViewProduct";
import DisplayByCategory from "./component/DisplayByCategory";
import UpdateQuantity from "./component/UpdateQuantity";
import OrderForm from "./component/PlaceOrder";
import OrderDetails from "./component/OrderDetails";
import authService from "./services/auth.service";
import ProtectedRoute from './component/ProtectedRoute';
import SearchbyProduct from "./component/SearchbyProduct";
class App extends Component{
  constructor(props){
    super(props)
    this.logout=this.logout.bind(this);
    this.state = {
      //1==login 0==not login
      auth:false,
    };



    

  }

  logout()
  {
    alert("logout");
    authService.logout();
  }
 
loginHandler=()=>{
 

    this.setState({auth:!this.state.auth});
    //alert("heyy" +  this.state.auth);
   

  }
  render(){
  return(
 <BrowserRouter>
 <NavbarComp login={this.loginHandler} status={this.state.auth}/>
      <div>
      
          <Switch>
           <Route exact path="/" component={Home} />
           <Route exact path="/signup" component={Register}/>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/category" component={CategoryList}/>
           <Route exact path="/product" component={ProductList}/> 
           <Route exact path="/book" component={Books}></Route>
           <Route exact path="/category/add" component={Category}/> 
           <Route exact path="/product/add" component={AddProduct}/> 
           <Route exact path="/category/edit/:id" component={Category}/>
           <Route exact path="/product/edit/:id" component={AddProduct} />
           <ProtectedRoute exact path="/cartt" component={Cartt} auth={this.state.auth}/>
           <Route exact path="/book" component={Books}></Route>
           <Route exact path="/admin" component={Admin}></Route>
          {/*  <Route exact path="/viewproduct" component={ViewProduct}></Route> */}
           <Route exact path="/updatequantity" component={UpdateQuantity}></Route>
           <Route exact path="/order" component={OrderForm}></Route>
           <Route exact path="/orderdetails" component={OrderDetails}></Route>
           <ProtectedRoute exact path="/viewproduct" component={ViewProduct}  auth={this.state.auth}/>
           <Route exact path="/category/:id" component={DisplayByCategory}  />
           <Route exact path="/search/:key" component={SearchbyProduct}  />



          {/*  <Redirect to="/"/> */}
          </Switch>
        </div>
    
    </BrowserRouter>

  )
}
}
export default App;
//https://www.iloveimg.com/resize-image#resize-options,percentage
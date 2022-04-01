import React , {Component} from "react";
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import NotFound from './NotFound';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default class Product extends Component{
    render(){
        return (
            <div>
          <Router>
            <div>
      <h1>Product page</h1>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/add" component={AddProduct}/>
            <Route path="/product/edit/:id" component={AddProduct} />
            <Route path="*" component={NotFound} /> 
            
          </Switch>
        </div>
     
    </Router>
</div>
    )
        }
}

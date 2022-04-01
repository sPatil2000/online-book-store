import React, {Component} from "react";
import {Navbar,Nav,NavDropdown,Form,Button,FormControl,Card} from 'react-bootstrap'; 
import { Container } from 'react-bootstrap';
import Home from './Home';
//import Logout from './Logout';

import CategoryList from './CategoryList'; 
import ProductList from './ProductList'; 
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';

  export default function Admin(){
  
    return (
      <div>
{/* <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
<Container>
<Navbar.Brand href="home.js">BookStore</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse id="responsive-navbar-nav">


<Nav.Link as={Link} to="/home">
<Button variant="outline-light" size="sm">
Home
</Button>
</Nav.Link>
 
 <Nav.Link as={Link} to="/logout">
<Button variant="outline-light" size="sm">
Logout
</Button>
</Nav.Link>
</Navbar.Collapse>
</Container>
</Navbar> */}
{/* <a href="/category">CategoryList</a>
<a href="/product">ProductList</a>
 <BrowserRouter>
      
        <div>
          <Switch>
            <Route exact path="/category" component={CategoryList} />
            <Route exact path="/product" component={ProductList} />
          </Switch>
        </div>
     
    </BrowserRouter> */}

  
    <Card border="primary" style={{ width: '18rem' }}>
    <Card.Header><h4>Category</h4></Card.Header>
    <Card.Body>
      <Card.Title>Manage all product section here.</Card.Title>
      <Card.Text>
      <a href="/category">Add category</a>
      </Card.Text>
    </Card.Body>
  </Card>
  
  <Card border="primary" style={{ width: '18rem' }}>
    <Card.Header><h4>Product</h4></Card.Header>
    <Card.Body>
      <Card.Title>Manage all product section here.</Card.Title>
      <Card.Text>
      <a href="/product">Add product</a>
          </Card.Text>
    </Card.Body>
  </Card>
  
 </div>
    )
}

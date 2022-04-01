import React, {Component} from "react";
import {Navbar,Nav,NavDropdown,Form,Button,FormControl} from 'react-bootstrap'; 
import { Container } from 'react-bootstrap';
import Register from './Register';
import Home from './Home';
import Login from './Login';
import Books from './Books';
import SearchIcon from '@mui/icons-material/Search';
import {Search} from 'react-bootstrap-icons';
import DisplayCategory from "./DisplayCategory";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProtectedRoute from './ProtectedRoute';

import authService from "../services/auth.service";
/* import Category from './Category';
import CategoryList from './CategoryList'; */
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ViewProduct from "./ViewProduct";
import { margin } from "@mui/system";
import Searchbook from "./Search";



export default function NavbarComp(props){
  
        return (
      
           
                <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
  <Container>
  <Navbar.Brand href="/">BookStore</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    
      <DisplayCategory/>

      <Nav.Link as={Link} to={"/viewproduct"} varient="info">Books </Nav.Link>
   {/*    <input type="search" id="algolia-doc-search" placeholder="Search" aria-label="Search docs" class="css-7dpbpx ds-input" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-labelledby="algolia-doc-search" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;"> */}


    {/*  <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="m-lg-2"
          aria-label="Search"
          width="60"
        />
      <SearchIcon/> 
    
      </Form>  */}


<div className="col-12 col-md-8 mt-2 mt-md-0">
 
  <Route render={({history}) =><Searchbook history={history}/>}/>

</div>




    {/*  <div >
               <input type="search" name="search" value={this.state.searchtext}
               onChange={(event)=>this.setState({searchtext:event.target.value})}/>&nbsp;
               <button className="btn btn-primary  " >search</button>
           </div> */}

    </Nav>
   
    <Nav.Link as={Link} to="/signup">
  <Button variant="outline-light" size="sm">
 Signup
  </Button>
</Nav.Link>
     <Nav.Link as={Link} onClick={props.login} to="/login">
  <Button variant="outline-light" size="sm">
   {props.status?"Logout":"Login"}
  
   
  </Button>
</Nav.Link>

<Nav.Link as={Link} to="/cartt">
  <Button variant="outline-light" size="sm">
  <ShoppingCartIcon/>
  </Button>
</Nav.Link>



  </Navbar.Collapse>
  
  </Container>
</Navbar>
            
        )
}

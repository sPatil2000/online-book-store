import React from "react";
import { Carousel,CarouselItem } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { CardGroup,Button} from "react-bootstrap";
import cartService from "../services/cart.service";
import productService from '../services/product.service';
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import Cartt from './Cartt';
import "../assests/css/carteffect.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
const DisplayByCategory=()=>{

    const [product, setproducts] = useState([]);
    const {id} = useParams();

    /* const[id, setId] = useState('');
    const[quantity, setQuantity] = useState(''); */
    const init = () => {
      //e.preventDefault();
     
      productService.getallproductbycategory(id)
        .then(response => {
          console.log('Printing product data', response.data);
          setproducts(response.data);
        })
        .catch(error => {
          console.log('Something went wrong', error);
        }) 
    }
  
    useEffect(() => {
      init();
    }, []);

    const history = useHistory();
    const routeCart = (id,quantity) =>{ 

      var button =document.getElementById("btn");
      if(quantity==0)
      {
        alert("Product is out of stock");
       
       // button.value="Out Of Stock";

      }
      else
      {



       // alert('clicked');
       /*  let path = `/cart`; 
        history.push(path); */
       //e.preventDefault();
       alert(id);
         const data={
          bookId : id,
         quantity : quantity,
        }
        //alert("data is "+data);
       // const product = {product.id,quantity};
         cartService.create(data)
        .then(response => {
         
            history.push("/cartt");
            alert("Product added successfully!");
        })
        .catch(error => {
            console.log('something went wrong', error);
        } ) 


       /*  e.preventDefault();
        const data={
          product_id: product.id,
          product_quantity : product.quantity,
        }
        axios.post(`/api/cart/add`).then(res=>{
          if(res.data.status===201){
            alert("Success");
          }
          else{
            alert("error");
          }
        }); */
      }
      }
      useEffect(() => {
        init();
      }, []);
    return (
        <div>
<Container>
            <Row>
                {product.map((product, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src={`data:image/jpeg;base64,${product.data}`} width="120px" />

                            <Card.Body>
                                <Card.Title>Book Title : {product.productName}</Card.Title>
                                <Card.Text>Description : {product.description}</Card.Text>
                                <Card.Text>Category : {product.categoryName}</Card.Text>
                                <Card.Text>Price : {product.price}</Card.Text>
                                <Card.Text>Quantity : {product.quantity}</Card.Text>
                                <button    id="btn" onClick={()=>routeCart(product.id,product.quantity)} value={product.id}  className="btn btn-danger">Add to cart</button>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    )
}
export default DisplayByCategory;


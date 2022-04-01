import React from "react";
import { Carousel,CarouselItem } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { CardGroup,Button} from "react-bootstrap";
import cartService from "../services/cart.service";
import productService from '../services/product.service';
import { useHistory } from "react-router-dom";
import Cartt from './Cartt';
import "../assests/css/carteffect.css"
import { Card, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
const ViewProduct=()=>{

  const arr=[];
    const [product, setproducts] = useState([]);
    const [cartArr, setcartarr] = useState([]);
    const [disbale, setDisable] = useState(false);
    /* const[id, setId] = useState('');
    const[quantity, setQuantity] = useState(''); */
    const init = () => {
      productService.getAll()
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
    const orderStatus=()=>{
      history.push("/orderdetails");
    }
  


  
    const routeCart = (id,quantity) =>{ 
    
      var button =document.getElementById("btn");
      if(quantity==0)
      {
        alert("Product is out of stock");
        setDisable(true);
        button.value="Out Of Stock";

      }
      else
      {

      // alert(id);
         const data={
          bookId : id,
         quantity : 1,
        }
        //alert("data is "+data);
  
        cartService.getAll()
        .then(response => {
        
          
         console.log('Printing cart data', response.data.cartItems);
          setcartarr(response.data.cartItems);
     { (response.data.cartItems).map(p=>(
                  //setpid(p.product.id)
                
                  arr.push(p.product.id)
                  
          ))
      }
      console.log("dataaaaaaaaaaaaaa--------->"+arr[0]+arr[1]+"----"+data.bookId+"-------"+arr.includes(data.bookId))
       console.log('Printing cost data', response.data);


       if(arr.includes(data.bookId))
       {
           alert("product already exist in the cart");
       }
       else{
         cartService.create(data)
         .then(response => {
           alert("Product added successfully!");
             history.push("/cartt");
         })
         .catch(error => {
             console.log('something went wrong', error);
         } ) 
 
       }



       })
        .catch(error => {
          console.log('Something went wrong', error);
        })
        console.log("dataaaaaaaaaaaaaa--------->"+arr[0]+arr[1]+"----"+data.bookId+"-------"+arr.includes(data.bookId))
          
      }   
       
    }
      useEffect(() => {
        init();
      }, []);
    return (
        <div>
        <Button variant="primary" style={{display: 'flex', justifyContent: 'right', width:116 ,margin:10}}  className="float-right" onClick={()=>orderStatus()}>Order status </Button>

<Container>
            <Row >
                {product.map((product, k) => (
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card >
                            <Card.Img src={`data:image/jpeg;base64,${product.data}`} width="120px" />

                            <Card.Body>
                                <Card.Title>Book Title : {product.productName}</Card.Title>
                                <Card.Text>Description : {product.description}</Card.Text>
                                <Card.Text>Category : {product.categoryName}</Card.Text>
                                <Card.Text>Price : {product.price}</Card.Text>
                                <Card.Text id="quantity">Quantity : {product.quantity} </Card.Text>
                                <button  id="btn"   onClick={()=>routeCart(product.id,product.quantity)} value="Add to Cart" className="btn btn-danger"  >Add to cart</button>
                            </Card.Body>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </div>
    )
}
export default ViewProduct;
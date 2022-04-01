import React  from "react";
import {div,Form,Button} from 'react-bootstrap';
import { useState ,useEffect } from "react"; 
import { Link, useParams } from "react-router-dom";
import productService from '../services/product.service';
import { getAlertUtilityClass } from "@mui/material";
import { Card, Row, Col, Container } from "react-bootstrap";
import cartService from "../services/cart.service";
import { useHistory } from "react-router-dom";
const SearchbyProduct=()=>{

    const [product, setproducts] = useState('');
    const [cartArr, setcartarr] = useState([]);
    const [data, setdata] = useState([]);
    const[id,setId]=useState('');
    const[name, setName] = useState('');
    const[catname, setCatName] = useState('');
    const[pid, setpId] = useState('');
    const[description, setDescription] = useState('');
    const[image, setImage] = useState('');
    const[price, setPrice] = useState('');
    const[quantity, setQuantity] = useState('');
    const {key} = useParams();

    const arr=[];

    const init = () => {
       
        productService.getAll()
          .then(response => {
            console.log('Printing product data----->', response.data);
            setproducts(response.data); 
          // console.log(product.productName);
           /*  (response.data).map(p=>(
                //setpid(p.product.id)
                //alert(p.id)
              //p.productName==key ? alert(setId(p.id)): setId(0)
                //alert(p.productName==key)

               {
                if(p.productName==key) {
                    setId(p.id)
                }
               }  */
               let id = (response.data).map(function(p) {
                if (p.productName==key) 
                   return p.id;
                else
                    return 0;
                
              })
              function checkbookid(id) {
                return id > 0;
              }
              const result = id.filter(checkbookid);
              //alert("result" + result);
              //console.log(id);
             
               
                productService.get(result)
                .then(response => {
                  alert(result);
                  console.log("respppppppppppp"+response.data.id);
                    setproducts(response.data);
                    console.log("-------------------------"+product);
                  //  alert(data.productName);
                    setName(product.productName);//state hooks
                    //alert(data.categoryName);
                   setCatName(product.categoryName)
                    setDescription(product.description);
                    setImage(product.data);
                    //alert(product.data);
                    setpId(product.id);
                    //alert(data.price);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                   // alert("catid "+product.data.catid);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
                
              

 })
          .catch(error => {
            console.log('Something went wrong', error);
          }) 
      }
      const routeCart = (id,quantity) =>{ 
    
        var button =document.getElementById("btn");
        if(quantity==0)
        {
          alert("Product is out of stock");
          //setDisable(true);
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
        (response.data.cartItems).map(p=>(
                    //setpid(p.product.id)
                  
                    arr.push(p.product.id)
                    
            ))
       
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
              // history.push("/cartt");
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





      return(
        <div>
       

<Container>
            <Row >
               
                    <Col xs={12} md={4} lg={3}>
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
               
            </Row>
        </Container>
        </div>


      )
  

}
export default SearchbyProduct;


import React from "react";
import "../css/order.css";
import { useState } from "react";
import cartService from "../services/cart.service";
import { useEffect } from "react/cjs/react.development";
import {Card,table,Button} from 'react-bootstrap'; 
import orderService from '../services/order.service';
const OrderDetails = () => {
  //get the user
const user = JSON.parse(localStorage.getItem("user"));

const [cartArr, setcartarr] = useState([]);
const [orderArr, setOrdertarr] = useState([]);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState('');
    const[mobileno, setMobile] = useState('');
    const[zipcode, setZipcode] = useState('');
    const[msg, setMsg] = useState('');
    const[status, setStatus] = useState('');
    const[state, setState] = useState('');
    const[price, setTotalPrice] = useState('');
    const[paymentmode, setPayementMode] = useState('');
    const [clicked, setClicked] = useState(false);

const confirmfun=()=>{
  if(!clicked){
    setClicked(true);
  cartService.removeall()
  .then(response =>{
   // setcartarr(response.data.cartItems);
    console.log("remove all------->"+response.data);
  })
  .catch(error => {
    console.log('Something went wrong', error);
  })
    alert('Thank you for shopping!');
  }
}
const init = () => {

    //get the items detail place byuser
    cartService.getAll()
        .then(response => {
        
           //alert("cart data"+response.data);
        
         console.log('Printing cart data', response.data.cartItems);
          setcartarr(response.data.cartItems);
          
          //alert(cost);
         // alert(response.data.totalCost);
          console.log('Printing cost data', response.data);
          console.log("cart array printing "+cartArr.cartItems);
           //console.log("totalllllll "+cartArr.totalCost); 
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })

    orderService.getAll()
        .then(response => {
        
           //alert("cart data"+response.data);
        
         console.log('Printing order data', response.data);
         setOrdertarr(response.data);
         //alert(response.data.price + "-------"+response.data.zipcode);
        setTotalPrice(response.data.price);
        setMsg("Your Order is Placed Sucessfully!");
        //setStatus(response.data.msg);
        setState(response.state);
        setZipcode(response.zipcode);
        setAddress(response.data.address);
          setEmail(user.email);
           setName(user.username);
        //  alert("in getting data" + user.email);
          
        })
        .catch(error => {
          console.log('Something went wrong', error);
        }) 
    }
    useEffect(() => {
      init();
    }, []);


    return(
      <>
      <center><div>
       {/* <h1>Order details page......</h1> */}
       <br/>
       <br/>
       <br/>
       <br/>
       <br/>
       <>
       {
          orderArr.map(order=>(
            <div>
  <Card border="primary" style={{ width: '35rem' }}>
    <Card.Header><b>Your Order Details</b></Card.Header>
    <Card.Body>
      <Card.Title>Hello, {name}</Card.Title>
      <Card.Text>
      <div class="alert alert-success" role="alert">
            {msg}
          </div>
          <div class="alert alert-primary" role="alert">
            Order Status : {order.msg}
          </div>
        <h4>  All purchased items </h4>
        <table className="table table-striped">
        <thead>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </thead>

        <tbody>
      <div>
          {
          cartArr.map(cart=>(
            <tr>
    
            <td >{cart.product.name}</td>
            <td>{cart.product.price}</td>
            <td>{cart.quantity} </td>
            <td>{cart.product.price *cart.quantity}</td>
            </tr>
              ))}

              </div> 
      
         {/* {
          orderArr.map(order=>( */}
            <tr>
            <tr><b>Total Price  : {order.price}</b></tr>
            <tr><b>Delivery Address : </b>{order.address} </tr>
            </tr>
         
         
        <tr>
            <td>

            </td>
            <td>

            </td>
            <td></td>
            <td><Button variant="info" onClick={()=>confirmfun()} >Done</Button></td>
        </tr>
        </tbody>
        </table>
        
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  </div>
  ))}
</>

       </div>
       </center> </>
    )
}
export default OrderDetails;


  
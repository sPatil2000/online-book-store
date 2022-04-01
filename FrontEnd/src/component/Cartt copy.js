import React from "react";
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams} from "react-router-dom";
import {Button} from 'react-bootstrap'; 
/* import { Table , Button } from "react-bootstrap-icons"; */
import cartService from "../services/cart.service";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';
import UpdateQuantity from "./UpdateQuantity";
const Cartt =()=>{

  const [cartArr, setcartarr] = useState([]);
  const[categoryId, setCatId] = useState('');
  const history = useHistory();

  const init = () => {
    cartService.getAll()
        .then(response => {
           alert("cart data"+response.data);
        
          console.log('Printing cart data', response.data.cartItems);
          setcartarr(response.data.cartItems);
          console.log("cart array printing "+cartArr.cartItems);
           //console.log("totalllllll "+cartArr.totalCost); 
        })
        .catch(error => {
          console.log('Something went wrong', error);
        }) 
    }
    useEffect(() => {
      init();
    }, []);

    const handleDelete = (id) => {
      console.log('Printing id', id);
      cartService.remove(id)
        .then(response => {
          alert('cart item deleted successfully!');
          init();
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
    }

    const handleUpdate = (id) => {
      console.log('Printing id for quantity update ', id);
      <UpdateQuantity/>
    
    }
  return(


<div >

<h6>Welcome back, Name</h6>
<h5>In Your Cart : <b>4 items</b></h5>
<a href="/ViewProduct">continue shopping</a>
<table className="table table-striped">
        <thead>
            <tr className="float-center">
                <th >Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Delete</th>
                <th>Total</th>
              
            </tr>
        </thead>
        <tbody>
        {
          cartArr.map(cart=>(
<tr>
            <td>{cart.product.name}</td>
            <td>{cart.product.price}</td>
            <td>{cart.product.quantity} 

            <div onClick={() => {
                    handleUpdate(cart.id);
                 
                  }}>
            <EditIcon/></div></td>
            <td>{/* <Button variant="danger" size="sm" onClick={() => {
                    handleDelete(cart.id);
                  }}> */}
                  <div onClick={() => {
                    handleDelete(cart.id);
                  }}>
  <RestoreFromTrashIcon/></div></td>
            <td>{cart.product.quantity*cart.product.price}</td>
          </tr>

          )
          )
        }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total : 34455</td>
          </tr>
        
        </tbody>
 </table>
 {/* 
 <h6><b>Total</b></h6>
 <hr/> */}
 <center><button className="btn4 btn-primary" style={{width:'200px'}} onClick={() => this.placeOrder()}>Place Order</button>
 </center>
 </div>

);
}
export default Cartt;
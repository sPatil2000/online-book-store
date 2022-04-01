import React from "react";
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams} from "react-router-dom";
import {Button,Modal} from 'react-bootstrap'; 
/* import { Table , Button } from "react-bootstrap-icons"; */
import cartService from "../services/cart.service";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';

import UpdateQuantity from "./UpdateQuantity";
import { color } from "@mui/system";


const Cartt =()=>{
  const[quantity, setQuantity] = useState('');
  const[cartId, setCartId] = useState('');
  //const[bookId, setBookId] = useState('');
  const [show, setShow] = useState(false);
  const[pid,setpid]=useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [cartArr, setcartarr] = useState([]);
  const [cost, setCost] = useState([]);
  const[categoryId, setCatId] = useState('');
  const history = useHistory();
var x;
//get the user
const user = JSON.parse(localStorage.getItem("user"));


  const init = () => {
    cartService.getAll()
        .then(response => {
         
           //alert("cart data"+response.data);
        const arr=[];
         console.log('Printing cart data', response.data.cartItems);
          setcartarr(response.data.cartItems);
         // setpid(response.data.cartItems[0].product.id)
          setCost(response.data.totalCost);
          //alert(cost);
          console.log("data---->"+response.data.cartItems[0].product.id);
         { (response.data.cartItems).map(p=>(
                  //setpid(p.product.id)
                
                  arr.push(p.product.id)
                  
          )
          )
        }

        console.log("pid array data"+arr[0]);
         // alert(response.data.totalCost);
          console.log('Printing cost data', response.data);
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

    const handleDelete = (e,id) => {
      console.log('Printing id', id);
      cartService.remove(id)
        .then(response => {
          e.preventDefault();
          e.stopPropagation();
          alert('cart item deleted successfully!');
        init();
         //init();
        })
        .catch(error => {
          console.log('Something went wrong', error);
        })
    }


   /*  const history = useHistory(); */
   // const {id} = useParams();
   
    const saveQuantity = (e,id,bookId,quantity) => {
        e.preventDefault();

        const product = {id,bookId,quantity};
     // alert("id "+id);
      //alert("bookId "+bookId);
     // alert("quantity "+quantity);
      
            //update
            cartService.update(product)

                .then(response => {
                  // alert(response.data);
                  e.preventDefault();
                   console.log("update quanityt response --->" + response.data);
                    //history.push('/category');
                    //window.location.reload(false);
                    init();
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        
    }
   
    /*  useEffect(() => {
     
          cartService.get(id)
              .then(product => {
                  setQuantity(product.data.quantity);//state hooks
                 // console.log("iddddddddddddddd in set "+product.data.id);
                  //setBookId(product.data.bookId);
              })
              .catch(error => {
                  console.log('Something went wrong', error);
              })
     
  }, [])  */


  return(


<div >

<h6>Welcome , {user.username}</h6>
<h5>In Your Cart : <b>{cartArr.length}</b></h5>
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
            <td>{cart.quantity} 
 
            <div>


            <div onClick={handleShow}>
  <EditIcon/></div>

           {/*  <Button variant="primary" onClick={handleShow}>
         <EditIcon/>
        </Button> */}
  
        <Modal show={show} onHide={handleClose}>
          
            <center><Modal.Title>Update Quantity</Modal.Title></center>
         
          <Modal.Body>

          <div className="form-group">
                    <input 
                        type="number" 
                        max={5}
                        min={1}
                        className="form-control col-4"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter quantity"
                    />

                </div>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => saveQuantity(e,cart.id,cart.product.id,quantity)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

            </div></td>

            <td>{/* <Button variant="danger" size="sm" onClick={() => {
                    handleDelete(cart.id);
                  }}> */}
                  <div onClick={(e) => {
                    handleDelete(e,cart.id);
                  }}>
  <RestoreFromTrashIcon/></div></td>
            <td>{cart.product.quantity*cart.product.price} </td>
          </tr>

          )
          )
        }
       
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total : {cost} </td>
          </tr>
      
        </tbody>
 </table>
 {/* 
 <h6><b>Total</b></h6>
 <hr/> */}
 <center><Link className="btn btn-info" style={{width:'200px'}} to={`/order`}>Place Order</Link>
</center>
{/* <button className="btn4 btn-primary"  onClick={() => this.placeOrder()}>Place Order</button> */}
 </div>

);
}
export default Cartt;
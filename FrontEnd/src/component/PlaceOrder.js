import React from "react";
import "../css/order.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
// import { Link, useHistory, useParams } from "react-router-dom";
import orderService from '../services/order.service';
import cartService from "../services/cart.service";
import { useEffect } from "react/cjs/react.development";
import { Form, Row, Col, Button} from "react-bootstrap";
import productService from '../services/product.service';



const PlaceOrder = () => {

  
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[address, setAddress] = useState('');
    const[mobileno, setMobile] = useState('');
    const[zipcode, setZipcode] = useState('');
    const[city, setCity] = useState('');
    const[state, setState] = useState('');
    const[price, setTotalPrice] = useState('');
    const[pid, setPid] = useState('');
    const[quantity, setQuantity] = useState('');
    const[paymentmode, setPayementMode] = useState('');
    const [cartArr, setcartarr] = useState([]);
    const [pdata, setpdata] = useState([]);
    var obj={};
    const arr=[];
   //console.log("=======total cost in order page---->" + {cost});

   const user = JSON.parse(localStorage.getItem('user'));
  // alert(user.username + "----"+user.email);
  const history = useHistory();

  function validate()
  {
    if(state=='' && paymentmode=='' && city=='' && address=='' && mobileno=='' && zipcode=='')
    {
      alert("PLease Fill all the details");
    } 
   
  }

   const init = () => {
    cartService.getAll()
        .then(response => {
        
           //alert("cart data"+response.data);
        
         console.log('Printing cart data', response.data.cartItems);
          //setcartarr(response.data.cartItems);
          setTotalPrice(response.data.totalCost);
          setcartarr(response.data.cartItems);
          setEmail(user.email);
          setName(user.username);
        //  alert("in getting data" + user.email);
          //alert(cost);
          //alert(price);
          console.log('Printing cost data', response.data);
         
           //console.log("totalllllll "+cartArr.totalCost); 
        })
        .catch(error => {
          console.log('Something went wrong', error);
        }) 
    }
    useEffect(() => {
      init();
    }, []);
    const saveData = (e) => {
      e.preventDefault();
     validate();
      const order = {name,email,mobileno,address,city,zipcode,state,paymentmode,price};
      alert(order.name);
     console.log(order);
          orderService.create(order)
              .then(response => {
                 alert('Order has been placed sucessfully!');
                // console.log("Order respnose from backend"+response.data);
               // cartArr.splice(0,cartArr.length);
                history.push('/orderdetails');


                //get all the cart items of user
                //productid,quanityt---->update in product table
               }   
       
       )

        .catch(error => {
          console.log('Something went wrong', error);
        })

      } 
    


    return(
      <center><div>
       <div className="div-order">
<div className="container">
           <Form>
  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" 
        value={user.email}
        
      />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" 
        value={user.username}
         
      />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="Enter delivery address"
    required
    value={address}
    onChange={(e) => setAddress(e.target.value)}
     />
  </Form.Group>

  <Row className="mb-2">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control placeholder="Enter city"
required
value={city}
         onChange={(e) => setCity(e.target.value)}
      />
    </Form.Group>

   
    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control placeholder="Enter zip code"
           value={zipcode}
           required
         onChange={(e) => setZipcode(e.target.value)}
      />
    </Form.Group>
  </Row>
  <Row className="mb-2">
  <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label><br/>
      <Form.Select defaultValue="Choose..." required onClick={(e) => setState(e.target.value)}
>
        <option>Choose</option>
        <option value="Madhyapradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Uttarpradesh">Uttar Pradesh</option>
        <option value="Goa">Goa</option>
        <option value="Gujrat">Gujrat</option>
      </Form.Select>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Mobile number</Form.Label>
      <Form.Control type="text" placeholder="Enter Mobile number" 
        value={mobileno}
        required
        RegExp={/^\d{10}$/}

         onChange={(e) => setMobile(e.target.value)}
      />
    </Form.Group>
    </Row>
    <Row>
    <Form.Group as={Col} >
      <Form.Label>Total price</Form.Label>
      <Form.Control type="text" 
        value={price} width="10"
         
      />
    </Form.Group>
    <Form.Group as={Col}>
  <Form.Check type="radio" value="CASH_ON_DELIVERY" required
  onChange={(e) => setPayementMode(e.target.value)}
    label="Cash on delivery" aria-label="radio 1" />
</Form.Group>
</Row>
    {/* <fieldset>
    <Form.Group as={Row} className="mb-3"> 
        <Form.Check
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
    
    </Form.Group>
  </fieldset> */}
  <Button variant="primary" type="submit" style={{width:75}} onClick={(e) => saveData(e)}>
    Submit
  </Button>
</Form>
</div>
</div>
       </div>
       </center> 
    )
}
export default PlaceOrder;


{/* <div className="div-order">
<div className="container">
<h3>PLace Order</h3>
<hr/>
<form >
<div className="radio">
  <label>
    <input type="radio" value="CASHONDELIVERY" checked={true} />
   Cash On Delivery
  </label>
  
</div>
<div className="radio">
  <label>
    <input type="radio" value="ONLINE" checked={true} />
   Online payment
  </label>
  
</div>
    <div className="form-group">
        <label>Name </label>
        <input 
            type="text" 
            className="form-control col-4"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your name"
          
        />

    </div>
    <div className="form-group">
    <label>Email </label>
    <input 
            type="text" 
            className="form-control col-4"
           
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter name"
           
        />
    </div>
    <div className="form-group">
    <label>Mobile Number </label>
    <input 
            type="text" 
            className="form-control col-4"
            id="mobile"
            value={mobile}
            onChange={(e) => setAddress(e.target.value)}
           
            placeholder="Enter Mobile Number"
        />
    </div>
    <div className="form-btn">
        <label>Address</label>
        <input 
            type="text" 
            className="form-control col-4"
            id="address"
        
            value={address}
            onChange={(e) => setAddress(e.target.value)}
           
            placeholder="Enter Delivery Address here...."
        />

    </div>
   
    <div className="form-btn">
        <label>zipcode</label>
        <input 
            type="text" 
            className="form-control col-4"
            id="zipcode"
        
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
           
           
        />

    </div>

    <div className="form-btn">
        <label>city</label>
        <input 
            type="text" 
            className="form-control col-4"
            id="city"
        
            value={zipcode}
            onChange={(e) => setCity(e.target.value)}
           
            
        />

    </div>
  
    <div >
    <td>
        <button className="btn btn-dark">Place Order</button>
        </td>
    </div>
</form>
<hr/>
</div>
</div> */}

/* if (typeof input["phone"] !== "undefined") {

         

    var pattern = new RegExp(/^[0-9\b]+$/);
  
    if (!pattern.test(input["phone"])) {
  
      isValid = false;
  
      errors["phone"] = "Please enter only number.";
  
    }else if(input["phone"].length != 10){
  
      isValid = false;
  
      errors["phone"] = "Please enter valid phone number.";
  
    }
  
  }
  
  https://www.itsolutionstuff.com/post/react-phone-number-validation-exampleexample.html

  *//*  (
                  
    productService.updateProductQuantity(pdata)
    .then(response =>{
      alert("resp of updated product qunaityt" + response.data)
    })
    .catch(error => {
      console.log('Something went wrong', error);
      console.log(pdata.pid);
    })
    ) */
  
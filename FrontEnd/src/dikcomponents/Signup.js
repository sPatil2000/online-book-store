import React from "react"; 
import { useState } from 'react';
import signup from '../css/signup.css'
export default function Signup() {

// States for registration
const [name, setName] = useState('');
const [lname, setLName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handleName = (e) => {
setName(e.target.value);
setSubmitted(false);
};
const handleLName = (e) => {
    setLName(e.target.value);
    setSubmitted(false);
    };

// Handling the email change
const handleEmail = (e) => {
setEmail(e.target.value);
setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
setPassword(e.target.value);
setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
e.preventDefault();
if (name === '' || lname==='' || email === '' || password === '') {
setError(true);
} else {
setSubmitted(true);
setError(false);
}
};

// Showing success message
const successMessage = () => {
return (
<div
className="success"
style={{
display: submitted ? '' : 'none',
}}>
{/* alert('button click catched'); */}
<h3>{name} successfully registered!!</h3>
<h5>Continue with
<button type="button" class="btn btn-link">Login!</button>
</h5>
</div>
);
};

// Showing error message if error is true
const errorMessage = () => {
return (
<div
className="error"
style={{
display: error ? '' : 'none',
}}>
<h5>Please enter all the fields</h5>

</div>
);
};

return (
<div className="form">
<div>
<h1>User Registration</h1>
</div>

{/* Calling to the methods */}
<div className="messages">
{errorMessage()}
{successMessage()}
</div>

<form>
{/* Labels and inputs for form data */}
<label className="label">First Name</label>
<input placeholder="Enter your first name" onChange={handleName} className="input"
value={name} type="text" />

<label className="label">Last Name</label>
<input placeholder="Enter your last name" onChange={handleLName} className="input"
value={lname} type="text" />

<label className="label">Email</label>
<input placeholder="Enter your email" onChange={handleEmail} className="input"
value={email} type="email" />

<label className="label">Password</label>
<input placeholder="Enter password" onChange={handlePassword} className="input"
value={password} type="password" />

<br/>
<button onClick={handleSubmit}  className="btn btn-success" type="submit">
Submit
</button>
<button type="button" class="btn btn-link">Click here for login !</button>
</form>
</div>
);
}

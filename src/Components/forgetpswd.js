import React, { useState } from 'react';
import { NavLink,useNavigate } from "react-router-dom"

export const Forget = () =>{
    const [email,setEmail]=useState("");
    const [Loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const [f,setF]=useState(true);
    const navigate=useNavigate();

   
    function emailValidation() {
        console.log('emailvalid')
        return new Promise((resolve,reject) =>{const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!email || regex.test(email) === false){
            setError( "Email is not valid");
            resolve( false);
        }
        else{
           resolve(true);
           setError("");
        }
        })
     }  ;
    const handleEmail =  (e) =>{
        setEmail(e.target.value);
        
     }
     function  handleSubmit (e){
        setLoading(true)
        e.preventDefault();
        setError("");
        emailValidation()
        .then(valemail =>{
           if(valemail==true){
              console.log(email)
              fetch('https://kitchenb.onrender.com/forgot-password', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({email :email})

              }).then(function(response) {
              console.log(response)
              return response.json();
              }).then(msg=>{
                alert(msg.message)
                navigate('/Login')
              });
            }
          
        }).catch(err =>{
           //alert (err)
           alert('invalid email')
        }) ;}
      
    

    return (
        <>
       {!Loading ? <div class="wrapper">
            <div class="title">
            Please Enter you Registered Email ID
            </div>
            <form onSubmit={handleSubmit}>
            <div class="field">
                <input type="email" required onChange={handleEmail}/>
                <label>Email</label>
            </div>
            <div class="field">
                <span>{error}</span>
            </div>
            <div class="field">
              {f && <input type="submit" value="Login" />}
            </div>
            </form>   
        </div> : <div class="loader">
        <span class="loader-text">loading</span>
        <span class="load"></span>
    </div> }</>
         ) 
    
  }
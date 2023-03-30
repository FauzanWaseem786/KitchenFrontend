import React, { useState } from 'react';
import { NavLink } from "react-router-dom"

export const Login = () =>{
    const [username,SetUsername] =useState("")
    const [password,SetPassword]=useState("")
    const [msg,SetMsg]=useState("")

    const handlePassword=(e)=>{
      SetPassword(e.target.value);
    }
    const handleUsername=(e)=>{
      SetUsername(e.target.value);
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      fetch('https://kitchenb.onrender.com/Login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username:username,password:password})
      }).then(function(response) {
         if(response.status!= 200){
            return(response.status)
         }
         else{
            return response.json();
         }
         
      }).then(function(token){
         if(token==500 || token ==401){
            if(token==500){
               SetMsg("Server Facins some issues Please try later ")
            }
            else{
               SetMsg("Incorrect Username/Password")
            }
         }
         else{
            SetMsg("")
            localStorage.setItem('token', token.token);
            localStorage.setItem('dp',token.dp)
            window.location.replace('/Explore')
         }
         

      });
    }

    return (
        <div class="wrapper">
        <div class="title">
           Login Form
        </div>
        <form onSubmit={handleSubmit}>
           <div class="field">
              <input type="text" required onChange={handleUsername}/>
              <label>Username</label>
           </div>
           <div class="field">
              <input type="password" required onChange={handlePassword}/>
              <label>Password</label>
           </div>
           <div class="content" ><span>{msg}</span></div>
           <div class="content">
              <div class="checkbox">
                 <input type="checkbox" id="remember-me"/>
                 <label for="remember-me">Remember me</label>
              </div>
              <div class="pass-link">
                 <NavLink to="/forgot-password">Forgot password?</NavLink>
              </div>
           </div>
           <div class="field">
              <input type="submit" value="Login"/>
           </div>
           <div class="signup-link">
              Not a member? <NavLink to ="/Signup">Signin</NavLink>
           </div>
        </form>
     </div>
         ) 
    
  }
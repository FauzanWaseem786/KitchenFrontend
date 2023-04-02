import { LineAxisOutlined } from '@mui/icons-material';
import { setRef } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom"


export const Signup = () =>{
   
   const [username,setUsername]=useState("");
   const [email,setEmail]=useState("");
   const [dp,setDp]=useState("");
   const [f,setF]=useState(0);
   const [password,setPassword]=useState("");
   const [error,setError]=useState("");
   const [error1,setError1]=useState("");
   const [display,setDisplay]=useState(false)
    
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
   function userValidation(e){
      console.log('usevals')
      return new Promise((resolve,reject)=>{
      fetch(`https://kitchenb.onrender.com/validation?email=${email}&username=${username}`, {
        method: 'GET'
      }).then(function(response) {
        return response.json();
      }).then(validity =>{
         console.log(validity);
         resolve(validity);
      }).catch((err)=>{
          reject(err);
      });
   })
   };
  
   const handleUsername = (e) =>{
      setUsername(e.target.value);
   }
    const handleEmail = (e) =>{
      setEmail(e.target.value);
      if(emailValidation){
         setF(1);
      }
   }
   const handlePassword = (e) =>{
      setPassword(e.target.value);
   }
   const handleDp = (e) =>{
      setDp(e.target.files[0]);
     
   }
   
   function  handleSave (e){
      setDisplay(true)
      e.preventDefault();
      setError("");
      setError1("");
      emailValidation()
      .then(valemail =>{
         console.log(valemail)
         if(valemail==true){
           return userValidation();
         }
      }).then(valUsr =>{
         console.log('valid',valUsr.check)

         if(valUsr.check==1){
            const frm=new FormData()
            frm.append("username",username)
            frm.append("email",email)
            frm.append("password",password)
            frm.append("file",dp)
            setError("");
            setError1("");
            fetch('https://kitchenb.onrender.com/Signup', {
            method: 'POST',
            body: frm
            }).then(function(response) {
            setDisplay(false);
            console.log(response)
            alert('Signed in Successfully')
            window.location.replace('/Login')
            return response.json();
            });
          }
          else if(valUsr.check==2){
            setDisplay(false);
            setError("The email already exists")
            
            //alert('hey !! The email already exists')
          }
          else{
            setDisplay(false);
            setError1("The username already exists")
            //alert('hey !! The username already exists')
          }
      }).catch(err =>{
         //alert (err)
         console.log('invalid email')
      }) ;

   }

    
   return (
        <div class="wrapper">
         {display &&  <div className="cover-spin" ></div>}
        <div class="title">
           Signup!!!
        </div>
        <form  onSubmit={handleSave } enctype="multipart/form-data">
           <div class="field">
              <input type="text" required onChange={handleUsername}/>
              <label>Username</label>
           </div>
           <div className="wrning">{error1}</div>
           <div class="field">
              <input type="email" required onChange={handleEmail}/>
              
              <label>Email</label>
           </div>
           <div className="wrning">{error}</div>
           <div class="field">
              <input type="password" required onChange={handlePassword}/>
              <label>Password</label>
           </div>
           <div class="field">
              <input type="file" name ="dp" required onChange={handleDp} />
           </div>
           
           <div class="field">
              <input type="submit" value="Signup"  />
           </div>
           
              
           
           <div class="signup-link">
              Already a member? <NavLink to ="/Login">Login now</NavLink>
           </div>
        </form>


       {/* <img src={dp} />*/}
     </div>
         ) 
    
  }
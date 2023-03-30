import React, { useState  } from 'react';
import { useParams,useNavigate } from "react-router-dom"

export const Reset = () =>{
    const [p,setP]=useState("");
    const {token}= useParams();
    const navigate=useNavigate();

    const handlePassword =  (e) =>{
        setP(e.target.value);
        
     }
     function  handleSubmit (e){
        e.preventDefault();
        fetch('https://kitchenb.onrender.com/reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({p :p,token:token})
            }).then(function(response) {
                console.log(response)
                return response.json();
                }).then(msg=>{
                    alert(msg.message)
                    navigate('/Login')
                });
            }
          
        
    

    return (
        <div class="wrapper">
            <div class="title">
            Please Enter your New Password
            </div>
            <form onSubmit={handleSubmit}>
            <div class="field">
                <input type="password" required onChange={handlePassword}/>
                <label>New Password</label>
            </div>
            
            <div class="field">
              <input type="submit" value="Submit" />
            </div>
            </form>   
        </div>   
         ) 
    
  }
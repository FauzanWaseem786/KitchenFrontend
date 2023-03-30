import { useNavigate,useLocation  } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import axios from 'axios'

export const Profile = (props) =>{
    const [user,SetUser] =useState({})
    const navigate =useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    useEffect(() => {
        if(!token){
            alert('Please Login to Unlock profile')
             navigate('/Login')
        }
        else{
            axios({
                method: 'GET',
                url: `https://kitchenb.onrender.com/Profile?username=${location.state.username}`,
                headers: {
                  'Authorization': `Bearer ${token}`
                },
             
              }).then(res => {
                 
                    SetUser(res.data)
                })
            }
      }, [location.state.username]);
    
    return (
        <>
      {token &&  <article class="card" style={{ backgroundImage: `url('data:image/jpeg;base64,${user.dp}')`,
      backgroundSize : 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: '70vh' }}>
        <div class="temporary_text">
           {user.username}
       
        </div>
    <div class="card_content">
        <span class="card_title">{user.email}</span>
            <span class="card_subtitle">{user.username} joined us On {user.createdAt}</span>
            <p class="card_description">{user.about}</p>
        
    </div>
    </article>}
    </>
         ) 
    
  }
import React, { useState ,useEffect} from 'react';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
// inside the component

   
  


export const Logout = () =>{
        const navigate=useNavigate(); 

        localStorage.removeItem('token');
        useEffect(()=>{
            
            window.location.replace('/Login')
                 
            }
        )

 };
    


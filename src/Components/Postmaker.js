import { CompressOutlined, Title } from '@mui/icons-material';
import React, { useState, useEffect} from 'react';
import { NavLink } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
// inside the component

   
  
export const Postmaker = () =>{
    const navigate=useNavigate(); 
    const [fils,setFils]=useState([]);
    const [uid,setUid]=useState(0);
    const [ucid,setUcid]=useState(0);
    const [caption,setCaption]=useState();
    const token = localStorage.getItem('token');
     
    
    
    useEffect(()=>{
        try {
            const decoded = jwt_decode(token);
            console.log(decoded)
            // token is valid and has not expired
          } catch (err) {
             console.log(err);
             navigate('/Login')
             
             
          }
    })
    

    /* ucid common content , uid user specific content*/ 
    
    
    const handleSave =(e) =>{
        e.preventDefault();
        /* send to server*/
     //   const post={caption:caption,files:fils,fav:0}
        const frm=new FormData()
        frm.append("Caption",caption)
        frm.append("fav",0)
        for(let j=0;j<fils.length;j++){
            frm.append("files",fils[j])
        }
        
        fetch('https://kitchenb.onrender.com/Postmaker', {
        method: 'POST',
       // headers: {'Content-Type': 'application/json'},
        body: frm
      }).then(function(response) {
        console.log(response)
        alert("posted")
        window.location.replace('/Explore')
        return response.json();
      });
 
        
        var cptn=document.getElementById("Caption")
        cptn.value=''
    
        

    }
   const handleFils =(e) =>{
        let tmp=[]
        for (let i=0;i<e.target.files.length;i++){
            tmp.push(e.target.files[i])       
        }
        setFils(tmp);
    }
    const handleCaption =(e) =>{
        setCaption(e.target.value)
    }
    

    return(
       /* <div className="frmContainer">
            <form className="pstfrm">
                
                <label for="Caption">Caption </label>
                <input type="text" id="Caption" name="Caption" onChange={handleCaption} />
                <label for="file">Post Images/Videos</label>
                <input type="file" multiple={true} id="file" name="file" onChange={handleFils}/>
                <input type="Submit" id="Submit" name="Submit" onClick={handleSave}/>
            </form>
            {fils.length>0 &&<h4 >Preview </h4>}
            {fils.length>0 && <div className="grid-container">
                {fils.map((fil,index) => <div className="grid-item" ><img src={fil} key={index}  /></div> )}   
            </div>}

        </div>*/
        
        <>
            {token && < div class="pstfrm">
            <div class="postitle">
               Post you Recipes
            </div>
            <form className="Frm" onSubmit={handleSave} enctype="multipart/form-data">
               <div className="caption">
                  <input type="text" required onChange={handleCaption} />
                  <label>Caption</label>
               </div>
               <div className="pics">
               <input type="file" multiple={true}  name="file" onChange={handleFils} required/>
                  <label>Post Pics</label>
               </div>
                <h4 className='Pmkrh4'>Preview </h4>
              
                <div className="grid-container">{fils.length==0 && <span>Preview of Posted images appear here</span>}
                {fils.map((fil,index) => <div className="grid-item" ><img src={URL.createObjectURL(fil)} key={index} /></div> )}
                </div>
               <div className="postbtn">
                  <input type="submit" value="Submit" />
               </div>
               <div className="signup">
                  Not a member? <a href="#">Signup now</a>
               </div>
            </form>
         </div>
        }
        </>
    )
}



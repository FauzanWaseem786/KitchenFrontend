import { NavLink } from "react-router-dom"
import { useState,useRef, useCallback, useEffect} from "react";
import useCommentGetter from './commentGetter'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import isValidToken from "./isValidToken";


export const SPost = (props) =>{
    const [comment,setComment]=useState("");
    const [i,setI]=useState(0);
    const [more,setMore]=useState(0);
    const [pageCmntNumber, setPageCmntNumber] = useState(0)
    const token = localStorage.getItem('token');
     
    
    
  
   
   
    const handleCmnt = (e) =>{
      try {
        const decoded = jwt_decode(token);
        // token is valid and has not expired
      } catch (err) {
         console.log(err);
         alert('Please Login to comment')
         
      }
        setComment(e.target.value);
    } 


    const handleComment= (e ,id) =>{
        
        e.preventDefault();
        
        if(isValidToken(token)){
          const decoded = jwt_decode(token);
          console.log(decoded.username)
        fetch(`https://kitchenb.onrender.com/Post`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username :decoded.username , comment:comment,upid:id})
        }).then(function(response) {
          console.log(response)
          
          return response.json();
        });
   
        }
        else{
          alert('Sorry !! but you cannot comment without logging in')
        }
        
        /* send to server */
       var cmnt=document.getElementById("Comment")
       cmnt.value=''
    }
    

    const handleColor = (e)=>{
      e.target.classList.toggle('aaactive')
  }

  const {
    comments,
    loading,
    error,
    hasMore,
    
  } = useCommentGetter(pageCmntNumber,props.post.id)
    
     
    return(
    
            <div className="Post"  key={props.post}>
                <div className="Title"><NavLink to ="/Profile" state = {{username: props.post.username}}><img class="circle" src={`data:image/jpeg;base64,${props.post.userDp}`}/><span>{props.post.username}</span></NavLink></div>
                <div className ="imgcontainer">
                <div className="imgrid">
                        <img src={`data:image/jpeg;base64,${props.post.files[i%props.post.files.length]}`} />
                </div>
                <button className="Love"><i class="material-icons lovecolor" onClick={handleColor}>favorite</i></button>
                    {props.post.files.length>1 && <button className="leftImg"><i class="material-icons " onClick={()=>setI((i)=>i-1)}>keyboard_arrow_left</i></button>}
                    {props.post.files.length>1 &&<button className="righttImg"><i class="material-icons "onClick={()=>setI((i)=>i+1)}>keyboard_arrow_right</i></button>}
                </div>
                {props.post.caption ? (<div className="Caption">
                {/* showing caption if it exists in props.post and not if it doesn't*/}
                {/* using more or less on basis of length of caption*/}
                {props.post.caption && props.post.caption.length>350 && more==0 && props.post.caption.substr(0,350)} 
                {props.post.caption && props.post.caption.length>350 && more==0 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(1)}>...More </span>}
                {props.post.caption && props.post.caption.length>350 && more==1 && props.post.caption} 
                {props.post.caption && props.post.caption.length>350 && more==1 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(0)}>...less </span>}
                {props.post.caption && props.post.caption.length<=350 && props.post.caption}
                </div>) : (<div></div>)}
                        
                        
                   
                <div className="Cmntbton">Comments<span className="sort" >Sort</span></div>
                <div className="Cmntgrid" >
                    <div className="Cmnt"><form onSubmit={(e) => handleComment(e, props.post.id)}><input type="text" placeholder="Comment ..." id="Comment" name="Comment" onChange={handleCmnt} /><input type="Submit" hidden/></form></div>
                 {/*   {props.post.comments &&<div className="Cmnt"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${props.post.comments.commentUser}`}/></NavLink><span>{ props.post.comments.comment}</span></div> } */}
                   {comments.length>0 && comments.map((c,i)=> 
                   (
                        <div className="Cmnt"><NavLink to ="/Profile" state = {{username: c.username}}><img class="circle" src={`data:image/jpeg;base64,${c.commentUser}`}/></NavLink><span>{c.comment}</span></div>

                   ))}
                  <div className="Cmntbton" onClick={(e) =>setPageCmntNumber((prev)=>prev+1)}><span className="sort" >{hasMore && '...Comments'}  </span></div>
                  <div >{loading && 'Loading...'}</div>
                  <div >{error && 'Comments have been blocked ! Please Login to access them '}</div> 
                  <div >{!hasMore && 'No More Comments'}</div>
                </div>
                    
                </div> 
                
                

                )
                
            }
              
        






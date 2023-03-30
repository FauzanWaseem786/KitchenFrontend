import { NavLink } from "react-router-dom"
import { useState,useRef, useCallback, useEffect} from "react";
import usePostGetter from './postgetter'
import axios from 'axios'



export const Post = () =>{
    const [comment,setComment]=useState("");
    const [more,setMore]=useState(0);
    const [pageNumber, setPageNumber] = useState(0)
    const [pageCmntNumber, setPageCmntNumber] = useState(0)
    const [hasMoreComments, sethasMoreComments] = useState(true)
    const [Comments, SetComments] = useState([])



   
   
    const handleCmnt = (e) =>{
        setComment(e.target.value);
    } 


    const handleComment= (e,username ,id) =>{
        
        e.preventDefault();
       
        fetch(`http://localhost:5000/Post`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username :username /**current user will be here */, comment:comment,upid:id})
        }).then(function(response) {
          console.log(response)
          
          return response.json();
        });
   
       
        
        /* send to server */
       // var cmnt=document.getElementById("Comment")
        e.target.value=''
    }
    useEffect(()=>{
        console.log(pageCmntNumber)
    },[pageCmntNumber])
 
    const handleClickCmnt = (id,i)=>{
        axios({
            method: 'GET',
            url: `http://localhost:5000/comments?page=${pageCmntNumber}&upid=${id}`,
      
            }).then(res => {
                console.log(res.data)
                if(res.data.length>0){
                    setPageCmntNumber( prev => prev+1)
                    updateState(id,res.data)
                    SetComments((comments)=>{
                        [...comments,...res.data]})
                    console.log(posts[i].comments)
                    //posts[i].comments=[...posts[i].comments,...res.data]
                }
                sethasMoreComments(res.data.length > 0)
            }).catch(e => {
                console.log(e)
            })
    }


    const {
      posts,
      loading,
      error,
      hasMore ,
      updateState    
    } = usePostGetter(pageNumber)

    const observer = useRef();
    const lastPostElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, hasMore])
     

   

    return(
        <>
        <div className="Posts">
            {posts.map((post,index) => {
                if (posts.length === index + 1){
                return(
                <div className="Post" ref={lastPostElementRef} key={post}>
                    <div className="Title"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${post.userDp}`}/><span>{post.username}</span></NavLink></div>
                    <div className ="imgcontainer">
                    <div className="imgrid">
                        <img src={`data:image/jpeg;base64,${post.files[post.imgindex%post.files.length]}`} />
                    </div>
                        <button className="Love"><i class="material-icons lovecolor" >favorite</i></button>
                        {post.files.length>1 && <button className="leftImg"><i class="material-icons " onClick={()=>post.imgindex=post.imgindex-1}>keyboard_arrow_left</i></button>}
                        {post.files.length>1 &&<button className="righttImg"><i class="material-icons "onClick={()=>post.imgindex=post.imgindex+1}>keyboard_arrow_right</i></button>}
                    </div>
                    {post.caption ? (<div className="Caption">
                        {/* showing caption if it exists in post and not if it doesn't*/}
                        {/* using more or less on basis of length of caption*/}
                        {post.caption && post.caption.length>350 && more==0 && post.caption.substr(0,350)} 
                        {post.caption && post.caption.length>350 && more==0 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(1)}>...More </span>}
                        {post.caption && post.caption.length>350 && more==1 && post.caption} 
                        {post.caption && post.caption.length>350 && more==1 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(0)}>...less </span>}
                        {post.caption && post.caption.length<=350 && post.caption}
                        </div>) : (<div></div>)}
                        
                        
                   
                    <div className="Cmntbton">Comments<span className="sort" >Sort</span></div>
                    <div className="Cmntgrid" >
                        <div className="Cmnt"><form onSubmit={(e) => handleComment(e, post.username, post.id)}><input type="text" placeholder="Comment ..." id="Comment" name="Comment" onChange={handleCmnt} /><input type="Submit" hidden/></form></div>
                     {/*   {post.comments &&<div className="Cmnt"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${post.comments.commentUser}`}/></NavLink><span>{ post.comments.comment}</span></div> } */}
                       {post.comments.map((c,i)=>
                       (
                            <div className="Cmnt"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${c.commentUser}`}/></NavLink><span>{c.comment}</span></div>

                       ))}
                      <div className="Cmntbton" onClick={(e) =>handleClickCmnt(post.id,index)}><span className="sort" >{hasMoreComments && '...Comments'}  </span></div>
                    </div>
                    
                </div> )}
                else{
                return (
                    <div className="Post" >
                    <div className="Title"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${post.userDp}`}/><span>{post.username}</span></NavLink></div>
                    <div className ="imgcontainer">
                    <div className="imgrid">
                        <img src={`data:image/jpeg;base64,${post.files[post.imgindex%post.files.length]}`}/>
                    </div>
                        <button className="Love"><i class="material-icons lovecolor" >favorite</i></button>
                        {post.files.length>1 && <button className="leftImg"><i class="material-icons " onClick={()=>post.imgindex=post.imgindex-1}>keyboard_arrow_left</i></button>}
                        {post.files.length>1 &&<button className="righttImg"><i class="material-icons "onClick={()=>post.imgindex=post.imgindex+1}>keyboard_arrow_right</i></button>}
                    </div>
                    {post.caption ? (<div className="Caption">
                        {/* showing caption if it exists in post and not if it doesn't*/}
                        {/* using more or less on basis of length of caption*/}
                        {post.caption && post.caption.length>350 && more==0 && post.caption.substr(0,350)} 
                        {post.caption && post.caption.length>350 && more==0 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(1)}>...More </span>}
                        {post.caption && post.caption.length>350 && more==1 && post.caption} 
                        {post.caption && post.caption.length>350 && more==1 && <span style={{fontWeight: "Bold",cursor: "Pointer"}} onClick={()=>setMore(0)}>...less </span>}
                        {post.caption && post.caption.length<=350 && post.caption}
                        </div>) : (<div></div>)}
                        
                        
                   
                    <div className="Cmntbton">Comments<span className="sort" >Sort</span></div>
                    <div className="Cmntgrid" >
                        <div className="Cmnt"><form onSubmit={(e) => handleComment(e, post.username, post.id)}><input type="text" placeholder="Comment ..." id="Comment" name="Comment" onChange={handleCmnt} /><input type="Submit" hidden/></form></div>
                     {/*   {post.comments &&<div className="Cmnt"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${post.comments.commentUser}`}/></NavLink><span>{ post.comments.comment}</span></div> } */}
                     {Comments.map((c,index)=>(
                            <div className="Cmnt"><NavLink to ="/Profile"><img class="circle" src={`data:image/jpeg;base64,${c.commentUser}`}/></NavLink><span>{c.comment}</span></div>

                       ))}
                      <div className="Cmntbton" onClick={(e) =>handleClickCmnt(post.id,index)}><span className="sort" >{hasMoreComments && '...Comments'}  </span></div>
                    </div>
                    
                </div>
                
                )
            }
            
            })
        } 
        
            
        </div>
        <div>{loading && 'Loading...'}</div>
        <div>{error && 'Error'}</div> 
        <div>{!hasMore && 'No More posts'}</div>
        </>
        
    )


}








import { NavLink } from "react-router-dom"
import { useState,useRef, useCallback, useEffect} from "react";
import usePostGetter from './postgetter'
import {SPost} from './individual_post'



export const Post = () =>{
    const [pageNumber, setPageNumber] = useState(0)




    useEffect(()=>{
        console.log(pageNumber)
    },[pageNumber])
 


    const {
      posts,
      loading,
      error,
      hasMore 
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
                    
                    return(<div ref={lastPostElementRef}><SPost  post={post}/></div>)
                }
                else{
                    return(<SPost  post={post}/>)
                }
            }
        )}    
        </div>
        <div>{loading &&   <div class="loader">
            <span class="loader-text">loading</span>
            <span class="load"></span>
        </div>
        }</div>
        <div>{error && 'Error'}</div> 
        <div>{!hasMore && 'No More posts'}</div>
        </>
        
    )


}








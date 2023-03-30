
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useCommentGetter(pageCmntNumber,id) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [comments, setComments] = useState([])
  const [hasMore, setHasMore] = useState(true)
  
  const token = localStorage.getItem('token');



  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `https://kitchenb.onrender.com/comments?page=${pageCmntNumber}&upid=${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      console.log(res)
        if(res.status==403){
          setLoading(false)
        }
        setComments(prevComments => {
        return [...new Set([...prevComments, ...res.data])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      setLoading(false)
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageCmntNumber,id])
  


 
  return { comments, loading, error, hasMore };
}


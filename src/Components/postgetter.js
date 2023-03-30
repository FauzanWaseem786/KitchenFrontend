
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function usePostGetter(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState([])


  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `https://kitchenb.onrender.com/posts?page=${pageNumber}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setPosts(prevPosts => {
        return [...new Set([...prevPosts, ...res.data])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])



  return { posts, loading, error, hasMore };
}


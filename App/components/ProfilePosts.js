import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useParams, Link } from "react-router-dom"
import LoadingDotsIcon from "./LoadingDotsIcon"
import Post from "./Post"

function ProfilePosts(props) {
  const { username } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, { cancelToken: ourRequest.cancelToken })
        setPosts(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("Problem in Profile posts.")
      }
    }
    fetchPosts()
    return () => {
      ourRequest.cancel()
    }
  }, [username])
  if (isLoading) return <LoadingDotsIcon />

  return (
    <div className="list-group">
      {posts.map((post) => {
        return <Post noAuthor={true} post={post} key={post._id} />
      })}
    </div>
  )
}

export default ProfilePosts
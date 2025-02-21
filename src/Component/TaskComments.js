"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import api from "../utils/api"
import io from "socket.io-client"

const socket = io(process.env.REACT_APP_API_URL)

const TaskComments = ({ taskId }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const { user } = useAuth()

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}/comments`)
        setComments(response.data)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }
    fetchComments()

    // Listen for new comments
    socket.on(`comments:${taskId}`, (comment) => {
      setComments((prevComments) => [...prevComments, comment])
    })

    return () => {
      socket.off(`comments:${taskId}`)
    }
  }, [taskId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post(`/tasks/${taskId}/comments`, { text: newComment })
      setNewComment("")
      // The new comment will be added via the socket connection
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.text}</p>
            <small>
              {comment.user.username} - {new Date(comment.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  )
}

export default TaskComments


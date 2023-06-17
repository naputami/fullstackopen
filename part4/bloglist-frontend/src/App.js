import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [messageType, setMessageType] = useState('')




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchblogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchblogs()
  
  }, [user])

  const blogFormRef = useRef()

const handleLogin = async userObj => {
  try {
      const user = await loginService.login(userObj)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
  } catch (exception) {
      setNotifMessage('Wrong password or username')
      setMessageType('error')
      setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }
}

const addNewBlog = async blogObj => {

  try {
    const response = await blogService.createBlog(blogObj)
    setBlogs(blogs.concat(response))
    blogFormRef.current.toggleVisibility()
    setNotifMessage(`a new blog ${response.title} by ${response.author} added`)
    setMessageType('success')
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  } catch (error) {
    setNotifMessage(error)
    setMessageType('error')
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

}


const toggleLogOut = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
  setBlogs([])
}

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notifMessage} type={messageType} />
      
      {user == null ? 
      <LoginForm  handleLogin={handleLogin} /> : 
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => toggleLogOut()}>Logout</button>
        <Toggleable buttonLabel ="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addNewBlog} />
        </Toggleable>
        <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
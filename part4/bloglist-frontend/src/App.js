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
    const fetchblogs = async () => {
      const blogs = await blogService.getAll()

      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    }

    fetchblogs()

  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])



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
      const createdBlog = await blogService.createBlog(blogObj)
      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()
      setNotifMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
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

  const handleUpdateBlog = async blogObj => {
    try {
      const updatedBlog = await blogService.updateBlog(blogObj)
      const newBlogs = blogs.map(blog => blog.id === blogObj.id ? updatedBlog : blog)
      setBlogs(newBlogs.sort((a,b) => b.likes - a.likes))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteBlog = async blogObj => {
    try {
      const findBlogToDelete = blogs.find(blog => blog.id === blogObj.id)
      if(window.confirm(`Remove blog ${findBlogToDelete.title} by ${findBlogToDelete.author} `)){
        await blogService.deleteBlog(blogObj)
        setBlogs(blogs.filter(blog => blog.id !== blogObj.id))
        setNotifMessage(`Blog ${blogObj.title} by ${blogObj.author} sucessfully removed`)
        setMessageType('success')
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)

      }
    } catch (error) {
      setNotifMessage(error.message)
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

      {user === null ?
        <LoginForm  handleLogin={handleLogin} /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => toggleLogOut()}>Logout</button>
          <Toggleable buttonLabel ="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addNewBlog} />
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} deleteBlog={handleDeleteBlog} username={user.name} />
          )}
        </div>}
    </div>
  )
}

export default App
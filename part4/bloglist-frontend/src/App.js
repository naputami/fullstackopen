import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
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

const handleLogin = async event => {
  event.preventDefault()
  try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
  } catch (exception) {
      setNotifMessage('Wrong password or username')
      setMessageType('error')
      setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }
}

const addNewBlog = async (event) => {
  event.preventDefault()

  const obj = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  }

  try {
    const response = await blogService.createBlog(obj)

    setBlogs(blogs.concat(response))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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
const blogForm = () => (
  <>
    <div>
      <h2>Create a new blog</h2>
    </div>
    <form onSubmit={addNewBlog}>
      <div>title: <input
      value={newTitle}
      onChange={({target}) => setNewTitle(target.value)}
    /></div>
     <div>author: <input
      value={newAuthor}
      onChange={({target}) => setNewAuthor(target.value)}
    /></div>
     <div>url: <input
      value={newUrl}
      onChange={({target}) => setNewUrl(target.value)}
    /></div>
    
    <button type="submit">create</button>
  </form>  
  
  </>

)

const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

const toggleLogOut = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  setUser(null)
  setBlogs([])
}

console.log(blogs)

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={notifMessage} type={messageType} />
      
      {user == null ? loginForm() : <div>
        <p>{user.name} logged in</p>
        <button onClick={() => toggleLogOut()}>Logout</button>
        {blogForm()}
        <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
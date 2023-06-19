import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({blog, updateBlog, deleteBlog}) => {

  const [isShow, setIsShow] = useState(false)
  const [blogObj, setBlogObj] = useState(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const detailBlog = {
  //   margin: 0
  // }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    
    updateBlog(updatedBlog)
    setBlogObj(updatedBlog)
  }

  const removeBlog = () => {

    deleteBlog(blog)

  }


  return (
    <div style={blogStyle} className="blog-item">
      {blog.title} By {blog.author} <button onClick={() => setIsShow(!isShow)}>{isShow? 'Hide': 'View'}</button>
      {isShow && <div>
      <p>{blog.url}</p>
      <p>Likes {blogObj.likes}<button onClick={increaseLikes}>like</button></p>
      <p>{blog.user.name}</p>
      <button onClick={removeBlog}>Remove</button>
      </div>
      }
    </div>  
  )
}

Blog.propType = {
  updateBlog : PropTypes.func.isRequired,
  deleteBlog : PropTypes.func.isRequired,
  blog : PropTypes.object.isRequired
}

export default Blog
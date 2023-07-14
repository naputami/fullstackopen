import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {

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
      <span className='blog-title'>{blog.title}</span> By <span className='blog-author'>{blog.author}</span> <button className='show-hide-blog' onClick={() => setIsShow(!isShow)}>{isShow? 'Hide': 'View'}</button>
      {isShow && <div>
        <p className='blog-url'>{blog.url}</p>
        <p className='blog-likes'>Likes {blogObj.likes}<button className='like-button' onClick={increaseLikes}>like</button></p>
        <p className='blog-username'>{blog.user.name}</p>
        {username === blog.user.name ? <button onClick={removeBlog} className='delete-button'>Remove</button> : null}
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
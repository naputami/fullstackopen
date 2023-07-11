import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <div>
        <h2>Create a new blog</h2>
      </div>
      <form onSubmit={addBlog}>
        <div>title: <input
          value={newTitle}
          placeholder='input title'
          onChange={({ target }) => setNewTitle(target.value)}
        /></div>
        <div>author: <input
          value={newAuthor}
          placeholder='input author'
          onChange={({ target }) => setNewAuthor(target.value)}
        /></div>
        <div>url: <input
          value={newUrl}
          placeholder='input url'
          onChange={({ target }) => setNewUrl(target.value)}
        /></div>

        <button type="submit">create</button>
      </form>

    </>
  )
}

BlogForm.propTypes = {
  createBlog : PropTypes.func.isRequired
}

export default BlogForm
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler it received as props with the right details when a new blog is created', async () => {
  const newBlog = {
    title : 'Testing with jest',
    author : 'Jean Doe',
    url : 'www.testingjs.com'
  }
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)

  const inputTitle = screen.getByPlaceholderText('input title')
  const inputAuthor = screen.getByPlaceholderText('input author')
  const inputUrl = screen.getByPlaceholderText('input url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, newBlog.title)
  await user.type(inputAuthor, newBlog.author)
  await user.type(inputUrl, newBlog.url)

  await user.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url)

})
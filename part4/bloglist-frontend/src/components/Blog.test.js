import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  const blog = {
    title : 'Testing react apps',
    author : 'John Doe',
    likes : 0,
    url : 'www.jstutor.com',
    user: {
      name: 'test'
    }
  }

  const mockUpdateEvent = jest.fn()
  const mockDeleteEvent = jest.fn()


  let container
  let titleContainer
  let authorContainer
  let urlContainer
  let likesContainer

  beforeEach(() => {
    container = render(<Blog blog={blog} updateBlog={mockUpdateEvent} deleteBlog={mockDeleteEvent}  />).container
    titleContainer = container.querySelector('.blog-title')
    authorContainer = container.querySelector('.blog-author')
    urlContainer = container.querySelector('.blog-url')
    likesContainer = container.querySelector('.blog-likes')
  })


  test('showing title and author but not showing url and likes', async () => {
    expect(titleContainer).toHaveTextContent('Testing react apps')
    expect(authorContainer).toHaveTextContent('John Doe')
    expect(urlContainer).toBeNull()
    expect(likesContainer).toBeNull()
  })

  test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
    const user = userEvent.setup()
    const buttonShow = container.querySelector('.show-hide-blog')
    await user.click(buttonShow)

    expect(urlContainer).toBeDefined()
    expect(likesContainer).toBeDefined()

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const user = userEvent.setup()
    const buttonShow = container.querySelector('.show-hide-blog')
    await user.click(buttonShow)
    const buttonLike = container.querySelector('.like-button')
    await user.click(buttonLike)
    await user.click(buttonLike)
    expect(mockUpdateEvent.mock.calls).toHaveLength(2)
  })
})
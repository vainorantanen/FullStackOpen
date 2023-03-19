import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Blog renders the blogs title its url or number of likes by default.', () => {
  const blog = {
    title: 'Blogin otsikko',
    author: 'Blogin tekijä',
    url: 'google.com',
    likes: 10
  }
  const loggedUser = ''
  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  expect(component.container).toHaveTextContent(
    'Blogin otsikko'
  )
  expect(component.container).not.toHaveTextContent(
    'google.com'
  )
  expect(component.container).not.toHaveTextContent(
    10
  )
})

test('Blogs url and number of likes are shown when view button clicked.', async () => {
  const blog = {
    title: 'Blogin otsikko',
    author: 'Blogin tekijä',
    url: 'google.com',
    likes: 10,
    user: 'Rauno'
  }
  const loggedUser = 'Rane'
  const handleBlogDelete = () => null
  const handleLike = () => null

  const component = render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={handleLike}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('View')
  await user.click(button)

  expect(component.container).toHaveTextContent(
    'google.com'
  )
  expect(component.container).toHaveTextContent(
    10
  )
})

test('clicking the like button calls event handler twice when pressed twice', async () => {
  const blog = {
    title: 'Blogin otsikko',
    author: 'Blogin tekijä',
    url: 'google.com',
    likes: 10,
    user: 'Rauno'
  }
  const loggedUser = 'Rane'

  const mockHandler = jest.fn()
  const handleBlogDelete = () => null

  render(
    <Blog
      blog={blog}
      loggedUser={loggedUser}
      handleBlogDelete={handleBlogDelete}
      handleLike={mockHandler}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('View')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
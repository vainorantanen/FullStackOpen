import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla kun blogi luodaan', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const component = render(
    <BlogForm
      createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const sendButton = component.container.querySelector('#create')

  await user.type(title, 'blog title')
  await user.type(author, 'blog author')
  await user.type(url, 'blog url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog title')
  expect(createBlog.mock.calls[0][0].author).toBe('blog author')
  expect(createBlog.mock.calls[0][0].url).toBe('blog url')
})
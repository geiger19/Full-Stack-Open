import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#Title')
  const author = component.container.querySelector('#Author')
  const url = component.container.querySelector('#URL')
  const likes = component.container.querySelector('#Likes')

  fireEvent.change(title, { 
    target: { value: 'The Wonders of Magic' } 
  })
  fireEvent.change(author, { 
    target: { value: 'Merlin' } 
  })
  fireEvent.change(url, { 
    target: { value: 'https://blogs.com' } 
  })
  fireEvent.change(likes, { 
    target: { value: 7 } 
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('The Wonders of Magic')
  expect(createBlog.mock.calls[0][0].author).toBe('Merlin')
  expect(createBlog.mock.calls[0][0].url).toBe('https://blogs.com')
  expect(createBlog.mock.calls[0][0].likes).toBe('7')
})
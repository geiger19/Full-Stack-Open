import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Togglable/>', () => {
    let component
    const blog = {
        id: 17,
        title: 'The best blog on the planet',
        author: 'Arthur Pendragon',
        url: 'knightsoftheround.com/bestblog',
        likes: 3, 
        user: {
            name: 'toot1',
            username :'toot1'
        }
    }
    const mockHandler = jest.fn()
    beforeEach(() => {
    component = render(
        <Blog blog={blog} updateBlog={mockHandler} user='toot1' />
    )
    })
    test('renders its children', () => {
    expect(
        component.container.querySelector('.testDiv')
    ).toBeDefined()
    })

    test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('URL')
    expect(div).toHaveTextContent('Likes')
    })

    test('after clicking the likes button a like is added twice', () => {
        const button = component.getByText('Like')
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
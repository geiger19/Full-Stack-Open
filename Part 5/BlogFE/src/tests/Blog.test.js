import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'


describe('<Blog/>', () => {
    let component
  
    const blog = {
        title: 'The best blog on the planet',
        author: 'Arthur Pendragon',
        url: 'knightsoftheround.com/bestblog',
        likes: 3, 
        user: {
            name: 'toot1',
            username :'toot1'
        }
    }
    beforeEach(() => {
      component = render(
        <Blog blog={blog} user='toot1' />
      )
    })
    

test('renders content', () => { 
    component.debug()
    expect(component.container).toHaveTextContent(
      'The best blog on the planet'
    )
    expect(component.container).toHaveTextContent(
        'Arthur Pendragon'
      )
      
  })
  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })
})
  
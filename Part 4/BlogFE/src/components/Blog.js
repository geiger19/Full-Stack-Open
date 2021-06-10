import React from 'react'

const Blog = ({ blog }) => {

  return (
    <li className='blog'>
      {blog.title}<br/>
      {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes} 
    </li>
  )
}

export default Blog

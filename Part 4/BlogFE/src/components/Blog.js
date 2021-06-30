import React from 'react'

const Blog = ({ blog, deleteBlog }) => {

  return (
    <li className='blog'>
      {blog.title}<br/>
      {blog.author}<br/>
      {blog.url}<br/>
      {blog.likes} <br/>
      <button onClick={deleteBlog}>Delete</button><br/><br/>
    </li>
  )
}

export default Blog

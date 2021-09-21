import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, updateBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width:500
  }
  return (
    <li className='blog ' style={blogStyle}>
      Title: {blog.title}<br/>
      Author: {blog.author}<br/>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='togglableContent' style={showWhenVisible}>
      URL: {blog.url}<br/>
      Likes: <span class="blogLikes">{blog.likes}</span> <button onClick={updateBlog}>Like</button><br/>
      {blog.user.name}<br/><br/>
        <DeleteButton user={user} blog={blog} deleteBlog={deleteBlog} />
        <button onClick={toggleVisibility}>hide</button>
      </div>
      
      
    </li>
  )
}

const DeleteButton = ({ user, blog, deleteBlog }) => {
  if (user.name === blog.user.name)
  {
  return (
    <div><button onClick={deleteBlog}>Delete</button><br/><br/></div>
  )
  }
  else
  {
    return null
  }
}

export default Blog

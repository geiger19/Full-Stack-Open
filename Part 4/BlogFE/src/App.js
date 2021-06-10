import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'

const Footer = () => {
  const footerStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app</em>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newLikes, setNewLikes] = useState('')

  
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newURL,
      likes: newLikes  
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setNewAuthor('')
        setNewURL('')
        setNewLikes('')
      })
  }

  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
  }
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    console.log(event.target.value)
    setNewURL(event.target.value)
  }
  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setNewLikes(event.target.value)
  }

  const blogsToShow = blogs

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogsToShow.map(blog => 
            <Blog
              key={blog.id}
              blog={blog}/>
        )}
      </ul>
      <form onSubmit={addBlog}>
        Title:<br/><input
          value={newBlog}
          onChange={handleBlogChange}
        /><br/>
        Author:<br/><input
          value={newAuthor}
          onChange={handleAuthorChange}
        /><br/>
        URL:<br/><input
          value={newURL}
          onChange={handleURLChange}
        /><br/>
        Likes:<br/><input
          value={newLikes}
          onChange={handleLikesChange}
        /><br/><br/>
        <button type="submit">save</button>
      </form>
      <Footer />  
    </div>
  )
}

export default App
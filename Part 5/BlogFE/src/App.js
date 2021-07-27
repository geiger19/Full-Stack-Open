import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blog'
import loginService from './services/login' 
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    if (!(blogs.filter(e => e.title === blogFormRef.current.newBlog).length > 0))
    {
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        
        setErrorMessage(`Added '${blogObject.title}'`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
    else 
    {
      const blog = blogs.find(blog => blog.title === blogFormRef.current.newBlog)
      blogService
      .update(blog.id,blogObject)
        .then(returnedBlog => {
          setErrorMessage(
            `Updated '${blog.title}'` 
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.map(e => e.id !== blog.id ? e : returnedBlog))
      })
    }
  }

  const deleteBlogOf = id => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blog.title}?`)) 
    {
      blogService
      .removeBlog(id)
      .then(response => {
        setErrorMessage(
          `Deleted '${blog.title}'` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Information has already been removed from server`
        )
        console.log(error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setBlogs(blogs.filter(e => e.id !== id))
    }
  }
  const updateBlogOf = id => {
    const blog = blogs.find(blog => blog.id === id)
      blogService
      .update(id,blog)
      .then(response => {
        setErrorMessage(
          `Updated '${blog.title}'` 
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Update failed`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setBlogs(blogs.filter(e => e.id !== blog.id))
    
  }

  const blogsToShow = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  })
  
  const blogDisplay = () => (
    
    <ul>
        {blogsToShow.map(blog => 
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={() => deleteBlogOf(blog.id)}
              updateBlog={() => updateBlogOf(blog.id)}
              user={user}
              />
              )}
    </ul>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logout')
    try{
      window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Logout failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
    const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )


  return (
    <div>
      <h1>Blog</h1>
      <Notification message={errorMessage} />
      {user === null ?
      loginForm() :
      <div>
        <form onSubmit={handleLogout}>
          <p>{user.name} logged-in</p>
          <button type="submit">Log out</button>
        </form>
        {blogDisplay()}
        {blogForm()}
      </div>
      }
      <Footer />  
    </div>
  )
}

export default App
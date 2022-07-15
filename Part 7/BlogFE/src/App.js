import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import {setNotification} from './reducers/notificationReducer'
import blogService from './services/blog'
import loginService from './services/login' 
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    //dispatch(initializeBlogs())
  }, )
  const blogs = useSelector((state) => state.blog)
  //const [blogs, setblogs] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  
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
        dispatch(createBlog(blogs.concat(returnedBlog)))
        dispatch(setNotification(`you added '${blogObject.title}'`, 10))
      })
    }
    else 
    {
      const blog = blogs.find(blog => blog.title === blogFormRef.current.newBlog)
      blogService
      .update(blog.id,blogObject)
        .then(returnedBlog => {
          dispatch(setNotification(`Updated '${blog.title}'`, 10))
          dispatch(updateBlog(blogs.map(e => e.id !== blog.id ? e : returnedBlog)))
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
        dispatch(setNotification(`Deleted '${blog.title}'` , 10))
      })
      .catch(error => {
        dispatch(setNotification(`Information has already been removed from server` , 10))
      })
      dispatch(removeBlog(id))
    }
  }
  const updateBlogOf = id => {
    const blog = blogs.find(blog => blog.id === id)
      blogService
      .update(id,blog)
      .then(response => {
        dispatch(setNotification(`Updated '${blog.title}'` , 10))
      })
      .catch(error => {
        dispatch(setNotification( `Update failed` , 10))
      })
      dispatch(updateBlog(id))    
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
      dispatch(setNotification( `Wrong credentials` , 10))
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
      dispatch(setNotification( `Logout failed` , 10))
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
      <Notification message={useSelector((state) => state.notification)} />
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
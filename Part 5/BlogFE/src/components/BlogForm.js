import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')
  const [newLikes, setNewLikes] = useState('')

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
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: newBlog,
        author: newAuthor,
        url: newURL,
        likes: newLikes  
    })
    setNewBlog('')
    setNewAuthor('')
    setNewURL('')
    setNewLikes('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

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
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

import { useState } from 'react'
import {useMatch, Routes, Route, Link, useNavigate} from "react-router-dom"
import Notification from './components/Notification'
import  { useField } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/createnew">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
    <Footer />
  </div>
)

const Anecdotes = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>Has {anecdote.votes} votes<br/><br/></div>
      <div>For more info see <a href={anecdote.info}>{anecdote.info}</a><br/><br/></div>
      <Footer />
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    <Footer />
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }
  const handleSubmit = (e) => {
    
    e.preventDefault()
    props.addNew({
      'content': content.input.value,
      'author': author.input.value,
      'url': info.input.value,
      votes: 0
    })
    props.setNotification("You have created " + content.input.value)
    setTimeout( async () => 
      await props.setNotification("")
    , 5 * 1000);
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
          {...content.input} 
           />
        </div>
        <div>
          author
          <input {...author.input} 
           />
        </div>
        <div>
          url for more info
          <input 
          {...info.input} 
           />
        </div>
        <button>create</button>
        <button type='reset' onClick={reset}>Reset</button>
      </form>
      <Footer />
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')  
  const anecdote = match ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))    : null
  return (
  <div>  
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
    </div>
    <Routes>
    <Route path="/createnew" element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
    <Route path="/about" element={<About />} />
    <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
    <Route path="/anecdotes/:id" element={<Anecdotes anecdote={anecdote} />} />
  </Routes>
  </div>
  )
}

export default App

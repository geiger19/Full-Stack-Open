import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createStore  } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import passwordReducer from './reducers/passwordReducer'
import usernameReducer from './reducers/usernameReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
  password: passwordReducer,
  username: usernameReducer,
  notification: notificationReducer
  })
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
  
  export default store

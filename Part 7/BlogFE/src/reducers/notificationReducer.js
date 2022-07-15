const notificationReducer = (state = '', action) => {
    console.log(action)
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.data.message
      case 'REMOVE_NOTIFICATION' :
        return null
      default:
        return state
    }
}

export const createNotification = (message) => ({
    type: 'SET_NOTIFICATION',
    data: { message }
})

export const removeNotification = () => ({  
    type: 'REMOVE_NOTIFICATION'
})

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    await dispatch(createNotification(message))
    setTimeout( async () => 
      await dispatch(removeNotification())
    , timer * 1000);
  }
}

export default notificationReducer
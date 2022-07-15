const usernameReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_USERNAME':
        return  action.filters;
      default:
        return state
    }
  }
  export const usernameChange = filters => {
    return {
      type: 'SET_USERNAME',
      filters,
    }
  }
  export default usernameReducer
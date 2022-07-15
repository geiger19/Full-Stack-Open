const passwordReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_PASSWORD':
        return  action.filters;
      default:
        return state
    }
  }
  export const passwordChange = filters => {
    return {
      type: 'SET_PASSWORD',
      filters,
    }
  }
  export default passwordReducer
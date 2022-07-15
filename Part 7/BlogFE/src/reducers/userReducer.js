const userReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_USER':
        return  action.filters;
      default:
        return state
    }
  }
  export const userChange = filters => {
    return {
      type: 'SET_USER',
      filters,
    }
  }
  export default userReducer
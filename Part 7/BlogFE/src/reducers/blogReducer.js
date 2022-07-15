import blogservices from "../services/blog"

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
          return action.data
        case 'NEW_BLOG':
            return  [...state, action.filters];
        case 'UPDATE_BLOG':
            return  [...state,action.filters];
        case 'REMOVE_BLOG':
          return state.filter((blog) => blog.id !== action.id);        
        default:
          return state
      }
  }
  export const createBlog =  content => {
    return async dispatch => {
      const newUnit = await blogservices.create(content)
      dispatch({
      type: 'NEW_BLOG',
      data: newUnit,
    })
  }
}
  export const updateBlog =  content => {
    return async dispatch => {
      const newUnit = await blogservices.update(content)
      dispatch({
      type: 'UPDATE_BLOG',
      data: newUnit,
    })
  }
  }
  export const removeBlog =  content => {
    return async dispatch => {
      const newUnit = await blogservices.removeBlog(content)
      dispatch({
      type: 'REMOVE_BLOG',
      data: newUnit,
    })
  }
  }
  export const initializeBlogs = () => {
    return async dispatch => {
      const data = await blogservices.getAll()
      console.log("hello")
      console.log(data)
      dispatch({
        'type': 'INIT_BLOGS',
        data,
      })
    }
  }
  export default blogReducer
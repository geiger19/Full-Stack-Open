const _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const likesTotal = blogs.reduce(
    (prevValue, currentValue) => prevValue + currentValue.likes,0)
  return likesTotal
}

const favouriteBlog = (blogs) => {
  const favouriteBlogData =  blogs.reduce((prevValue, currentValue) => (prevValue.likes > currentValue.likes) ? prevValue : currentValue, 0)
  delete favouriteBlogData._id
  delete favouriteBlogData.url
  delete favouriteBlogData.__v
  return favouriteBlogData
}

const mostBlogs = (blogs) => {
  let maxBlogs = _.countBy(blogs, 'author')
  const keysSorted = Object.entries(maxBlogs).sort(function(a,b){return maxBlogs[a]-maxBlogs[b]}).reverse()
  let result = { author: Object.values(keysSorted)[0][0], blogs: Object.values(keysSorted)[0][1] }
  return (result)
}

const mostLikes = (blogs) => {
  let maxLikes = _.orderBy(blogs, 'likes').reverse()
  let mostLikes = { author: maxLikes[0].author, likes: maxLikes[0].likes }
  return mostLikes
}
module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}
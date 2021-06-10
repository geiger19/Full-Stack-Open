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

module.exports = {
  dummy, totalLikes, favouriteBlog
}
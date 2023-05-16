const _ = require('lodash')

const dummy = (blogs) => blogs.length === 0 ? 1 : blogs.length

const totalLikes = (blogs) =>  blogs.reduce((total, blog) => total + blog.likes, 0 )


const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((max, blog) => Math.max(max, blog.likes), -Infinity)

    let result
    
    blogs.forEach(blog => {
        if(blog.likes === maxLikes){
            result = blog
        }
    })
    
    const {title, author, likes} = result
    return {title, author, likes}
}

const mostBlogs = (arrBlog) => {
    const countBlogs = _.countBy(arrBlog, 'author')
    const blogWithMostCount = _.maxBy(Object.entries(countBlogs), entry => entry[1])
    const [author, blogs ] = blogWithMostCount
    return {author, blogs}
}

const mostLikes = (arrBlog) => {
    const groupedByAuthor = _.groupBy(arrBlog, 'author');
    const authorsWithLikes = _.map(groupedByAuthor, (blogs, author) => ({
        author,
        likes: _.sumBy(blogs, 'likes'),
    }));

    return _.maxBy(authorsWithLikes, 'likes')
}
  
module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}
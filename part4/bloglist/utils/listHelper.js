var _ = require('lodash');
const dummy = (blogs) => {
    return 1
}

const likeCountHelper = (blogs) => {
    return blogs.reduce((total,currBlog) => total + currBlog.likes,0)
}

const mostBlogs = (blogs,parameter) => {
    let map = new Map()
    for(let i = 0;i < blogs.length;i ++){
        const blog = blogs[i]
        if(map.get(blog.author) === undefined) map.set(blog.author,1)
        else{
            let currNumberBlogs = map.get(blog.author)
            currNumberBlogs++
            map.set(blog.author,currNumberBlogs)
        }
    }
    let arr = []
    let iterator = map.entries()
    let tempVariabel = iterator.next().value  
    while(tempVariabel != undefined){
            arr.push(tempVariabel)
            tempVariabel = iterator.next().value
    }

    const sortedArr = arr.sort(function(a,b){
        if(a[1] > b[1]) return -1
        else if(a[1] < b[1]) return 1
        return 0
    })
    return {author: sortedArr[0][0],blogs: sortedArr[0][1]}
}

const mostLikes = (blogs) => {
    const groupedByAuthor = _.groupBy(blogs, 'author')
    let blogArrays = Object.values(groupedByAuthor)
    const groupedByAuthorWithTotalLikes = blogArrays.map((blogsBySingleAuthor) => {
        const totalLikes = _.reduce(blogsBySingleAuthor,function(sum,n){
            return sum + n.likes
        },0)
        return {likes:totalLikes,author:blogsBySingleAuthor[0].author}
    })
    let sortedArray = _.orderBy(groupedByAuthorWithTotalLikes,['likes'],['desc'])
    return {author: sortedArray[0].author, likes: sortedArray[0].likes}
}

module.exports = {dummy, likeCountHelper, mostBlogs, mostLikes}


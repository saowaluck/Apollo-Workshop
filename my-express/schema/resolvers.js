const Post = require('../models/Post')
const User = require('../models/User')
module.exports = {
    Post:{
        user:(post) => User.get(post.userId)
    },
    User:{
        posts: (user) => Post.listByUserId(user.id)
    },
    Query:{
        hello: () => 'Hello Apollo',
        posts: () => Post.list()
    }
}
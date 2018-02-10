

const db = require('../db')

const Post = {
    get: async (id) => {
        const posts = await db('posts').where({id})
        
        return posts[0]
    },
    list: async () => {
        const posts = await db('posts').select()
        return posts
    },

    listByUserId: async(userId)=>{
        if(!userId){ return []}
        const posts = await db('posts').where({userId})
        return posts
    },

    create: async(userId, title, content) => {
        const ids = await db('posts')
        .insert({
            userId, title, content
        })
        const post = await Post.get(ids[0])
        return post
    }
}
module.exports = Post
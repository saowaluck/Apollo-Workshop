const express = require('express')
const router =  express.Router()
const Post = require('../models/Post')
const User = require('../models/User')


router.get('/posts', async(req, res) => {
    const posts = await Post.list()
    for( const post of posts){
        post.user = await User.get(post.userId)
    }
    res.json(posts)
})

router.get('/posts/:id', async(req, res) => {
    const posts = await Post.get(req.params.id)
    console.log(posts)
    if (!posts) {
        return res.sendStatus(404)
    }
    posts.user = await User.get(post.userId)

    res.json(posts)
})

const requireAuth = (req, res, next) =>{
    if(!req.user){
        return res.sendStatus(401)
    }
    next()
}


router.post('/posts', requireAuth, async (req, res) => {
    try {
        const post = await Post.create(
            req.user.id,
            req.body.title,
            req.body.content
        )
        res.json(post)
    } catch (e) {
        res.sendStatus(500)
    }
    
})

module.exports = router

const db = require('../db')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const SECRET = 'QWERTY'
const User = {
    get: async (id) => {
        const users = await db('users').where({id})
        // console.log(user)
        const user = users[0]
        return _.omit(user, 'password')
    },

    auth: async (username, password) => {
        const hashed = crypto.createHmac('sha256', SECRET).update(password).digest('hex')
        const users = await db('users').where({username, password: hashed})
        
        const user = users[0]
        
        if(!user){
            return null
        }
        
        return jwt.sign({
            userId: user.id
        }, SECRET )
    },

    getByToken: async (token) => {
        try {
            const payload = jwt.verify(
                token,
                SECRET
            )
            
            const user = await User.get(payload.userId)
            return user
        }catch (err){
            if(err.name === 'JsonWebTokenError'){
                return null
            }
            throw err
        }
    }
}
module.exports = User
// const f = as
// console.log(User.auth('test1', 'password'))
//user.get(9).then((user) => console.log(user))
// User.auth('user1', 'password').then(console.log)
// User.getByToken(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjksImlhdCI6MTUxODI0Njc2Mn0.yg_kFkdfMEDQYcWAToi2J4j7EnYZ_SZfa-ik2cx2OQo'
// ).then(console.log)

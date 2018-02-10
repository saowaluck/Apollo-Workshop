
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = require('graphql')

const Post = require('../models/Post')
const User = require('../models/User')

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        id: {type: GraphQLID},
        username: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve: async (user) => Post.listByUserId(user.id)
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Posts',
    fields:{
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        content:{type: GraphQLString},
        user:{
            type: UserType,
            resolve: (post) => User.getByToken(post.userId)
        }
    }
})
const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: async() => {
                return 'Hello'
            }
        },
        posts:{
            type: new GraphQLList(PostType),
            resolve: async() => Post.list()
        }
    }
})

const schema = new GraphQLSchema({
    query: query
})

module.exports = schema
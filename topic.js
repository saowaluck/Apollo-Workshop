const fs = require('fs')
const path = require('path')

const topic = (topicID) => {
    const buffer = path.join(_dirname, 'topic-mock', `${topicID}.txt`)
    const txt = buffer.toString()
    return txt
}
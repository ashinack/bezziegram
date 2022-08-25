const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        
    },
    likes:[],
    image:String
},
    {
        timestamps: true
    }
)
const PostModel = mongoose.model('post', PostSchema)
module.exports = PostModel;
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
    comments:[{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required:true
        },
        comments:{
            type:String,
            required:true
        }
    }
    ],
    image:String
},
    {
        timestamps: true
    }
)
const PostModel = mongoose.model('post', PostSchema)
module.exports = PostModel;
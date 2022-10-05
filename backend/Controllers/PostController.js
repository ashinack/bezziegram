const PostModel=require('../Models/postModel')
const mongoose=require('mongoose')
const UserModel=require('../Models/userModel')

//create post
const createPost=async(req,res)=>{
    const newPost=new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
        
    }

}

//get a post
const getPost=async(req,res)=>{
    const id=req.params.id
    try {
        const post=await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//update post
const updatePost=async(req,res)=>{
    const postId=req.params.id
    const {userId}=req.body
    try {
        const post=await PostModel.findById(postId)
        if(post.userId===userId){
            await post.updateOne({$set:req.body})
            res.status(200).json('post updated')
        }
        else{
            res.status(403).json('action forbidden')
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//delete post

const deletePost=async(req,res)=>{
    const id=req.params.id
    const {userId}=req.body
    try {
        const post=await PostModel.findById(id)
        if(post.userId===userId){
           await post.deleteOne();
           res.status(200).json('post deleted')
        }else{
            res.status(403).json('action forbidden')  
        }
    } catch (error) {
        res.status(500).json(error)

    }
}

//like/dislike a post

const likePost=async(req,res)=>{
    const id=req.params.id
    const {userId}=req.body
  
    try {
        const post=await PostModel.findById(id)
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}})
            res.status(200).json('post liked')
        }else{
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json('post Unliked')
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

//get timeline post

const getTimelinePost=async(req,res)=>{
    const userId=req.params.id
   
    try {
        const currentUserPosts=await PostModel.find({userId:userId})
       
        const followingUserPosts=await UserModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:'posts',
                    localField:'following',
                    foreignField:'userId',
                    as:'followingPosts'
                }
            },
            {
                $project:{
                    name:1,
                    followingPosts:1,
                    _id:0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(...followingUserPosts[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt-a.createdAt;
        })
        );
    } catch (error) {
        res.status(500).json(error)
    }
}

//get user post

const getUserPost = async (req, res) => {
    const userId = req.params.id
    
    try {
        const userpost = await PostModel.find({userId:userId})
        res.status(200).json(userpost)

    } catch (error) {
        res.status(500).json(error)
    }
}

//add comments

// const addComment = async (req, res) => {
//     const id = req.params.id
//     const {userId,comments}=req.body
//     try {
//         const post = await PostModel.findById(id)
//         console.log(post);
//         if (post) {
//             const data = await post.updateOne({ $push: {userId,comments} })
//             console.log(data);
//         //    const data=await post.comments.push({userId:userId,comment:comments})
//             res.status(200).json(data)
//         }
//         else {
//             res.status(403).json('action forbidden')
//         }

//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

const addComment=async(req,res)=>{
    const id=req.params.id
    const {userId,comments}=req.body
    try {
       const data= await PostModel.updateOne({_id:id},{$push:{"comments":{
        userId:userId,
        comments:comments
       }}})  
        const comdata = await PostModel.findById(id).populate({ path: 'comments.userId' })
       console.log(comdata.comments);
    //    console.log(data);
        res.status(200).json(comdata.comments)

    } catch (error) {
        res.status(500).json(error)
    }
}

//get comments

const getComments=async(req,res)=>{
    const id=req.params.id
    try {
        const data = await PostModel.findById(id).populate({path: 'comments.userId'})
        console.log(data.comments);
        res.status(200).json(data.comments)
    } catch (error) {
        
    }

}

//get userdt
const getUserdt=async(req,res)=>{
    const id=req.params.id
    // const {userId}=req.body
    try {
        const data = await PostModel.findById(id).populate('userId')
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error)
    }
   



}


module.exports = { createPost, getPost, updatePost, deletePost, likePost, getTimelinePost, getUserPost, addComment, getComments, getUserdt }
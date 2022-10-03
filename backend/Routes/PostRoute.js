const express=require('express')
const { createPost, getPost, updatePost, deletePost, likePost, getTimelinePost, getUserPost, addComment, getComments }=require('../Controllers/PostController')

const router=express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.post('/:id/comment', addComment)
router.get('/:id/getcomment',getComments)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timelinepost', getTimelinePost)
router.get('/:id/userpost', getUserPost)
module.exports=router
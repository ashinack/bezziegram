const express=require('express')
const { createPost, getPost, updatePost, deletePost, likePost, getTimelinePost, getUserPost, addComment, getComments, getUserdt }=require('../Controllers/PostController')

const router=express.Router()

router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.post('/:id/comment', addComment)
router.get('/:id/getcomment',getComments)
router.post('/:id/delete',deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timelinepost', getTimelinePost)
router.get('/:id/userpost', getUserPost)
router.get('/:id/userdt', getUserdt)
module.exports=router
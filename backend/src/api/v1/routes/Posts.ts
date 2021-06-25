import express from "express";
import { UserInterface } from "../../../interfaces/User.interface";
import BearerAuthenticate from "../../../utils/Authenticate";

import Post from "../../../models/Post"
import { PostInterface } from "../../../interfaces/Post.interface";
import { NOT_FOUND, SUCCESSFUL, UNAUTHORIZED } from "../../../utils/STRINGS";
import Paginate from "../../../utils/Paginate";

const router = express.Router();

router.post("/add", BearerAuthenticate, (req, res) => {
  const user = req.user as UserInterface

  const newPost = new Post({
    text: req.body?.text,
    schoolId: req.body?.schoolId,
    branchId: req.body?.branchId,
    isAnon: req.body?.isAnon,
    createdBy: user.id
  })

  newPost.save()
  .then((post:PostInterface) => res.json({
    message: SUCCESSFUL,
    post
  }))
  .catch(err => res.send(err.message))
})

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
  .then((post:PostInterface) => {
    if (!post || post == null ) res.send(NOT_FOUND("Post"))

    if (post.isAnon) delete post['createdBy'];

    res.json({
      message: SUCCESSFUL,
      post
    })  
  })
  .catch((err) => res.send(err.message))
})

router.delete("/:id", BearerAuthenticate, (req, res)=> {
  const user = req.user as UserInterface
  
  Post.findById(req.params?.id)
  .then((post:PostInterface) => {
    if ( user.id !== post.createdBy ) res.send(UNAUTHORIZED)
    else post
      .remove()
      .then(()=>res.send(SUCCESSFUL))
      .catch((err) => res.send(err.message))
  })
  .catch((err) => res.send(err.message))
})

router.get("/user/:id", (req, res) => {
  const posts = Post.find({createdBy:req.params?.id})

  Paginate(req, posts)

  posts.then((Posts:Array<PostInterface>) => {
    res.json({
      message: SUCCESSFUL,
      count: Posts.length,
      list: req.body?.withList && Posts
    })
  })
  .catch((err)=>res.send(err.message))
})

router.get("/school/:id", (req, res) => {
  const posts = Post.find({schoolId:req.params?.id})

  Paginate(req, posts)

  posts.then((Posts:Array<PostInterface>) => {
    res.json({
      message: SUCCESSFUL,
      count: Posts.length,
      list: req.body?.withList && Posts
    })
  })
  .catch((err)=>res.send(err.message))
})

router.get("/branch/:id", (req, res) => {
  const posts = Post.find({branchId:req.params?.id})

  Paginate(req, posts)

  posts.then((Posts:Array<PostInterface>) => {
    res.json({
      message: SUCCESSFUL,
      count: Posts.length,
      list: req.body?.withList && Posts
    })
  })
  .catch((err)=>res.send(err.message))
})

export default router
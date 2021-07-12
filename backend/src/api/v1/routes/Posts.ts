import express from "express";
import { UserInterface } from "../../../interfaces/User.interface";
import BearerAuthenticate from "../../../utils/Authenticate";

import Post from "../../../models/Post"
import { PostInterface } from "../../../interfaces/Post.interface";
import { NOT_FOUND, SUCCESSFUL, UNAUTHORIZED } from "../../../utils/STRINGS";

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
  .catch((err:any) => res.status(400).send(err.message))
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
    if ( user.id !== post.createdBy.toString() ) res.send(UNAUTHORIZED)
    else post
      .remove()
      .then(()=>res.send(SUCCESSFUL))
      .catch((err) => res.send(err.message))
  })
  .catch((err) => res.send(err.message))
})

router.get("/user/:id", (req, res) => {
  const page = parseInt(req.query?.pageNumber as string) || 1
  const limit = parseInt(req.query?.paginate as string) || 10
  const posts = Post.paginate({
    query: {createdBy:req.params?.id},
    page,
    limit,
    sort: {createdAt: -1}
  })

  posts.then(({ docs, hasMore }) => {
    res.json({
      message: SUCCESSFUL,
      count: limit,
      hasMore,
      list: req.query?.withList && docs,
    })
  })
  .catch((err)=>res.status(400).send(err.message))
})

router.get("/curated/:userId", BearerAuthenticate, (req, res) => {
  const page = parseInt(req.query?.pageNumber as string) || 1
  const limit = parseInt(req.query?.paginate as string) || 10
  const withList:boolean = ((req.query?.withList === 'true') ? true:false)
  const posts = Post.paginate({
    // @ts-ignore:
    query: {createdBy:req.user._id},
    page,
    limit,
    sort: {createdAt: -1}
  })

  posts.then(({ docs, hasMore }) => {
    res.json({
      message: SUCCESSFUL,
      count: limit,
      hasMore,
      list: withList && docs,
    })
  })
  .catch((err)=>res.status(400).send(err.message))
})

export default router
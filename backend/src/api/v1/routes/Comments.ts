import express from "express";
import { UserInterface } from "../../../interfaces/User.interface";
import BearerAuthenticate from "../../../utils/Authenticate";

import Comment from "../../../models/Comment"
import { CommentInterface } from "../../../interfaces/Comment.interface";
import { NOT_FOUND, SUCCESSFUL, UNAUTHORIZED } from "../../../utils/STRINGS";
import Paginate from "../../../utils/Paginate";

const router = express.Router();

router.post("/add", BearerAuthenticate, (req, res) => {
  const user = req.user as UserInterface

  const newComment = new Comment({
    text: req.body?.text,
    postId: req.body?.postId,
    isAnon: req.body?.isAnon,
    createdBy: user.id
  })

  newComment.save()
  .then((comment:CommentInterface) => res.json({
    message: SUCCESSFUL,
    comment
  }))
  .catch(err => res.send(err.message))
})


router.get("/post/:id", (req, res) => {
  const comments = Comment.find({postId:req.params?.id})

  Paginate(req, comments)

  comments.then((Comments:Array<CommentInterface>) => {
    res.json({
      message: SUCCESSFUL,
      count: Comments.length,
      list: req.body?.withList && Comments
    })
  })
  .catch((err)=>res.send(err.message))
})

router.get("/:id", (req, res) => {
  Comment.findById(req.params.id)
  .then((comment:CommentInterface) => {
    if (!comment || comment == null ) res.send(NOT_FOUND("Comment"))

    if (comment.isAnon) delete comment['createdBy'];

    res.json({
      message: SUCCESSFUL,
      comment
    })  
  })
  .catch((err) => res.send(err.message))
})

router.delete("/:id", BearerAuthenticate, (req, res)=> {
  const user = req.user as UserInterface
  
  Comment.findById(req.params?.id)
  .then((comment:CommentInterface) => {
    if ( user.id !== comment.createdBy ) res.send(UNAUTHORIZED)
    else comment
      .remove()
      .then(()=>res.send(SUCCESSFUL))
      .catch((err) => res.send(err.message))
  })
  .catch((err) => res.send(err.message))
})


export default router
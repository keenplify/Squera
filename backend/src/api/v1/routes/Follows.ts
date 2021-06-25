import express from "express";
import { NativeError } from "mongoose";
import Paginate from "../../../utils/Paginate";
import { FollowInterface } from "../../../interfaces/Follow.interface";
import { UserInterface } from "../../../interfaces/User.interface";
import Follow from "../../../models/Follow";
import BearerAuthenticate from "../../../utils/Authenticate";
import { SUCCESSFUL, UNAUTHORIZED } from "../../../utils/STRINGS";


const router = express.Router();

router.post("/add", BearerAuthenticate, (req, res)=> {
  const user = req.user as UserInterface

  const newFollow = new Follow({
    followerId: user.id,
    followingId: req.body?.followingId
  })

  newFollow.save()
  .then(()=>res.send(SUCCESSFUL))
  .catch((err:NativeError)=>res.send(err.message))
})

router.delete("/:id", BearerAuthenticate, (req, res)=> {
  const user = req.user as UserInterface
  
  Follow.findById(req.params?.id)
  .then((follow:FollowInterface) => {
    if ( user.id !== follow.followerId ) res.send(UNAUTHORIZED)
    else follow
      .remove()
      .then(()=>res.send(SUCCESSFUL))
      .catch((err) => res.send(err.message))
  })
  .catch((err) => res.send(err.message))
})

router.get("/following/:id", (req,res) => {
  const follow = Follow.find({followerId:req.params?.id})

  Paginate(req, follow)

  follow.then((Follows:Array<FollowInterface>)=> {
    res.json({
      message: SUCCESSFUL,
      count: Follows.length,
      list: req.body?.withList && Follows
    })
  })
  .catch((err:NativeError)=>res.send(err.message))
})

router.get("/followers/:id", (req,res) => {
  const follow = Follow.find({followingId:req.params?.id})

  Paginate(req, follow)

  follow.then((Follows:Array<FollowInterface>)=> {
    res.json({
      message: SUCCESSFUL,
      count: Follows.length,
      list: req.body?.withList && Follows
    })
  })
  .catch((err:NativeError)=>res.send(err.message))
})

export default router;
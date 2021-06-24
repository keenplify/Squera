import express from "express";
import { NativeError } from "mongoose";

import Follow from "../../../models/Follow";
import BearerAuthenticate from "../../../utils/Authenticate";
import { UserInterface } from "../../../interfaces/User.interface";
import { SUCCESSFUL } from "../../../utils/STRINGS";
import { FollowInterface } from "../../../interfaces/Follow.interface";

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

router.get("/following/:id", (req,res) => {
  Follow.find({followerId:req.params?.id})
  .then((Follows:Array<FollowInterface>)=> {
    res.json({
      message: SUCCESSFUL,
      count: Follows.length
    })
  })
  .catch((err:NativeError)=>res.send(err.message))
})

router.get("/followers/:id", (req,res) => {
  Follow.find({followingId:req.params?.id})
  .then((Follows:Array<FollowInterface>)=> {
    res.json({
      message: SUCCESSFUL,
      count: Follows.length
    })
  })
  .catch((err:NativeError)=>res.send(err.message))
})

export default router;
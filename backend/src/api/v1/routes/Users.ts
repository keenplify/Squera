import express from "express";
import { VARS_ARE_REQUIRED, USER_NOT_FOUND, UNSUCCESSFUL, NOT_FOUND } from "../../../utils/STRINGS";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { UserInterface } from "../../../interfaces/User.interface";
import BearerAuthenticate from "../../../utils/Authenticate";
import { NativeError } from "mongoose";
import { UserResponse } from "../../../utils/UserResponse";

const router = express.Router();

router.post("/add", (req, res) => {
  if (!req.body?.username || !req.body?.password) res.send(VARS_ARE_REQUIRED(["username", "password"]))

  const newUser = new User({
    username: req.body?.username,
    password: req.body?.password
  }) as UserInterface

  newUser.save()
  .then((user:UserInterface) => {
    res.send(UserResponse(user))
  })
  .catch((err:NativeError) => res.send(err.message))
})

router.post("/login", async (req, res) => {
  if (!req.body?.username || !req.body) res.status(400).send(VARS_ARE_REQUIRED(["username", "password"]));

  const user = await User.findOne({$or: [
    {username: req.body.username},
    {email: req.body.username}
  ]}) as UserInterface

  if (!user || user == null) res.status(500).send(USER_NOT_FOUND);

  const result = await bcrypt.compare(req.body.password, user.password)

  ! result 
  ? res.status(400).send(UNSUCCESSFUL)
  : res.send(UserResponse(user));
  
})

router.get("/me", BearerAuthenticate, (req,res)=> {
  const user:UserInterface = req.user as UserInterface
  res.json(UserResponse(user))
})

router.get("/:id", (req, res) => {
  //req.params
  if (!req.params?.id) res.send(VARS_ARE_REQUIRED(["id"]))

  User.findById(req.params.id)
  .then((user:UserInterface) => {
    if (!user || user == null ) res.send(NOT_FOUND("User"))
    res.json(UserResponse(user))
  })
  .catch((err:NativeError) => res.send(err.message))
})

export default router;
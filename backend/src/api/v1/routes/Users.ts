import express from "express";
import User from "../../../models/User";

const router = express.Router();

router.post("/register", (req, res) => {
  if (!req.body?.username || !req.body?.password) res.send("Username and password are required to register!")

  const newUser = new User({
    username: req.body?.username,
    password: req.body?.password
  })

  newUser.save()
  .then(() => {
    res.send('User added!')
  })
  .catch(err => {
    if (err.message.includes("minimum") && err.message.includes("username")) res.send("Username too short")
    if (err.message.includes("minimum") && err.message.includes("password")) res.send("Password too short")
    else if (err.message.includes("duplicate")) res.send("Duplicate user found")
    else res.send('An error occured.')
  })
})

router.post("login")

export default router;
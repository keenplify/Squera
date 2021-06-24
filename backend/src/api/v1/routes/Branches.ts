import express from "express";
import Branch from "../../../models/Branch";
import { UserInterface } from "../../../interfaces/User.interface";
import BearerAuthenticate from "../../../utils/Authenticate";
import { BranchInterface } from "../../../interfaces/Branch.interface";
import { NOT_FOUND, SUCCESSFUL, VARS_ARE_REQUIRED } from "../../../utils/STRINGS";
import { NativeError } from "mongoose";
const router = express.Router();

router.post("/add", BearerAuthenticate, (req, res) => {
  const user = req.user as UserInterface
  
  const newBranch = new Branch({
    schoolId: req.body?.schoolId,
    name: req.body?.name,
    address: req.body?.address,
    coordinates: req.body?.coordinates,
    createdBy: user.id
  }) as BranchInterface

  newBranch.save()
  .then((branch)=> res.json({
    message: SUCCESSFUL,
    branchId: branch.id
  }))
  .catch(err => res.send(err.message))
})

router.get("/:id", (req, res) => {
  if (!req.params?.id) res.send(VARS_ARE_REQUIRED(["id"]))

  Branch.findById(req.params.id)
  .then((branch:BranchInterface) => {
    if (!branch || branch == null ) res.send(NOT_FOUND("School"))
    res.json(branch)
  })
  .catch((err:NativeError) => res.send(err.message))
})

export default router;
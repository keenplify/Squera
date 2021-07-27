import express from "express";
import BearerAuthenticate from "../../../utils/Authenticate";
import School from "../../../models/School";
import { SchoolInterface } from "../../../interfaces/School.interface";
import { NOT_FOUND, SUCCESSFUL, VARS_ARE_REQUIRED } from "../../../utils/STRINGS";
import { UserInterface } from "../../../interfaces/User.interface";
import { NativeError } from "mongoose";
import Paginate from "../../../utils/Paginate";

const router = express.Router();

router.post("/add", BearerAuthenticate, (req, res) => {
  const user = req.user as UserInterface
  
  const newSchool = new School({
    name: req.body?.name,
    description: req.body?.description,
    createdBy: user.id
  }) as SchoolInterface

  newSchool.save()
  .then((school:SchoolInterface)=> res.json({
    message: SUCCESSFUL,
    schoolId: school.id
  }))
  .catch(err => res.send(err))
})

router.get("/:id", (req, res) => {
  //req.params
  if (!req.params?.id) res.send(VARS_ARE_REQUIRED(["id"]))
  
  School.findById(req.params.id)
  .then((school:SchoolInterface) => {
    if (!school || school == null ) res.send(NOT_FOUND("School"))
    res.json(school)
  })
  .catch((err:NativeError) => res.send(err.message))
})

router.get("/", (req,res) => {
  const schools = School.find()

  Paginate(req, schools)

  schools.then((Schools:Array<SchoolInterface>) => {
    res.json({
      message: SUCCESSFUL,
      count: Schools.length,
      list: req.body?.withList && Schools
    })
  })
})

export default router;
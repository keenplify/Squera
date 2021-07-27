import { Router } from "express";
import { UserInterface } from "../../../interfaces/User.interface";
import Image from "../../../models/Image";
import BearerAuthenticate from "../../../utils/Authenticate";
import { SUCCESSFUL } from "../../../utils/STRINGS";
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req ,file,cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const user = req.user as UserInterface

    cb(null, user._id + '-' +Date.now() + '.jpg');
  }
})
const upload = multer({storage})

const router = Router();

router.post("/add", BearerAuthenticate, upload.single('file'), (req, res)=> {
  // console.log(req)
  const user = req.user as UserInterface

  const newImage = new Image({
    type: req.body?.type,
    forId: req.body?.forId,
    createdBy: user.id,
    path: req.file.path
  })

  newImage.save()
  .then((image)=> res.json({
    message: SUCCESSFUL,
    imageId: image.id
  }))
  .catch(err => res.send(err.message))
})

export default router;
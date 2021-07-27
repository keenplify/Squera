"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Image_1 = __importDefault(require("../../../models/Image"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const STRINGS_1 = require("../../../utils/STRINGS");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '.jpg');
    }
});
const upload = multer({ storage });
const router = express_1.Router();
router.post("/add", upload.single('file'), Authenticate_1.default, (req, res) => {
    var _a, _b;
    const user = req.user;
    const newImage = new Image_1.default({
        type: (_a = req.body) === null || _a === void 0 ? void 0 : _a.type,
        forId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.forId,
        createdBy: user.id
    });
    newImage.save()
        .then((image) => res.json({
        message: STRINGS_1.SUCCESSFUL,
        imageId: image.id
    }))
        .catch(err => res.send(err.message));
});
exports.default = router;
//# sourceMappingURL=Images.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const School_1 = __importDefault(require("../../../models/School"));
const STRINGS_1 = require("../../../utils/STRINGS");
const router = express_1.default.Router();
router.post("/add", Authenticate_1.default, (req, res) => {
    var _a, _b;
    const user = req.user;
    const newSchool = new School_1.default({
        name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.name,
        description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.description,
        createdBy: user.id
    });
    newSchool.save()
        .then(() => res.send(STRINGS_1.SUCCESSFUL))
        .catch(err => {
        if (err.message.includes("duplicate"))
            res.send(STRINGS_1.DUPLICATE_FOUND);
        else
            res.send(STRINGS_1.ERROR_OCCURED);
    });
});
router.get("/:id", (req, res) => {
    var _a;
    //req.params
    if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["id"]));
    School_1.default.findById(req.params.id)
        .then((school) => {
        console.log(school);
        if (!school || school == null)
            res.send(STRINGS_1.NOT_FOUND("School"));
        res.json(school);
    })
        .catch((err) => {
        if (err.message.includes("Cast to ObjectId"))
            res.send(STRINGS_1.PARAMETER_INVALID(["ObjectId"]));
        res.send(STRINGS_1.ERROR_OCCURED);
    });
});
exports.default = router;
//# sourceMappingURL=Schools.js.map
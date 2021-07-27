"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const School_1 = __importDefault(require("../../../models/School"));
const STRINGS_1 = require("../../../utils/STRINGS");
const Paginate_1 = __importDefault(require("../../../utils/Paginate"));
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
        .then((school) => res.json({
        message: STRINGS_1.SUCCESSFUL,
        schoolId: school.id
    }))
        .catch(err => res.send(err));
});
router.get("/:id", (req, res) => {
    var _a;
    //req.params
    if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["id"]));
    School_1.default.findById(req.params.id)
        .then((school) => {
        if (!school || school == null)
            res.send(STRINGS_1.NOT_FOUND("School"));
        res.json(school);
    })
        .catch((err) => res.send(err.message));
});
router.get("/", (req, res) => {
    const schools = School_1.default.find();
    Paginate_1.default(req, schools);
    schools.then((Schools) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Schools.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Schools
        });
    });
});
exports.default = router;
//# sourceMappingURL=Schools.js.map
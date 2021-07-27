"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Branch_1 = __importDefault(require("../../../models/Branch"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const STRINGS_1 = require("../../../utils/STRINGS");
const Paginate_1 = __importDefault(require("../../../utils/Paginate"));
const router = express_1.default.Router();
router.post("/add", Authenticate_1.default, (req, res) => {
    var _a, _b, _c, _d, _e;
    const user = req.user;
    const newBranch = new Branch_1.default({
        schoolId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.schoolId,
        name: (_b = req.body) === null || _b === void 0 ? void 0 : _b.name,
        geoCityId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.geoCityId,
        geoCountryCode: (_d = req.body) === null || _d === void 0 ? void 0 : _d.geoCountryCode,
        coordinates: (_e = req.body) === null || _e === void 0 ? void 0 : _e.coordinates,
        createdBy: user.id
    });
    newBranch.save()
        .then((branch) => res.json({
        message: STRINGS_1.SUCCESSFUL,
        branchId: branch.id
    }))
        .catch(err => res.send(err.message));
});
router.get("/:id", (req, res) => {
    var _a;
    if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["id"]));
    Branch_1.default.findById(req.params.id)
        .then((branch) => {
        if (!branch || branch == null)
            res.send(STRINGS_1.NOT_FOUND("School"));
        res.json(branch);
    })
        .catch((err) => res.send(err.message));
});
router.get("/", (req, res) => {
    const branch = Branch_1.default.find();
    Paginate_1.default(req, branch);
    branch.then((Branch) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Branch.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Branch
        });
    });
});
router.get("/school/:id", (req, res) => {
    var _a;
    if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["id"]));
    const branch = Branch_1.default.find({ schoolId: req.params.id });
    Paginate_1.default(req, branch);
    branch.then((Branch) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Branch.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Branch
        });
    });
});
exports.default = router;
//# sourceMappingURL=Branches.js.map
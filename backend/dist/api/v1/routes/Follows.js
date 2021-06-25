"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Paginate_1 = __importDefault(require("../../../utils/Paginate"));
const Follow_1 = __importDefault(require("../../../models/Follow"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const STRINGS_1 = require("../../../utils/STRINGS");
const router = express_1.default.Router();
router.post("/add", Authenticate_1.default, (req, res) => {
    var _a;
    const user = req.user;
    const newFollow = new Follow_1.default({
        followerId: user.id,
        followingId: (_a = req.body) === null || _a === void 0 ? void 0 : _a.followingId
    });
    newFollow.save()
        .then(() => res.send(STRINGS_1.SUCCESSFUL))
        .catch((err) => res.send(err.message));
});
router.delete("/:id", Authenticate_1.default, (req, res) => {
    var _a;
    const user = req.user;
    Follow_1.default.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)
        .then((follow) => {
        if (user.id !== follow.followerId)
            res.send(STRINGS_1.UNAUTHORIZED);
        else
            follow
                .remove()
                .then(() => res.send(STRINGS_1.SUCCESSFUL))
                .catch((err) => res.send(err.message));
    })
        .catch((err) => res.send(err.message));
});
router.get("/following/:id", (req, res) => {
    var _a;
    const follow = Follow_1.default.find({ followerId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, follow);
    follow.then((Follows) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Follows.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Follows
        });
    })
        .catch((err) => res.send(err.message));
});
router.get("/followers/:id", (req, res) => {
    var _a;
    const follow = Follow_1.default.find({ followingId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, follow);
    follow.then((Follows) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Follows.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Follows
        });
    })
        .catch((err) => res.send(err.message));
});
exports.default = router;
//# sourceMappingURL=Follows.js.map
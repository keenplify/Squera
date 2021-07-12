"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
    var _a, _b, _c;
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.pageNumber) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.paginate) || 10;
    const withList = ((((_c = req.query) === null || _c === void 0 ? void 0 : _c.withList) === 'true') ? true : false);
    const posts = Follow_1.default.paginate({
        // @ts-ignore:
        query: { followerId: req.params.id },
        page,
        limit,
        sort: { createdAt: -1 }
    });
    posts.then(({ docs, hasMore }) => {
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: limit,
            hasMore,
            list: withList && docs,
        });
    })
        .catch((err) => res.status(400).send(err.message));
});
router.get("/followers/:id", (req, res) => {
    // const follow = Follow.find({followingId:req.params?.id})
    // Paginate(req, follow)
    // follow.then((Follows:Array<FollowInterface>)=> {
    //   res.json({
    //     message: SUCCESSFUL,
    //     count: Follows.length,
    //     list: req.body?.withList && Follows
    //   })
    // })
    // .catch((err:NativeError)=>res.send(err.message))
});
exports.default = router;
//# sourceMappingURL=Follows.js.map
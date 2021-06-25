"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const Post_1 = __importDefault(require("../../../models/Post"));
const STRINGS_1 = require("../../../utils/STRINGS");
const Paginate_1 = __importDefault(require("../../../utils/Paginate"));
const router = express_1.default.Router();
router.post("/add", Authenticate_1.default, (req, res) => {
    var _a, _b, _c, _d;
    const user = req.user;
    const newPost = new Post_1.default({
        text: (_a = req.body) === null || _a === void 0 ? void 0 : _a.text,
        schoolId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.schoolId,
        branchId: (_c = req.body) === null || _c === void 0 ? void 0 : _c.branchId,
        isAnon: (_d = req.body) === null || _d === void 0 ? void 0 : _d.isAnon,
        createdBy: user.id
    });
    newPost.save()
        .then((post) => res.json({
        message: STRINGS_1.SUCCESSFUL,
        post
    }))
        .catch(err => res.send(err.message));
});
router.get("/:id", (req, res) => {
    Post_1.default.findById(req.params.id)
        .then((post) => {
        if (!post || post == null)
            res.send(STRINGS_1.NOT_FOUND("Post"));
        if (post.isAnon)
            delete post['createdBy'];
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            post
        });
    })
        .catch((err) => res.send(err.message));
});
router.delete("/:id", Authenticate_1.default, (req, res) => {
    var _a;
    const user = req.user;
    Post_1.default.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)
        .then((post) => {
        if (user.id !== post.createdBy)
            res.send(STRINGS_1.UNAUTHORIZED);
        else
            post
                .remove()
                .then(() => res.send(STRINGS_1.SUCCESSFUL))
                .catch((err) => res.send(err.message));
    })
        .catch((err) => res.send(err.message));
});
router.get("/user/:id", (req, res) => {
    var _a;
    const posts = Post_1.default.find({ createdBy: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, posts);
    posts.then((Posts) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Posts.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Posts
        });
    })
        .catch((err) => res.send(err.message));
});
router.get("/school/:id", (req, res) => {
    var _a;
    const posts = Post_1.default.find({ schoolId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, posts);
    posts.then((Posts) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Posts.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Posts
        });
    })
        .catch((err) => res.send(err.message));
});
router.get("/branch/:id", (req, res) => {
    var _a;
    const posts = Post_1.default.find({ branchId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, posts);
    posts.then((Posts) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Posts.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Posts
        });
    })
        .catch((err) => res.send(err.message));
});
exports.default = router;
//# sourceMappingURL=Posts.js.map
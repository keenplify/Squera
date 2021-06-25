"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const Comment_1 = __importDefault(require("../../../models/Comment"));
const STRINGS_1 = require("../../../utils/STRINGS");
const Paginate_1 = __importDefault(require("../../../utils/Paginate"));
const router = express_1.default.Router();
router.post("/add", Authenticate_1.default, (req, res) => {
    var _a, _b, _c;
    const user = req.user;
    const newComment = new Comment_1.default({
        text: (_a = req.body) === null || _a === void 0 ? void 0 : _a.text,
        postId: (_b = req.body) === null || _b === void 0 ? void 0 : _b.postId,
        isAnon: (_c = req.body) === null || _c === void 0 ? void 0 : _c.isAnon,
        createdBy: user.id
    });
    newComment.save()
        .then((comment) => res.json({
        message: STRINGS_1.SUCCESSFUL,
        comment
    }))
        .catch(err => res.send(err.message));
});
router.get("/post/:id", (req, res) => {
    var _a;
    const comments = Comment_1.default.find({ postId: (_a = req.params) === null || _a === void 0 ? void 0 : _a.id });
    Paginate_1.default(req, comments);
    comments.then((Comments) => {
        var _a;
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            count: Comments.length,
            list: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && Comments
        });
    })
        .catch((err) => res.send(err.message));
});
router.get("/:id", (req, res) => {
    Comment_1.default.findById(req.params.id)
        .then((comment) => {
        if (!comment || comment == null)
            res.send(STRINGS_1.NOT_FOUND("Comment"));
        if (comment.isAnon)
            delete comment['createdBy'];
        res.json({
            message: STRINGS_1.SUCCESSFUL,
            comment
        });
    })
        .catch((err) => res.send(err.message));
});
router.delete("/:id", Authenticate_1.default, (req, res) => {
    var _a;
    const user = req.user;
    Comment_1.default.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id)
        .then((comment) => {
        if (user.id !== comment.createdBy)
            res.send(STRINGS_1.UNAUTHORIZED);
        else
            comment
                .remove()
                .then(() => res.send(STRINGS_1.SUCCESSFUL))
                .catch((err) => res.send(err.message));
    })
        .catch((err) => res.send(err.message));
});
exports.default = router;
//# sourceMappingURL=Comments.js.map
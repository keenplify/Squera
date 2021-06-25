"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const STRINGS_1 = require("../../../utils/STRINGS");
const User_1 = __importDefault(require("../../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Authenticate_1 = __importDefault(require("../../../utils/Authenticate"));
const UserResponse_1 = require("../../../utils/UserResponse");
const router = express_1.default.Router();
router.post("/add", (req, res) => {
    var _a, _b, _c, _d;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || !((_b = req.body) === null || _b === void 0 ? void 0 : _b.password))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["username", "password"]));
    const newUser = new User_1.default({
        username: (_c = req.body) === null || _c === void 0 ? void 0 : _c.username,
        password: (_d = req.body) === null || _d === void 0 ? void 0 : _d.password
    });
    newUser.save()
        .then((user) => {
        res.cookie("token", user.token, { httpOnly: true });
        res.cookie("id", user.id);
        res.send('User added!');
    })
        .catch((err) => res.send(err.message));
});
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.username) || !req.body)
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["username", "password"]));
    const user = yield User_1.default.findOne({ $or: [
            { username: req.body.username },
            { email: req.body.username }
        ] });
    if (!user || user == null)
        res.send(STRINGS_1.USER_NOT_FOUND);
    const result = yield bcrypt_1.default.compare(req.body.password, user.password);
    !result
        ? res.send(STRINGS_1.UNSUCCESSFUL)
        : res.cookie("token", user.token, { httpOnly: true })
            && res.send(UserResponse_1.UserResponse(user));
}));
router.get("/me", Authenticate_1.default, (req, res) => {
    const user = req.user;
    res.json(UserResponse_1.UserResponse(user));
});
router.get("/:id", (req, res) => {
    var _a;
    //req.params
    if (!((_a = req.params) === null || _a === void 0 ? void 0 : _a.id))
        res.send(STRINGS_1.VARS_ARE_REQUIRED(["id"]));
    User_1.default.findById(req.params.id)
        .then((user) => {
        if (!user || user == null)
            res.send(STRINGS_1.NOT_FOUND("User"));
        res.json(UserResponse_1.UserResponse(user));
    })
        .catch((err) => res.send(err.message));
});
exports.default = router;
//# sourceMappingURL=Users.js.map
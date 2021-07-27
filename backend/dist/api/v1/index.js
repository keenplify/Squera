"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("./routes/Users"));
const Schools_1 = __importDefault(require("./routes/Schools"));
const Branches_1 = __importDefault(require("./routes/Branches"));
const Follows_1 = __importDefault(require("./routes/Follows"));
const Posts_1 = __importDefault(require("./routes/Posts"));
const Images_1 = __importDefault(require("./routes/Images"));
const APIV1 = express_1.default.Router();
APIV1.use('/users', Users_1.default);
APIV1.use('/schools', Schools_1.default);
APIV1.use('/branches', Branches_1.default);
APIV1.use('/follows', Follows_1.default);
APIV1.use('/posts', Posts_1.default);
APIV1.use('/images', Images_1.default);
exports.default = APIV1;
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("./routes/Users"));
const Schools_1 = __importDefault(require("./routes/Schools"));
const APIV1 = express_1.default.Router();
APIV1.use('/users', Users_1.default);
APIV1.use('/schools', Schools_1.default);
exports.default = APIV1;
//# sourceMappingURL=index.js.map
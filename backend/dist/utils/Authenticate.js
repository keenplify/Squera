"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = require("passport");
const BearerAuthenticate = passport_1.authenticate('bearer', { session: false });
exports.default = BearerAuthenticate;
//# sourceMappingURL=Authenticate.js.map
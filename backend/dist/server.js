"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const mongoose_1 = require("mongoose");
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_http_bearer_1 = require("passport-http-bearer");
const mongoose_config_1 = __importDefault(require("./configs/mongoose.config"));
const v1_1 = __importDefault(require("./api/v1"));
const User_1 = __importDefault(require("./models/User"));
const swagger_ui_express_1 = require("swagger-ui-express");
const swagger_1 = require("./configs/swagger");
// CONFIG DOTENV
dotenv_1.default.config();
// CREATE SERVER
const app = express_1.default();
// USE BEARER-PASSPORT
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_http_bearer_1.Strategy(function (token, done) {
    User_1.default.findOne({ token: token }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user, { scope: 'all' });
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(undefined, user.id);
});
// DECODE JSON BODY
app.use(express_1.json());
app.use(express_1.urlencoded({ extended: true }));
// USE CORS
app.use(cors_1.default());
// CONFIG VERSIONING/ROUTING
app.use('/api/v1', v1_1.default);
// CONNECT TO MONGODB
mongoose_1.connect(process.env.MONGO_URI, mongoose_config_1.default, (err) => err
    ? console.log(err)
    : console.log("MongoDB connection successfully established!"));
// START EXPRESS SERVER
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server started at http://localhost:${process.env.EXPRESS_PORT}/api/v1`);
});
// DOCUMENTATION
app.use("/api-docs", swagger_ui_express_1.serve, swagger_ui_express_1.setup(swagger_1.swaggerDocument, { explorer: true }));
//# sourceMappingURL=server.js.map
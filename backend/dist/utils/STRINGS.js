"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_FAILED = exports.PARAMETER_INVALID = exports.ERROR_OCCURED = exports.UNSUCCESSFUL = exports.SUCCESSFUL = exports.NOT_FOUND = exports.USER_NOT_FOUND = exports.LOGIN_SUCCESSFUL = exports.DUPLICATE_FOUND = exports.TOO_SHORT = exports.VARS_ARE_REQUIRED = void 0;
const VARS_ARE_REQUIRED = (params) => `${params.join()} are required`;
exports.VARS_ARE_REQUIRED = VARS_ARE_REQUIRED;
const TOO_SHORT = (param) => `${param} too short`;
exports.TOO_SHORT = TOO_SHORT;
exports.DUPLICATE_FOUND = "Duplicate found";
exports.LOGIN_SUCCESSFUL = "Login successful";
exports.USER_NOT_FOUND = "User not found";
const NOT_FOUND = (param) => `${param} not found`;
exports.NOT_FOUND = NOT_FOUND;
exports.SUCCESSFUL = "Successful";
exports.UNSUCCESSFUL = "Unsuccessful";
exports.ERROR_OCCURED = "An error occured";
const PARAMETER_INVALID = (params) => `${params.join()} invalid`;
exports.PARAMETER_INVALID = PARAMETER_INVALID;
exports.VALIDATION_FAILED = "Validation failed";
//# sourceMappingURL=STRINGS.js.map
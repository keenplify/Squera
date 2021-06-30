"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Paginate(req, document) {
    var _a, _b, _c;
    if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.withList) {
        const paginate = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.paginate) || 10;
        const pageNumber = parseInt((_c = req.query) === null || _c === void 0 ? void 0 : _c.pageNumber) || 1;
        document.sort('createdAt').skip((pageNumber) * (paginate)).limit(paginate);
    }
}
exports.default = Paginate;
//# sourceMappingURL=Paginate.js.map
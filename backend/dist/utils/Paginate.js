"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Paginate(req, document) {
    var _a, _b, _c;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.withList) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.pageNumber)) {
        const paginate = parseInt((_c = req.body) === null || _c === void 0 ? void 0 : _c.paginate) || 10;
        const pageNumber = parseInt(req.body.pageNumber);
        document.sort('createdAt').skip((pageNumber) * (paginate)).limit(paginate);
    }
}
exports.default = Paginate;
//# sourceMappingURL=Paginate.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true
    },
    description: String,
    previewUri: String
});
exports.default = mongoose_1.model('Category', exports.categorySchema);
//# sourceMappingURL=Category.js.map
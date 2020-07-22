"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelSchema = void 0;
const mongoose_1 = require("mongoose");
exports.labelSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true
    }
});
exports.default = mongoose_1.model('Label', exports.labelSchema);
//# sourceMappingURL=Label.js.map
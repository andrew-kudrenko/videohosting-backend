"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoSchema = void 0;
const mongoose_1 = require("mongoose");
exports.videoSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    previewUri: String,
    date: Date,
    labels: [mongoose_1.SchemaTypes.ObjectId],
    categories: [mongoose_1.SchemaTypes.ObjectId]
});
exports.default = mongoose_1.model('Video', exports.videoSchema);
//# sourceMappingURL=Video.js.map
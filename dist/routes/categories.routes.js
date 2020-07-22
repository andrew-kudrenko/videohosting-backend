"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_helpers_1 = require("../helpers/mongodb.helpers");
const Category_1 = require("../models/Category");
const router = express_1.Router();
(async () => {
    const connection = await mongodb_helpers_1.createConnection('/categories');
    const Category = connection.model('Category', Category_1.categorySchema);
    router.route('/categories/:title?')
        .get(async (req, res) => {
        const title = req.params['title'];
        const matcher = title ? { title } : {};
        res.send(await Category.find(matcher));
    })
        .post(async (req, res) => {
        const { title, description, previewUri } = req.body;
        const category = { title, description, previewUri };
        const exists = (await Category.find(category)).length;
        if (!exists) {
            await new Category(category).save();
            res.status(201).send();
        }
    });
    process.on('exit', connection.close);
})();
exports.default = router;
//# sourceMappingURL=categories.routes.js.map
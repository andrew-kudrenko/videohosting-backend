"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_helpers_1 = require("../helpers/mongodb.helpers");
const Label_1 = require("../models/Label");
const router = express_1.Router();
(async () => {
    const connection = await mongodb_helpers_1.createConnection('/labels');
    const Label = connection.model('Label', Label_1.labelSchema);
    router.route('/labels/:title?')
        .get(async (req, res) => {
        const title = req.params['title'] || null;
        const matcher = title ? { title } : {};
        res.send(await Label.find(matcher));
    })
        .post(async (req, res) => {
        const { title } = req.body;
        const label = { title };
        const exists = (await Label.find(label)).length;
        if (!exists) {
            await new Label(label).save();
            res.status(201).send();
        }
    });
    process.on('exit', connection.close);
})();
exports.default = router;
//# sourceMappingURL=labels.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_helpers_1 = require("../helpers/mongodb.helpers");
const Video_1 = require("../models/Video");
const router = express_1.Router();
(async () => {
    const connection = await mongodb_helpers_1.createConnection('/videos');
    const Video = connection.model('Video', Video_1.videoSchema);
    router.route('/videos/:id?')
        .get(async (req, res) => {
        const id = req.params['id'];
        const matcher = id ? { id } : {};
        res.send(await Video.find(matcher));
    })
        .post(async (req, res) => {
        const { title, description, previewUri, date, labels, categories } = req.body;
        const video = { title, description, previewUri, date, labels, categories };
        const exists = (await Video.find(video)).length;
        if (!exists) {
            await new Video(video).save();
            res.status(201).send();
        }
    });
    process.on('exit', connection.close);
})();
exports.default = router;
//# sourceMappingURL=videos.routes.js.map
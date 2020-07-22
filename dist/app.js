"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const labels_routes_1 = __importDefault(require("./routes/labels.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const videos_routes_1 = __importDefault(require("./routes/videos.routes"));
const port = config_1.default.get('port') || 7000;
const app = express_1.default();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
});
app.use('/', videos_routes_1.default);
app.use('/', categories_routes_1.default);
app.use('/', labels_routes_1.default);
app.listen(port, () => console.log(`Server has been started on port ${port}`));
//# sourceMappingURL=app.js.map
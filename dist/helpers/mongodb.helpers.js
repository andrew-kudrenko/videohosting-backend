"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.createConnection = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const uri = config_1.default.get('mongouri');
const connectionOptions = {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
};
async function connect(endPoint) {
    try {
        await mongoose_1.default.connect(uri.concat(endPoint), connectionOptions);
    }
    catch (e) {
        console.log('Connecting error', e);
    }
}
exports.connect = connect;
async function createConnection(endPoint) {
    try {
        return await mongoose_1.default.createConnection(uri.concat(endPoint), connectionOptions);
    }
    catch (e) {
        console.log('Connecting error', e);
    }
}
exports.createConnection = createConnection;
async function disconnect() {
    try {
        await mongoose_1.default.disconnect();
    }
    catch (e) {
        console.log('Disconnecting error', e);
    }
}
exports.disconnect = disconnect;
//# sourceMappingURL=mongodb.helpers.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./models/review");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var review_1 = __importDefault(require("./routes/review"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(review_1.default);
var mongoUri = 'mongodb+srv://admin:4DUJ6qEaQvmBbj4@cluster0.wwxiu.mongodb.net/reviews?retryWrites=true&w=majority';
if (!mongoUri) {
    throw new Error("MongoURI was not supplied.");
}
mongoose_1.default.connect(mongoUri);
mongoose_1.default.connection.on('connected', function () {
    console.log('Connected to mongo instance');
});
mongoose_1.default.connection.on('error', function (err) {
    console.error('Error connecting to mongo', err);
});
app.get('/', function (req, res) {
    res.send("hello world");
});
app.listen(3000, function () {
    console.log('Listening on port 3000');
});

"use strict";
exports.__esModule = true;
exports.Comment = void 0;
var mongoose_1 = require("mongoose");
var commentSchema = new mongoose_1["default"].Schema({
    commenter: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, "default": Date.now },
    text: String,
    post: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'Post' }
});
exports.Comment = mongoose_1["default"].model('Comments', commentSchema);

"use strict";
exports.__esModule = true;
exports.follows_model = exports.follows = void 0;
var mongoose_1 = require("mongoose");
exports.follows = new mongoose_1.Schema({
    username: String,
    followers: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'User' }]
});
exports.follows_model = mongoose_1["default"].model('user_activity', exports.follows);

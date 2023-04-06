"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.user_model = exports.user = void 0;
var mongoose_1 = require("mongoose");
var dotenv = require("dotenv");
var bcrypt_1 = require("bcrypt");
dotenv.config({ path: "/root/Documents/projects/ringer/.env" });
exports.user = new mongoose_1.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    DOB: { type: String, required: true },
    country: { type: String, required: true },
    salt: { type: String }
});
exports.user.pre("save", function () {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, hash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("called");
                    user = this;
                    // if(!user.isModified("password")){
                    _a = this;
                    return [4 /*yield*/, bcrypt_1["default"].genSalt(10)];
                case 1:
                    // if(!user.isModified("password")){
                    _a.salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1["default"].hash(user.password, this.salt)];
                case 2:
                    hash = _b.sent();
                    user.password = hash;
                    return [2 /*return*/];
            }
        });
    });
});
var connectDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(process.env.MONGO_URI);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mongoose_1["default"].connect(process.env.MONGO_URI, {})];
            case 2:
                _a.sent();
                console.log('MongoDB connected successfully');
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error('MongoDB connection error:', err_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.user_model = mongoose_1["default"].model('user', exports.user);
exports["default"] = connectDB;

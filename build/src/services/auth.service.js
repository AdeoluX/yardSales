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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_schema_1 = require("../models/user.schema");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
class AuthService {
    signIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_schema_1.UserModel.findOne({ email: payload.email });
            if (!user)
                return {
                    success: false,
                    data: {},
                    message: 'Invalid Credentials'
                };
            const check = user.isValidPassword(payload.password);
            if (!check)
                return {
                    success: false,
                    data: {},
                    message: 'Invalid Credentials'
                };
            const token = helper_utils_1.default.signToken({
                email: user.email,
                id: user._id
            });
            return {
                success: true,
                data: {
                    token
                },
                message: "Successful login"
            };
        });
    }
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { confirmPassword, email, password } = payload;
            const user = yield user_schema_1.UserModel.findOne({ email });
            if (user)
                return {
                    success: false,
                    data: {},
                    message: 'Email already exists'
                };
            if (confirmPassword !== password)
                return {
                    success: false,
                    data: {},
                    message: "Passwords don't match"
                };
            const newUser = yield user_schema_1.UserModel.create({
                email, password
            });
            const token = helper_utils_1.default.signToken({
                id: newUser._id,
                email
            });
            yield user_schema_1.UserModel.updateOne({ _id: newUser._id }, { token });
            return {
                success: true,
                token,
                message: "Signed up successfully."
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
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
const otp_schema_1 = require("../models/otp.schema");
const user_schema_1 = require("../models/user.schema");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const bcrypt_1 = require("bcrypt");
const email_service_1 = require("./email.service");
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
            const check = yield (0, bcrypt_1.compare)(payload.password, user.password);
            // const check = user.isValidPassword(payload.password)
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
                data: {},
                token,
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
    sendOtp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            //Find User
            const user = yield user_schema_1.UserModel.findOne({
                email: payload.email
            });
            if (!user)
                return {
                    success: true,
                    message: "Otp has been sent successfully"
                };
            const otp = helper_utils_1.default.generateString({ number: true });
            //send otp to email
            (0, email_service_1.sendEmail)({
                to: payload.email,
                subject: 'Otp Verification',
                templateName: "otpEmail",
                replacements: {
                    "OTP_CODE": otp
                }
            });
            //create otp
            yield otp_schema_1.OtpModel.create({
                user_id: user._id,
                otp
            });
            return {
                success: true,
                message: "Otp has been sent successfully"
            };
        });
    }
    verifyOtp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otp } = payload;
            const user = yield user_schema_1.UserModel.findOne({ email });
            if (!user)
                return {
                    success: false,
                    message: 'Invalid Otp!'
                };
            const findOtp = yield otp_schema_1.OtpModel.findOne({
                user_id: user._id,
                otp, used: false
            });
            if (!findOtp) {
                return {
                    success: false,
                    message: 'Invalid Otp!'
                };
            }
            yield otp_schema_1.OtpModel.updateOne({ _id: findOtp._id }, { used: true });
            return {
                success: true,
                message: 'Successfully Verified!'
            };
        });
    }
    resetPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { confirmPassword, email, otp, password } = payload;
            if (!confirmPassword || !password)
                return {
                    success: false,
                    message: "Password & confirmPassword field cannot be empty"
                };
            const findUser = yield user_schema_1.UserModel.findOne({ email });
            if (!findUser)
                return {
                    success: false,
                    message: "Invalid credentials!"
                };
            if (confirmPassword !== password)
                return {
                    success: false,
                    message: "Please passwords must match"
                };
            const findOtp = yield otp_schema_1.OtpModel.findOne({
                user_id: findUser._id,
                otp, used: true
            });
            if (!findOtp)
                return {
                    success: false,
                    message: "Invalid credentials!"
                };
            const hashPassword = yield (0, bcrypt_1.hash)(password, 10);
            yield user_schema_1.UserModel.updateOne({ _id: findUser._id }, { password: hashPassword });
            yield otp_schema_1.OtpModel.deleteOne({ _id: findOtp._id });
            return {
                success: true,
                message: "Password updated successfully."
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
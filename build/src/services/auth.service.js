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
const company_schema_1 = require("../models/company.schema");
const otp_schema_1 = require("../models/otp.schema");
const user_schema_1 = require("../models/user.schema");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const address_schema_1 = require("../models/address.schema");
const companyAddress_schema_1 = require("../models/companyAddress.schema");
const email_service_1 = require("./email.service");
const bcrypt_1 = require("bcrypt");
class AuthService {
    signIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield user_schema_1.UserModel.findOne({ email }).select('+password');
            if (!user)
                return { success: false, message: "Invalid credentials" };
            const isValid = yield (0, bcrypt_1.compare)(password, user.password);
            // const isValid = await user.isValidPassword(password);
            if (!isValid)
                return { success: false, message: "Invalid credentials" };
            const token = helper_utils_1.default.signToken({ email, id: user._id, status: user.status });
            return {
                success: true,
                message: "Logged in successfully.",
                token,
            };
        });
    }
    adminSignIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield user_schema_1.UserModel.findOne({ email }).select('+password');
            if (!user)
                return { success: false, message: "Invalid credentials" };
            if (!['admin', 'super-admin'].includes(user.role))
                return { success: false, message: "Invalid credentials" };
            const isValid = yield (0, bcrypt_1.compare)(password, user.password);
            // const isValid = await user.isValidPassword(password);
            if (!isValid)
                return { success: false, message: "Invalid credentials" };
            const token = helper_utils_1.default.signToken({ email, id: user._id, status: user.status, role: user.role });
            return {
                success: true,
                message: "Logged in successfully.",
                token,
            };
        });
    }
    companySignIn(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const company = yield company_schema_1.CompanyModel.findOne({ email });
            if (!company)
                return { success: false, message: "Invalid credentials" };
            const isValid = yield company.isValidPassword(password);
            if (!isValid)
                return { success: false, message: "Invalid credentials" };
            const token = helper_utils_1.default.signToken({ id: company._id, status: company.status });
            return {
                success: true,
                message: "Logged in successfully.",
                token,
            };
        });
    }
    signUp(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { country, email, name, no, phoneNumber, password, confirmPassword, state, street, town } = payload;
            const companyExists = yield company_schema_1.CompanyModel.findOne({ email });
            if (companyExists)
                return { success: false, message: "Invalid credentials." };
            if (confirmPassword !== password)
                return { success: false, message: "Passwords don't match." };
            let address = yield address_schema_1.AddressModel.create({
                country,
                no,
                town,
                state,
                street
            });
            address = yield address.save();
            let createCompany = new company_schema_1.CompanyModel({
                email,
                password,
                name,
                phoneNumber,
                tier: '66993361800a5c21c912ebda'
            });
            createCompany = yield createCompany.save();
            if (!createCompany)
                return { success: false, message: "Invalid credentials" };
            yield companyAddress_schema_1.CompanyAddressModel.create({
                company: createCompany._id,
                address: address._id
            });
            const token = helper_utils_1.default.signToken({
                email,
                id: createCompany._id,
                status: createCompany.status,
            });
            const otp = helper_utils_1.default.generateString({ number: true });
            yield otp_schema_1.OtpModel.create({
                author_id: createCompany._id,
                otp,
            });
            //send email to company
            (0, email_service_1.sendEmail)({
                to: email,
                subject: 'New Sign Up',
                templateName: `welcomeEmail`,
                replacements: {
                    name,
                    otp
                }
            });
            return {
                success: true,
                message: "Logged in successfully.",
                token,
                options: {
                    otp,
                },
            };
        });
    }
    activateProfile(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, authorizer } = payload;
            const user_id = authorizer.id;
            const userExists = yield user_schema_1.UserModel.findById(user_id);
            if (!userExists)
                return { success: false, message: "Invalid Otp" };
            const otpExists = yield otp_schema_1.OtpModel.findOne({
                author_id: user_id,
                otp,
            });
            if (!otpExists)
                return { success: false, message: "Invalid Otp" };
            yield user_schema_1.UserModel.findByIdAndUpdate(user_id, { status: "active" }, { new: true });
            const token = helper_utils_1.default.signToken({
                email: userExists.email,
                id: userExists._id,
                status: userExists.status,
            });
            return {
                success: true,
                message: "Account activated successfully.",
                token,
                options: {
                    otp,
                },
            };
        });
    }
    forgotPassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = payload;
            const findUser = yield user_schema_1.UserModel.findOne({
                email,
            });
            if (!findUser)
                return { success: true, message: "Otp sent." };
            const otp = helper_utils_1.default.generateString({ number: true });
            yield otp_schema_1.OtpModel.create({
                author_id: findUser._id,
                otp,
            });
            return {
                success: true,
                message: "Otp sent.",
                options: {
                    otp,
                },
            };
        });
    }
    changePassword(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, confirmPassword, password, email } = payload;
            if (confirmPassword !== password)
                return { success: false, message: "Passwords don't match." };
            const userExists = yield user_schema_1.UserModel.findOne({
                email,
            });
            if (!userExists)
                return { success: false, message: "User does not exist" };
            const findOtp = yield otp_schema_1.OtpModel.findOne({
                author_id: userExists._id,
                otp,
            });
            if (!findOtp)
                return { success: false, message: "Invalid or Expired otp" };
            yield user_schema_1.UserModel.findByIdAndUpdate(userExists._id, { password }, { new: true });
            return {
                success: true,
                message: "Password change successful",
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
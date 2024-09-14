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
exports.AuthController = void 0;
const api_response_1 = __importDefault(require("../utils/api-response"));
const auth_service_1 = require("../services/auth.service");
const { created, customError, ok, response } = api_response_1.default;
class AuthController {
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, token } = yield auth_service_1.AuthService.prototype.signIn(payload);
                if (!success)
                    return customError(res, 400, message);
                return ok(res, { token }, success ? "Logged in Successfully" : "Invalid Credentials.");
            }
            catch (error) {
                next(error);
            }
        });
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, options, token } = yield auth_service_1.AuthService.prototype.signUp(payload);
                if (!success)
                    return customError(res, 400, message);
                return ok(res, Object.assign(Object.assign({}, options), { token }), message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    sendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, token } = yield auth_service_1.AuthService.prototype.sendOtp(payload);
                return ok(res, {}, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, token } = yield auth_service_1.AuthService.prototype.verifyOtp(payload);
                if (!success)
                    customError(res, 400, message);
                return ok(res, {}, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
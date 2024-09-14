"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
class AuthRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        this.router.post("/sign-in", controller_1.AuthController.prototype.signIn);
        this.router.post("/sign-up", controller_1.AuthController.prototype.signUp);
        this.router.post("/send-otp", controller_1.AuthController.prototype.sendOtp);
        this.router.post("/verify-otp", controller_1.AuthController.prototype.verifyOtp);
        return this.router;
    }
}
exports.authRoutes = new AuthRoutes();
//# sourceMappingURL=auth.routes.js.map
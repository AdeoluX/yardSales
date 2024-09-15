import express, { Router } from "express";
import { AuthController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/sign-in", AuthController.prototype.signIn);
    this.router.post("/sign-up", AuthController.prototype.signUp);
    this.router.post("/send-otp", AuthController.prototype.sendOtp);
    this.router.post("/verify-otp", AuthController.prototype.verifyOtp);
    this.router.post("/reset-password", AuthController.prototype.resetPassword);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();

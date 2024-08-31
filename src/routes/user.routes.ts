import express, { Router } from "express";
import { UserController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/check-in", authMiddleware.verifyUser, UserController.prototype.checkIn);
    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();

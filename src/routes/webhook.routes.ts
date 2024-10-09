import express, { Router } from "express";
import { WebHookController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

class WebHookRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/purchase", WebHookController.prototype.webhook);
    return this.router;
  }
}

export const webhookRoutes: WebHookRoutes = new WebHookRoutes();

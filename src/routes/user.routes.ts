import express, { Router } from "express";
import { UserController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

class UserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/user", authMiddleware.verifyUser, UserController.prototype.getUser);
    this.router.put("/location", authMiddleware.verifyUser, UserController.prototype.updateUserLocation);
    this.router.post("/seedProducts", UserController.prototype.seedUserAndProducts);
    this.router.get('/products/:category?', authMiddleware.verifyUser, UserController.prototype.viewProducts);
    this.router.get('/nearby-products/:category?', authMiddleware.verifyUser, UserController.prototype.productsNearby);
    this.router.get('/product/:id', authMiddleware.verifyUser, UserController.prototype.viewProduct);
    this.router.post('/product/:id', authMiddleware.verifyUser, UserController.prototype.reviewProduct);
    this.router.post('/product', authMiddleware.verifyUser, UserController.prototype.uploadProduct);
    this.router.post('/bulk-product', authMiddleware.verifyUser, UserController.prototype.reviewProduct);
    this.router.post('/purchase', authMiddleware.verifyUser, UserController.prototype.purchaseProduct);

    return this.router;
  }
}

export const userRoutes: UserRoutes = new UserRoutes();

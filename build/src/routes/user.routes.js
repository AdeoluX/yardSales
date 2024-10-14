"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class UserRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        this.router.post("/user", auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.getUser);
        this.router.put("/location", auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.updateUserLocation);
        this.router.post("/seedProducts", controller_1.UserController.prototype.seedUserAndProducts);
        this.router.get('/products/:category?', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.viewProducts);
        this.router.get('/nearby-products/:category?', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.productsNearby);
        this.router.get('/product/:id', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.viewProduct);
        this.router.post('/product/:id', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.reviewProduct);
        this.router.post('/product', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.uploadProduct);
        this.router.post('/bulk-product', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.reviewProduct);
        this.router.post('/purchase', auth_middleware_1.authMiddleware.verifyUser, controller_1.UserController.prototype.purchaseProduct);
        /**
         * add Item to cart
         * remove Item from cart
         *
         */
        return this.router;
    }
}
exports.userRoutes = new UserRoutes();
//# sourceMappingURL=user.routes.js.map
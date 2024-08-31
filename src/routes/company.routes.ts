import express, { Router } from "express";
import { CompanyController } from "../controller";
import { authMiddleware } from "../middleware/auth.middleware";

class CompanyRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/profile-user", authMiddleware.verifyUser, CompanyController.prototype.profileUser);
    this.router.post("/add-address", authMiddleware.verifyUser, CompanyController.prototype.createAddress);
    this.router.get("/branches", authMiddleware.verifyUser, CompanyController.prototype.getCompanyBranches);
    this.router.get("/branch/:id", authMiddleware.verifyUser, CompanyController.prototype.getOneBranch);
    this.router.get("/employees", authMiddleware.verifyUser, CompanyController.prototype.getAllEmployees);


    return this.router;
  }
}

export const companyRoutes: CompanyRoutes = new CompanyRoutes();

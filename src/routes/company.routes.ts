import express, { Router } from "express";
import { CompanyController } from "../controller";
import { authMiddleware, AuthMiddleware } from "../middleware/auth.middleware";

class CompanyRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post("/profile-user", authMiddleware.verifyUser, CompanyController.prototype.profileUser);
    this.router.post("/department", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.createDepartment);
    this.router.get("/department/template", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.downloadTemplate)
    this.router.post("/department/bulk-create", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.bulkCreateDepartment);
    this.router.get("/departments", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.getAllDepartments);
    this.router.get("/department/:id", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.getOneDepartments);
    this.router.patch("/department/:id", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.updateOneDepartment);
    this.router.post("/rank");
    this.router.get("/ranks");
    this.router.patch("/rank/:id");
    this.router.get("/rank/:id");
    this.router.post("/add-address", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.createAddress);
    this.router.get("/branches", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.getCompanyBranches);
    this.router.get("/branch/:id", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.getOneBranch);
    this.router.get("/employees", AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, CompanyController.prototype.getAllEmployees);


    return this.router;
  }
}

export const companyRoutes: CompanyRoutes = new CompanyRoutes();

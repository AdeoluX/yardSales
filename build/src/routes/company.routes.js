"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
class CompanyRoutes {
    constructor() {
        this.router = express_1.default.Router();
    }
    routes() {
        this.router.post("/profile-user", auth_middleware_1.authMiddleware.verifyUser, controller_1.CompanyController.prototype.profileUser);
        this.router.post("/department", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.createDepartment);
        this.router.get("/department/template", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.downloadTemplate);
        this.router.post("/department/bulk-create", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.bulkCreateDepartment);
        this.router.get("/departments", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.getAllDepartments);
        this.router.get("/department/:id", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.getOneDepartments);
        this.router.patch("/department/:id", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.updateOneDepartment);
        this.router.post("/rank");
        this.router.get("/ranks");
        this.router.patch("/rank/:id");
        this.router.get("/rank/:id");
        this.router.post("/add-address", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.createAddress);
        this.router.get("/branches", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.getCompanyBranches);
        this.router.get("/branch/:id", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.getOneBranch);
        this.router.get("/employees", auth_middleware_1.AuthMiddleware.withRoles(['admin', 'super-admin']).verifyUser, controller_1.CompanyController.prototype.getAllEmployees);
        return this.router;
    }
}
exports.companyRoutes = new CompanyRoutes();
//# sourceMappingURL=company.routes.js.map
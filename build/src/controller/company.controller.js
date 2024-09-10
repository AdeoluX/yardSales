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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const api_response_1 = __importDefault(require("../utils/api-response"));
const company_service_1 = require("../services/company.service");
const { created, customError, ok, response, downloadFile } = api_response_1.default;
class Company {
    profileUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, firstName, lastName, middleName, no, phoneNumber, role, addressId, authorizer: { id } } = req.body;
                const result = yield company_service_1.CompanyService.prototype.profileUser({ email, firstName, lastName, middleName, no, phoneNumber, role, addressId }, id);
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, '');
            }
            catch (error) {
                next(error);
            }
        });
    }
    createAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer: { id }, country, no, state, street, town, hq, coordinates } = req.body;
                const result = yield company_service_1.CompanyService.prototype.addAddress({ country, no, state, street, town, hq, coordinates }, id);
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, result.message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getCompanyBranches(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer: { id } } = req.body;
                const result = yield company_service_1.CompanyService.prototype.getAllBranches({ companyId: id });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Branches gotten successfully');
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer: { id } } = req.body;
                const result = yield company_service_1.CompanyService.prototype.getAllEmployees({ companyId: id });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Employees gotten successfully');
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneBranch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer } = req.body;
                const { id } = req.params;
                const result = yield company_service_1.CompanyService.prototype.getOneBranch({ companyId: authorizer.id, branchId: id });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Branch gotten successfully');
            }
            catch (error) {
                next(error);
            }
        });
    }
    createDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { authorizer } = _a, rest = __rest(_a, ["authorizer"]);
                const result = yield company_service_1.CompanyService.prototype.createDepartment({
                    name: rest.name,
                    user_id: authorizer.id,
                    headOfDepartment: rest === null || rest === void 0 ? void 0 : rest.headOfDepartment
                });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Department created successfully.');
            }
            catch (error) {
                next(error);
            }
        });
    }
    downloadTemplate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { authorizer } = _a, rest = __rest(_a, ["authorizer"]);
                const result = yield company_service_1.CompanyService.prototype.downloadTemplate({ authorizer });
                return downloadFile(res, result.data, 'DepartmentTemplate.csv', 'text/csv');
            }
            catch (error) {
                next(error);
            }
        });
    }
    bulkCreateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer } = req.body;
                const file = req.files;
                const result = yield company_service_1.CompanyService.prototype.bulkCreateDepartment({
                    authorizer,
                    file: file === null || file === void 0 ? void 0 : file.departmentSheet.tempFilePath
                });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Department created successfully.');
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer } = req.body;
                const result = yield company_service_1.CompanyService.prototype.getAllDepartments({
                    authorizer
                });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Department created successfully.');
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneDepartments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer } = req.body;
                const { id } = req.params;
                const result = yield company_service_1.CompanyService.prototype.getOneDepartments({
                    authorizer,
                    department_id: id
                });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Department created successfully.');
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOneDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorizer, changes } = req.body;
                const { id } = req.params;
                const result = yield company_service_1.CompanyService.prototype.updateOneDepartment({
                    authorizer,
                    changes,
                    department_id: id
                });
                if (!result.success)
                    return customError(res, 400, result.message);
                return ok(res, result, 'Department created successfully.');
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.Company = Company;
//# sourceMappingURL=company.controller.js.map
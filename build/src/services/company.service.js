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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const user_schema_1 = require("../models/user.schema");
const company_schema_1 = require("../models/company.schema");
const userBranch_schema_1 = require("../models/userBranch.schema");
const userCompany_schema_1 = require("../models/userCompany.schema");
const address_schema_1 = require("../models/address.schema");
const companyAddress_schema_1 = require("../models/companyAddress.schema");
const department_schema_1 = require("../models/department.schema");
const json2csv_1 = __importDefault(require("json2csv"));
const csvtojson_1 = __importDefault(require("csvtojson"));
class CompanyService {
    profileUser(_a, companyId_1) {
        return __awaiter(this, arguments, void 0, function* ({ email, firstName, lastName, middleName, no, phoneNumber, role, addressId }, companyId) {
            const user = yield user_schema_1.UserModel.findOne({ email });
            if (user)
                return { success: false, message: 'User with email already exists' };
            const company = yield company_schema_1.CompanyModel.findOne({ _id: companyId });
            if (!company)
                return { success: false, message: 'Company does not exist' };
            const createUser = yield user_schema_1.UserModel.create({
                email,
                firstName,
                lastName,
                middleName,
                no,
                password: `1234567890`,
                phoneNumber,
                role,
            });
            yield userCompany_schema_1.UserCompanyModel.create({
                company: companyId,
                user: createUser._id
            });
            yield userBranch_schema_1.UserBranchModel.create({
                address: addressId,
                user: createUser._id
            });
            return {
                success: true,
                message: "User profiled in successfully."
            };
        });
    }
    addAddress(_a, companyId_1) {
        return __awaiter(this, arguments, void 0, function* ({ country, no, state, street, town, hq, coordinates }, companyId) {
            const company = yield company_schema_1.CompanyModel.findOne({ _id: companyId });
            if (!company)
                return { success: false, message: 'Company does not exist' };
            const newAddress = yield address_schema_1.AddressModel.create({
                no, state, street, town, country, coordinates
            });
            const address = yield companyAddress_schema_1.CompanyAddressModel.create({
                company: companyId,
                address: newAddress._id
            });
            return {
                success: true,
                message: "User profiled in successfully.",
                data: address
            };
        });
    }
    getAllBranches(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId }) {
            const branches = yield companyAddress_schema_1.CompanyAddressModel.find({
                company: companyId
            }).populate('address');
            return {
                success: true,
                data: branches
            };
        });
    }
    getAllEmployees(_a) {
        return __awaiter(this, arguments, void 0, function* ({ companyId }) {
            const employees = yield userCompany_schema_1.UserCompanyModel.find({
                company: companyId
            }).populate('user');
            return {
                success: true,
                data: employees
            };
        });
    }
    getOneBranch(_a) {
        return __awaiter(this, arguments, void 0, function* ({ branchId, companyId }) {
            const branch = yield companyAddress_schema_1.CompanyAddressModel.findOne({
                company: companyId,
                address: branchId
            });
            if (!branch) {
                return {
                    success: false,
                    message: 'Branch does not exist.'
                };
            }
            const employees = yield userBranch_schema_1.UserBranchModel.find({
                address: branchId
            }).populate('user');
            return {
                success: true,
                data: employees
            };
        });
    }
    createDepartment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, headOfDepartment, user_id }) {
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: user_id
            });
            const createDepartment = yield department_schema_1.DepartmentModel.create({
                name,
                headOfDepartment,
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company
            });
            return {
                success: true,
                data: createDepartment.toJSON(),
                message: "Department created Successfully",
            };
        });
    }
    downloadTemplate(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer }) {
            const { id } = authorizer;
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            });
            const departmentTemp = [
                {
                    name: "HR",
                    company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company,
                    headOfDepartment: "",
                    parentDepartment: ""
                }
            ];
            const json2csvParser = new json2csv_1.default.Parser();
            const csv = json2csvParser.parse(departmentTemp);
            return {
                success: true,
                data: csv,
            };
        });
    }
    bulkCreateDepartment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer, file }) {
            const { id } = authorizer;
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            });
            let jsonObject = yield (0, csvtojson_1.default)().fromFile(file);
            jsonObject = jsonObject.map((item) => (Object.assign(Object.assign({}, item), { company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company })));
            yield department_schema_1.DepartmentModel.insertMany(jsonObject);
            return {
                success: true,
            };
        });
    }
    getAllDepartments(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer }) {
            const { id } = authorizer;
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            });
            const allDepartments = yield department_schema_1.DepartmentModel.find({
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company
            });
            return {
                success: true,
                data: allDepartments
            };
        });
    }
    getOneDepartments(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer, department_id }) {
            const { id } = authorizer;
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            });
            const department = yield department_schema_1.DepartmentModel.findOne({
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company,
                _id: department_id
            });
            return {
                success: true,
                data: department
            };
        });
    }
    updateOneDepartment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer, department_id, changes }) {
            const { id } = authorizer;
            const userCompany = yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            });
            const department = yield department_schema_1.DepartmentModel.updateOne({
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company,
                _id: department_id
            }, {
                $set: changes
            }, {
                new: true
            });
            return {
                success: true,
                data: department
            };
        });
    }
}
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map
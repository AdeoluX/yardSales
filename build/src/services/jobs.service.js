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
exports.JobService = void 0;
const crypto_1 = require("crypto");
const addressQR_schema_1 = require("../models/addressQR.schema");
const company_schema_1 = require("../models/company.schema");
const companyAddress_schema_1 = require("../models/companyAddress.schema");
const node_cron_1 = __importDefault(require("node-cron"));
class JobService {
    static scheduler() {
        node_cron_1.default.schedule('30 05 * * *', () => __awaiter(this, void 0, void 0, function* () {
            // create address qr for all addresses for all companies
            const allCompanies = yield company_schema_1.CompanyModel.find();
            for (let item of allCompanies) {
                let allAddress = yield companyAddress_schema_1.CompanyAddressModel.find({
                    company: item._id
                });
                let addressQr = [];
                for (let address of allAddress) {
                    addressQr.push({
                        qrString: (0, crypto_1.randomUUID)(),
                        address: address.address
                    });
                }
                const addressQR_ = yield addressQR_schema_1.AddressQRModel.create({
                    addressQr,
                    company: item._id
                });
            }
        }));
    }
}
exports.JobService = JobService;
//# sourceMappingURL=jobs.service.js.map
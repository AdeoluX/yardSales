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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
// user schema
const CompanySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    addresses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Address",
        },],
    email: String,
    password: String,
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    tier: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tier",
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
CompanySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, bcrypt_1.hash)(this.password, 10);
        this.password = hashedPassword;
        next();
    });
});
CompanySchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield (0, bcrypt_1.compare)(password, this.password);
        return isValid;
    });
});
// create and export user model
exports.CompanyModel = (0, mongoose_1.model)("Company", CompanySchema);
//# sourceMappingURL=company.schema.js.map
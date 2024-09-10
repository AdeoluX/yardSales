"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyAddressModel = void 0;
const mongoose_1 = require("mongoose");
// user schema
const CompanyAddressSchema = new mongoose_1.Schema({
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// create and export user model
exports.CompanyAddressModel = (0, mongoose_1.model)("CompanyAddress", CompanyAddressSchema);
//# sourceMappingURL=companyAddress.schema.js.map
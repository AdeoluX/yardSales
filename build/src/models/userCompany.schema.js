"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCompanyModel = void 0;
const mongoose_1 = require("mongoose");
// user schema
const UserCompanySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
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
exports.UserCompanyModel = (0, mongoose_1.model)("UserCompany", UserCompanySchema);
//# sourceMappingURL=userCompany.schema.js.map
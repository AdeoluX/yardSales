"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBranchModel = void 0;
const mongoose_1 = require("mongoose");
// user schema
const UserBranchSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// create and export user model
exports.UserBranchModel = (0, mongoose_1.model)("UserBranch", UserBranchSchema);
//# sourceMappingURL=userBranch.schema.js.map
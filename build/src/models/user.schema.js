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
exports.UserModel = void 0;
const bcrypt_1 = require("bcrypt");
const mongoose_1 = require("mongoose");
const leaveBalance_schema_1 = require("./leaveBalance.schema");
// user schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: String,
    email: String,
    password: {
        type: String,
        select: false
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    no: String,
    role: {
        type: String,
        enum: ["super-admin", "admin", "employee"]
    },
    rank: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Rank' },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' },
    manager: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive",
    },
    leaveBalances: { type: [leaveBalance_schema_1.LeaveBalanceSchema], default: [] }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
UserSchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield (0, bcrypt_1.compare)(password, this.password);
        return isValid;
    });
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, bcrypt_1.hash)(this.password, 10);
        this.password = hashedPassword;
        next();
    });
});
// create and export user model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.schema.js.map
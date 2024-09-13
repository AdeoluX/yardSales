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
// User schema
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    middleName: String,
    token: String,
    email: String,
    password: {
        type: String,
        // select: false,
    },
    phoneNumber: {
        type: String,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
});
// Virtual field: isComplete
UserSchema.virtual("isComplete").get(function () {
    return !!(this.phoneNumber && this.firstName && this.lastName);
});
// Method to check if password is valid
UserSchema.method("isValidPassword", function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield (0, bcrypt_1.compare)(password, this.password);
        return isValid;
    });
});
// Pre-save hook to hash password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const hashedPassword = yield (0, bcrypt_1.hash)(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    });
});
// Create and export user model
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.schema.js.map
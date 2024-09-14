"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
// User schema
const OtpSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User"
    },
    otp: {
        type: String,
    },
    used: {
        type: Boolean,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
});
// Create and export user model
exports.OtpModel = (0, mongoose_1.model)("Otp", OtpSchema);
//# sourceMappingURL=otp.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
// User schema
const TransactionSchema = new mongoose_1.Schema({
    order: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Order"
    },
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Order"
    },
    status: {
        type: String,
        enum: ["processing", "failed", "success", "abadoned"],
        default: "processing"
    },
    currency: {
        type: String,
        enum: ["NGN", "USD"],
        default: "NGN"
    },
    reference: String,
    amount: Number
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
});
// Create and export user model
exports.TransactionModel = (0, mongoose_1.model)("Transaction", TransactionSchema);
//# sourceMappingURL=transaction.schema.js.map
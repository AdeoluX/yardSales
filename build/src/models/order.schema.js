"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
// User schema
const OrderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User"
    },
    product: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Product"
    },
    status: {
        type: String,
        enum: ["processing", "dilivered"],
        default: "processing"
    },
    quantity: Number
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
});
// Create and export user model
exports.OrderModel = (0, mongoose_1.model)("Order", OrderSchema);
//# sourceMappingURL=order.schema.js.map
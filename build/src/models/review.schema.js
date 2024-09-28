"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
// User schema
const ReviewSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.ObjectId,
        ref: "Product"
    },
    user: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
    },
    rating: {
        type: Number,
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
exports.ReviewModel = (0, mongoose_1.model)("Review", ReviewSchema);
//# sourceMappingURL=review.schema.js.map
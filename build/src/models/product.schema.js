"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
// User schema
const ProductSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    currency: {
        type: String,
    },
    image: {
        type: mongoose_1.Schema.Types.Mixed, // Allow image to be a string or an array of strings
        validate: {
            validator: function (value) {
                return typeof value === "string" || (Array.isArray(value) && value.every(item => typeof item === "string"));
            },
            message: "Image must be a string or an array of strings",
        },
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["gift", "gadget", "fashion", "food", "others"], // Enum for product categories
        required: true,
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: { virtuals: true }, // Enable virtuals to be included in JSON output
    toObject: { virtuals: true }, // Enable virtuals to be included when converting to objects
});
// Create and export user model
exports.ProductModel = (0, mongoose_1.model)("Product", ProductSchema);
//# sourceMappingURL=product.schema.js.map
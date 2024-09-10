"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TierModel = void 0;
const mongoose_1 = require("mongoose");
// tier schema
const TierSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        enum: ["free", "silver", "premium"],
    },
    minEmployees: {
        type: Number,
        required: true,
    },
    maxEmployees: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// create and export tier model
exports.TierModel = (0, mongoose_1.model)("Tier", TierSchema);
//# sourceMappingURL=tier.schema.js.map
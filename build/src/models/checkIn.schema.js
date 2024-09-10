"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInModel = void 0;
const mongoose_1 = require("mongoose");
// Schema for CheckIn
const CheckInSchema = new mongoose_1.Schema({
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
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    qrString: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere", // Geospatial index for location-based queries
        required: true,
    },
    proximity: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// Create and export the CheckIn model
exports.CheckInModel = (0, mongoose_1.model)("CheckIn", CheckInSchema);
//# sourceMappingURL=checkIn.schema.js.map
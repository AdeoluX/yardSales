"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressQRModel = void 0;
const mongoose_1 = require("mongoose");
// Sub-schema for addressQr array
const AddressQRItemSchema = new mongoose_1.Schema({
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    qrString: {
        type: String,
        required: true,
    },
});
// Main schema for AddressQR
const AddressQRSchema = new mongoose_1.Schema({
    addressQr: {
        type: [AddressQRItemSchema],
        required: true,
    },
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// Create and export AddressQR model
exports.AddressQRModel = (0, mongoose_1.model)("AddressQR", AddressQRSchema);
//# sourceMappingURL=addressQR.schema.js.map
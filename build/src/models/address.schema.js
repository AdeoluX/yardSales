"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressModel = void 0;
const mongoose_1 = require("mongoose");
// address schema
const AddressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    no: {
        type: String,
        required: true,
    },
    town: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    hq: {
        type: Boolean,
        default: false,
        required: true,
    },
    coordinates: {
        type: [Number], // Longitude, Latitude
        index: '2dsphere' // Create a 2dsphere index
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
// create and export address model
exports.AddressModel = (0, mongoose_1.model)("Address", AddressSchema);
//# sourceMappingURL=address.schema.js.map
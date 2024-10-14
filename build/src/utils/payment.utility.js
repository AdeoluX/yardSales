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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiateCharge = void 0;
const axios_1 = __importDefault(require("axios"));
// Paystack Secret Key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
// Base URL for Paystack API
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
// Interface for the initiation of a transaction
// Interface for the response from Paystack after initializing a transaction
// Function to initialize a Paystack transaction
const initiateCharge = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email = "", amount, callbackUrl = 'https://www.google.com', reference, }) {
    var _b, _c;
    try {
        const response = yield axios_1.default.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
            email,
            amount: amount * 100, // Convert amount to kobo
            callback_url: callbackUrl,
            reference,
        }, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Returns the data with the payment URL to redirect to
    }
    catch (error) {
        throw new Error(`Payment Initialization Failed: ${(_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message}`);
    }
});
exports.initiateCharge = initiateCharge;
// Function to verify a Paystack transaction
const verifyPayment = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const response = yield axios_1.default.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Returns the transaction verification details
    }
    catch (error) {
        throw new Error(`Payment Verification Failed: ${(_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message}`);
    }
});
exports.verifyPayment = verifyPayment;
//# sourceMappingURL=payment.utility.js.map
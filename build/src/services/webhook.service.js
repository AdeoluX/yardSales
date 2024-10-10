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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookService = void 0;
const transaction_schema_1 = require("../models/transaction.schema");
const order_schema_1 = require("../models/order.schema");
const product_schema_1 = require("../models/product.schema");
class WebHookService {
    purchaseWebhook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = payload;
            // Check if the event is a charge success event
            if (payload.event === 'charge.success') {
                const r = yield this.processSuccessfulCharge(data);
                return;
            }
        });
    }
    processSuccessfulCharge(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { amount } = data;
            //get transactions
            const transaction = yield transaction_schema_1.TransactionModel.findOne({
                reference: data.reference
            });
            if (!transaction || transaction.status !== 'processing') {
                return;
            }
            //get order
            const order = yield order_schema_1.OrderModel.findById(transaction === null || transaction === void 0 ? void 0 : transaction.order);
            //get product
            const product = yield product_schema_1.ProductModel.findById(order === null || order === void 0 ? void 0 : order.product);
            const quantityPurchased = Number(amount / 100) / Number(product === null || product === void 0 ? void 0 : product.price);
            if (product.quantity < quantityPurchased) {
                return;
            }
            yield product_schema_1.ProductModel.updateOne({ _id: product._id }, { quantity: Number(product === null || product === void 0 ? void 0 : product.quantity) - Number(quantityPurchased) });
            yield transaction_schema_1.TransactionModel.updateOne({
                _id: transaction === null || transaction === void 0 ? void 0 : transaction._id
            }, {
                status: 'success'
            });
            //send email or PN to user of the product
            return;
        });
    }
}
exports.WebHookService = WebHookService;
//# sourceMappingURL=webhook.service.js.map
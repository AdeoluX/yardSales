"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceModel = exports.LeaveBalanceSchema = void 0;
const mongoose_1 = require("mongoose");
// user schema
exports.LeaveBalanceSchema = new mongoose_1.Schema({
    leaveType: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
    balance: { type: Number, required: true, default: 0 },
});
// create and export user model
exports.LeaveBalanceModel = (0, mongoose_1.model)("LeaveBalance", exports.LeaveBalanceSchema);
//# sourceMappingURL=leaveBalance.schema.js.map
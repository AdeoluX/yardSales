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
exports.UserController = void 0;
const api_response_1 = __importDefault(require("../utils/api-response"));
const user_service_1 = require("../services/user.service");
const error_handler_1 = require("../utils/error-handler");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const { created, customError, ok, response } = api_response_1.default;
class UserController {
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, token, data } = yield user_service_1.UserService.prototype.getUser(payload.authorizer);
                if (!success)
                    throw new error_handler_1.NotAuthorizedError(message !== null && message !== void 0 ? message : 'Unauthorized user');
                return ok(res, data, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUserLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const { success, message, token, data } = yield user_service_1.UserService.prototype.updateUserLocation(payload);
                if (!success)
                    return customError(res, 400, message);
                return ok(res, data, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    uploadProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let payload = req.body;
                let image;
                if (Array.isArray((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.image)) {
                    image = req.files.image.map(item => item.tempFilePath);
                }
                else {
                    image = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                }
                const { success, message, token, data } = yield user_service_1.UserService.prototype.uploadProduct(Object.assign(Object.assign({}, payload), { image }));
                if (!success)
                    return customError(res, 400, message);
                return ok(res, { data }, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    reviewProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let payload = req.body;
                payload = Object.assign({ product: id }, payload);
                const { success, message, token, data } = yield user_service_1.UserService.prototype.reviewProduct(payload);
                if (!success)
                    return customError(res, 400, message);
                return ok(res, { data }, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    viewProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { success, message, token, data, options } = yield user_service_1.UserService.prototype.viewProduct(id);
                if (!success)
                    return customError(res, 404, message);
                return ok(res, Object.assign({ data }, options), message);
            }
            catch (error) {
            }
        });
    }
    viewProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const { category } = req.params;
                const paginate = helper_utils_1.default.paginateOptions(query);
                const { success, message, token, data, options } = yield user_service_1.UserService.prototype.viewProducts({ query: Object.assign(Object.assign({}, query), paginate), params: category });
                if (!success)
                    return customError(res, 400, message);
                return ok(res, Object.assign({ data }, options), message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    seedUserAndProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { success, message, token, data } = yield user_service_1.UserService.prototype.seedUserAndProducts();
                if (!success)
                    throw new error_handler_1.NotAuthorizedError(message !== null && message !== void 0 ? message : 'Unauthorized user');
                return ok(res, data, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    productsNearby(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query;
                const { category } = req.params;
                const { authorizer } = req.body;
                const paginate = helper_utils_1.default.paginateOptions(query);
                const { success, message, token, data } = yield user_service_1.UserService.prototype.productsNearby({ query: Object.assign(Object.assign({}, query), paginate), params: category, authorizer });
                if (!success)
                    return customError(res, 400, message);
                return ok(res, { data }, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
    purchaseProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_id, quantity, authorizer } = req.body;
                const { success, message, data } = yield user_service_1.UserService.prototype.purchaseProduct({
                    quantity, product_id, user_id: authorizer.id
                });
                if (!success)
                    return customError(res, 400, message);
                return ok(res, { data }, message);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
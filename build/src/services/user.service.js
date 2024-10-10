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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose"); // Import to use transactions
const user_schema_1 = require("../models/user.schema");
const product_schema_1 = require("../models/product.schema");
const review_schema_1 = require("../models/review.schema");
const cloudinary_1 = require("../utils/cloudinary");
const order_schema_1 = require("../models/order.schema");
const transaction_schema_1 = require("../models/transaction.schema");
const helper_utils_1 = __importDefault(require("../utils/helper.utils"));
const payment_utility_1 = require("../utils/payment.utility");
class UserService {
    getUser(authorizer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = authorizer;
            const user = user_schema_1.UserModel.findOne({ _id: id });
            if (!user)
                return {
                    success: false,
                    message: 'Unauthorized access'
                };
            return {
                success: true,
                message: "Success",
                data: user
            };
        });
    }
    seedUserAndProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser = yield user_schema_1.UserModel.findOne({
                email: "d1headphones@gmail.com",
            });
            if (!newUser) {
                newUser = yield user_schema_1.UserModel.create({
                    firstName: "Test",
                    lastName: "Tester",
                    middleName: "Testerer",
                    email: "d1headphones@gmail.com",
                    phoneNumber: "23408089344676",
                    isComplete: true,
                    location: {
                        "type": "Point",
                        "coordinates": [3.3792, 6.5244]
                    }
                });
            }
            yield product_schema_1.ProductModel.deleteMany({
                user_id: newUser._id
            });
            yield product_schema_1.ProductModel.insertMany([
                {
                    user_id: newUser._id,
                    name: "Nike Air Max 270",
                    price: 45000,
                    currency: "NGN",
                    quantity: 10,
                    image: "https://res.cloudinary.com/jakin/image/upload/v1727556056/products/NIKE_rmprlu.jpg",
                    category: 'fashion'
                },
                {
                    user_id: newUser._id,
                    "name": "Apple iPhone 13",
                    "price": 450000,
                    "currency": "NGN",
                    quantity: 20,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/Iphone_13_sgxs2a.jpg",
                    category: 'gadget'
                },
                {
                    user_id: newUser._id,
                    "name": "Samsung 55\" 4K TV",
                    "price": 230000,
                    "currency": "NGN",
                    quantity: 5,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/Samsung_55_TV_e9yflu.jpg",
                    category: 'gadget'
                },
                {
                    user_id: newUser._id,
                    "name": "PlayStation 5",
                    "price": 300000,
                    "currency": "NGN",
                    quantity: 10,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/ps_5_b6zjr9.webp",
                    category: 'gadget'
                },
                {
                    user_id: newUser._id,
                    "name": "LG Washing Machine",
                    "price": 150000,
                    "currency": "NGN",
                    quantity: 15,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/LG_washing_machine_d43gnq.jpg",
                    category: 'gadget'
                },
                {
                    user_id: newUser._id,
                    "name": "Adidas Ultraboost",
                    "price": 38000,
                    "currency": "NGN",
                    quantity: 25,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/addiddas_o6ogwr.jpg",
                    category: 'fashion'
                },
                {
                    user_id: newUser._id,
                    "name": "HP LaserJet Printer",
                    "price": 85000,
                    "currency": "NGN",
                    quantity: 25,
                    "image": "https://res.cloudinary.com/jakin/image/upload/v1727556512/hp_printer_egwjbf.jpg",
                    category: 'gadget'
                }
            ]);
            return {
                success: true,
                message: "Seeded successfully."
            };
        });
    }
    viewProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ params = null, query }) {
            const searchQuery = Object.assign(Object.assign(Object.assign({}, (((query === null || query === void 0 ? void 0 : query.startDate) && (query === null || query === void 0 ? void 0 : query.endDate)) && { createdAt: {
                    $gte: new Date(query.startDate),
                    $lte: new Date(query.endDate)
                } })), ((query === null || query === void 0 ? void 0 : query.search) && { name: { $regex: query.search, $options: 'i' } })), (params && { category: params }));
            const products = yield product_schema_1.ProductModel.find(searchQuery)
                .skip(query === null || query === void 0 ? void 0 : query.skip) // Skip the number of documents
                .limit(query.perPage) // Limit the number of documents returned
                .exec();
            const countProducts = yield product_schema_1.ProductModel.countDocuments(searchQuery);
            return {
                success: true,
                message: "Products gotten successfully",
                data: products,
                options: {
                    currentPage: query.page,
                    totalCount: countProducts,
                    totalPages: Math.ceil(countProducts / query.perPage)
                }
            };
        });
    }
    productsNearby(_a) {
        return __awaiter(this, arguments, void 0, function* ({ authorizer, query, params = null }) {
            var _b, _c, _d, _e;
            const { id } = authorizer;
            const user = yield user_schema_1.UserModel.findById(id);
            let selectQuery = {
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [(_c = (_b = user === null || user === void 0 ? void 0 : user.location) === null || _b === void 0 ? void 0 : _b.coordinates) === null || _c === void 0 ? void 0 : _c[0], (_e = (_d = user === null || user === void 0 ? void 0 : user.location) === null || _d === void 0 ? void 0 : _d.coordinates) === null || _e === void 0 ? void 0 : _e[1]] // Coordinates as [longitude, latitude]
                        },
                        $maxDistance: 3000 // Search within this distance in meters
                    }
                }
            };
            const nearbyUsers = yield user_schema_1.UserModel.find(selectQuery).select('_id');
            const userIds = nearbyUsers.map(user => user._id.toString());
            const products = yield product_schema_1.ProductModel.find(Object.assign(Object.assign(Object.assign({ user_id: { $in: userIds } }, (((query === null || query === void 0 ? void 0 : query.startDate) && (query === null || query === void 0 ? void 0 : query.endDate)) && { createdAt: {
                    $gte: new Date(query.startDate),
                    $lte: new Date(query.endDate)
                } })), (params && { category: params })), ((query === null || query === void 0 ? void 0 : query.search) && { name: { $regex: query.search, $options: 'i' } }))).skip(query === null || query === void 0 ? void 0 : query.skip) // Skip the number of documents
                .limit(query.perPage) // Limit the number of documents returned
                .exec(); // Optionally populate user details
            console.log(products);
            return {
                success: true,
                message: "Products gotten successfully.",
                data: products
            };
        });
    }
    viewProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const product = yield product_schema_1.ProductModel.findById(id);
            if (!product)
                return {
                    success: false,
                    message: 'Product not found'
                };
            const reviews = yield review_schema_1.ReviewModel.find({
                product: id
            });
            const reviewCount = yield review_schema_1.ReviewModel.countDocuments({
                product: id
            });
            const ratingsSum = yield review_schema_1.ReviewModel.aggregate([
                {
                    $group: {
                        _id: null, // Group all documents (null groups them all)
                        totalRatings: { $sum: "$rating" } // Sum the salary field
                    }
                }
            ]);
            const sumOfRatings = (_a = ratingsSum[0]) === null || _a === void 0 ? void 0 : _a.totalRatings;
            return {
                success: true,
                data: product,
                options: { reviews, averageRatings: sumOfRatings / reviewCount }
            };
        });
    }
    reviewProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { comment, rating, authorizer, product } = payload;
            const { id } = authorizer;
            let review = yield review_schema_1.ReviewModel.findOne({
                user: id,
                product
            });
            if (review) {
                yield review_schema_1.ReviewModel.deleteOne({
                    user: id,
                    product
                });
            }
            review = yield review_schema_1.ReviewModel.create({
                comment, rating, user: id, product
            });
            return {
                success: true,
                data: { review: review.toJSON() }
            };
        });
    }
    uploadProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authorizer } = payload, rest = __rest(payload, ["authorizer"]);
            const { id } = authorizer;
            const user = yield user_schema_1.UserModel.findById(id);
            if (!user)
                return {
                    success: false,
                    message: "User not found."
                };
            const folder = 'products';
            let image;
            if (Array.isArray(rest === null || rest === void 0 ? void 0 : rest.image)) {
                image = [];
                for (let item of rest.image) {
                    const secureUrl = yield (0, cloudinary_1.uploadImage)(item, folder);
                    image.push(secureUrl);
                }
            }
            else {
                image = yield (0, cloudinary_1.uploadImage)(rest.image, folder);
            }
            const product = yield product_schema_1.ProductModel.create(Object.assign(Object.assign({}, rest), { image, user_id: id }));
            return {
                success: true,
                message: "Product created successfully",
                data: product.toJSON()
            };
        });
    }
    updateUserLocation(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = payload.authorizer;
            const { authorizer } = payload, rest = __rest(payload, ["authorizer"]);
            const user = yield user_schema_1.UserModel.findById(id);
            if (!user)
                return {
                    success: false,
                    message: "User does not exist."
                };
            const newUser = yield user_schema_1.UserModel.findOneAndUpdate({ _id: id }, { location: rest }, { new: true });
            return {
                success: true,
                message: "Location added successfully",
                data: { data: newUser === null || newUser === void 0 ? void 0 : newUser.toJSON() }
            };
        });
    }
    purchaseProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id, quantity, user_id } = payload;
            const session = yield (0, mongoose_1.startSession)(); // Start a session for the transaction
            session.startTransaction(); // Begin the transaction
            try {
                // Fetch Product
                const product = yield product_schema_1.ProductModel.findById(product_id).session(session);
                if (!product) {
                    yield session.abortTransaction(); // Abort the transaction
                    session.endSession();
                    return {
                        success: false,
                        message: "Invalid product."
                    };
                }
                // Check product stock
                if (product.quantity < quantity) {
                    yield session.abortTransaction(); // Abort the transaction
                    session.endSession();
                    return {
                        success: false,
                        message: `Insufficient number of ${product.name}(s) to execute order.`
                    };
                }
                // Fetch User
                const user = yield user_schema_1.UserModel.findById(user_id).session(session);
                if (!user) {
                    yield session.abortTransaction(); // Abort the transaction
                    session.endSession();
                    return {
                        success: false,
                        message: "Invalid user."
                    };
                }
                const email = user.email;
                const amount = product.price * quantity;
                const reference = `yord-${helper_utils_1.default.generateString({ alpha: true, number: true })}`;
                // Create Order
                const order = yield order_schema_1.OrderModel.create([{
                        user: user_id,
                        product: product_id,
                        quantity
                    }], { session });
                // Update product quantity
                product.quantity -= quantity;
                yield product.save({ session });
                // Create Transaction
                yield transaction_schema_1.TransactionModel.create([{
                        order: order[0]._id,
                        amount,
                        user: user_id,
                        reference
                    }], { session });
                // Commit the transaction before the external API call
                yield session.commitTransaction();
                session.endSession();
                // Initiate charge (outside transaction as this is an external API call)
                const charge = yield (0, payment_utility_1.initiateCharge)({
                    email,
                    amount,
                    reference
                });
                return {
                    success: true,
                    message: "Charge initiated.",
                    data: { paymentLink: charge.data.authorization_url }
                };
            }
            catch (error) {
                // Rollback the transaction in case of any failure
                yield session.abortTransaction();
                session.endSession();
                console.error("Error during purchase: ", error);
                return {
                    success: false,
                    message: "Purchase failed. Please try again."
                };
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
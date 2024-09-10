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
exports.UserService = void 0;
const userBranch_schema_1 = require("../models/userBranch.schema");
const userCompany_schema_1 = require("../models/userCompany.schema");
const address_schema_1 = require("../models/address.schema");
const addressQR_schema_1 = require("../models/addressQR.schema");
const checkIn_schema_1 = require("../models/checkIn.schema");
const moment_1 = __importDefault(require("moment"));
class UserService {
    checkIn(_a) {
        return __awaiter(this, arguments, void 0, function* ({ coordinates, qrString, authorizer }) {
            var _b, _c, _d;
            // const user: IUser | null = await UserModel.findOne({ email });
            //get addressQr
            const now = (0, moment_1.default)();
            if (now.isSameOrAfter((0, moment_1.default)().startOf('day').hour(10)))
                return {
                    success: false,
                    message: "No checkins after 10am.",
                };
            const { id } = authorizer;
            const userCompany = (_b = (yield userCompany_schema_1.UserCompanyModel.findOne({
                user: id
            }).populate('company').populate('user'))) === null || _b === void 0 ? void 0 : _b.toJSON();
            const userAddress = (_c = (yield userBranch_schema_1.UserBranchModel.findOne({
                user: id
            }).populate('address'))) === null || _c === void 0 ? void 0 : _c.toJSON();
            if (!userAddress) {
                return {
                    success: false,
                    message: "Invalid Qr and/or address.",
                };
            }
            const addressQR = (_d = (yield addressQR_schema_1.AddressQRModel.findOne({
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company._id
            }).sort({ createdAt: -1 }).exec())) === null || _d === void 0 ? void 0 : _d.toJSON();
            if (!addressQR) {
                return {
                    success: false,
                    message: "Invalid Qr and/or address.",
                };
            }
            const array = addressQR === null || addressQR === void 0 ? void 0 : addressQR.addressQr;
            const addressOfInterest = array.find((item) => {
                return (item.address.toString() === userAddress.address._id.toString() &&
                    item.qrString === qrString);
            });
            if (!addressOfInterest) {
                return {
                    success: false,
                    message: "Invalid Qr and/or address.",
                };
            }
            // code to find if client is with proximity to his branch address
            const address = yield address_schema_1.AddressModel.findOne({ _id: addressOfInterest.address });
            if (!address) {
                return {
                    success: false,
                    message: "Invalid Qr and/or address.",
                };
            }
            // Proximity check logic
            const [longitude, latitude] = coordinates; // User's current location
            const [branchLongitude, branchLatitude] = address.coordinates; // Branch address coordinates
            const maxDistance = 1000;
            const isWithinProximity = this.isWithinProximity([longitude, latitude], [branchLongitude, branchLatitude], maxDistance);
            if (!isWithinProximity) {
                return {
                    success: false,
                    message: "User is not within the required proximity to the branch address.",
                };
            }
            yield checkIn_schema_1.CheckInModel.create({
                user: id,
                address: address._id,
                company: userCompany === null || userCompany === void 0 ? void 0 : userCompany.company._id,
                qrString,
                coordinates,
                proximity: isWithinProximity
            });
            return {
                success: true,
                message: "User checked in successfully.",
            };
        });
    }
    isWithinProximity(currentCoords, branchCoords, maxDistance) {
        const [currentLongitude, currentLatitude] = currentCoords;
        const [branchLongitude, branchLatitude] = branchCoords;
        const earthRadius = 6371e3; // Earth's radius in meters
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
        const dLatitude = toRadians(branchLatitude - currentLatitude);
        const dLongitude = toRadians(branchLongitude - currentLongitude);
        const a = Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
            Math.cos(toRadians(currentLatitude)) *
                Math.cos(toRadians(branchLatitude)) *
                Math.sin(dLongitude / 2) *
                Math.sin(dLongitude / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c; // Distance in meters
        return distance <= maxDistance;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
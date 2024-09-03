import {Icheckin, ServiceRes} from"./types/auth.types";
import { IUserBranch, UserBranchModel } from "../models/userBranch.schema";
import { IUserCompany, UserCompanyModel } from "../models/userCompany.schema";
import { AddressModel, IAddress } from "../models/address.schema";
import { AddressQRModel } from "../models/addressQR.schema";
import { CheckInModel } from "../models/checkIn.schema";
import moment from 'moment';
export class UserService {
    public async checkIn({coordinates, qrString, authorizer}: Icheckin): Promise<ServiceRes> {
        // const user: IUser | null = await UserModel.findOne({ email });
        //get addressQr
        const now = moment()
        if(now.isSameOrAfter(moment().startOf('day').hour(10))) return {
            success: false,
            message: "No checkins after 10am.",
        };
        const {id} = authorizer;
        const userCompany = (await UserCompanyModel.findOne({
            user: id
        }).populate('company').populate('user'))?.toJSON()

        const userAddress = (await UserBranchModel.findOne({
            user: id
        }).populate('address'))?.toJSON()

        if (!userAddress) {
            return {
                success: false,
                message: "Invalid Qr and/or address.",
            };
        }

        const addressQR = (await AddressQRModel.findOne({
            company: userCompany?.company._id
        }).sort({ createdAt: -1 }).exec())?.toJSON()

        if(!addressQR){
            return {
                success: false,
                message: "Invalid Qr and/or address.",
            };
        }

        const array = addressQR?.addressQr

        const addressOfInterest = array.find((item) => {
            return (
              item.address.toString() === userAddress.address._id.toString() &&
              item.qrString === qrString
            );
        });

        if(!addressOfInterest){
            return {
                success: false,
                message: "Invalid Qr and/or address.",
            };
        }
        // code to find if client is with proximity to his branch address

        const address = await AddressModel.findOne({ _id:addressOfInterest.address })

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

        await CheckInModel.create({
            user: id,
            address: address._id,
            company: userCompany?.company._id,
            qrString,
            coordinates,
            proximity: isWithinProximity
        })

        return {
        success: true,
        message: "User checked in successfully.",
        };
    }

    private isWithinProximity(currentCoords: number[], branchCoords: number[], maxDistance: number): boolean {
        const [currentLongitude, currentLatitude] = currentCoords;
        const [branchLongitude, branchLatitude] = branchCoords;
      
        const earthRadius = 6371e3; // Earth's radius in meters
      
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
      
        const dLatitude = toRadians(branchLatitude - currentLatitude);
        const dLongitude = toRadians(branchLongitude - currentLongitude);
      
        const a =
          Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
          Math.cos(toRadians(currentLatitude)) *
            Math.cos(toRadians(branchLatitude)) *
            Math.sin(dLongitude / 2) *
            Math.sin(dLongitude / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadius * c; // Distance in meters
      
        return distance <= maxDistance;
    }
}
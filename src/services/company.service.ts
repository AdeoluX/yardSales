import { IUser, UserModel } from "../models/user.schema";
import Utils from "../utils/helper.utils"
import {IAddressPayload, IprofileUser, ServiceRes} from"./types/auth.types"
import { CompanyModel, ICompany } from "../models/company.schema";
import { IUserBranch, UserBranchModel } from "../models/userBranch.schema";
import { IUserCompany, UserCompanyModel } from "../models/userCompany.schema";
import { AddressModel, IAddress } from "../models/address.schema";
import { CompanyAddressModel, ICompanyAddress } from "../models/companyAddress.schema";
import { hash } from "bcrypt";
export class CompanyService {
    public async profileUser({email, firstName, lastName, middleName, no, phoneNumber, role, addressId}: IprofileUser, companyId: string): Promise<ServiceRes> {
        const user: IUser | null = await UserModel.findOne({ email });
        if(user) return {success: false, message: 'User with email already exists'}
        const company: ICompany | null = await CompanyModel.findOne({ _id: companyId })
        if(!company) return {success: false, message: 'Company does not exist'}
        const createUser = await UserModel.create({
            email,
            firstName,
            lastName,
            middleName,
            no,
            password: `1234567890`,
            phoneNumber,
            role,
        })
        await UserCompanyModel.create({
            company: companyId,
            user: createUser._id
        })
        await UserBranchModel.create({
            address: addressId,
            user: createUser._id
        })
        return {
            success: true,
            message: "User profiled in successfully."
        };
    }
    public async addAddress({country, no, state, street, town, hq, coordinates}: IAddressPayload, companyId: string): Promise<ServiceRes> {
        const company: ICompany | null  = await CompanyModel.findOne({_id: companyId})
        if(!company) return {success: false, message: 'Company does not exist'}
        const newAddress: IAddress | null = await AddressModel.create({
            no, state, street, town, country, coordinates
        })
        const address = await CompanyAddressModel.create({
            company: companyId,
            address: newAddress._id
        })
        return {
            success: true,
            message: "User profiled in successfully.",
            data: address
        };
    }
    public async getAllBranches({ companyId }: {companyId: string}): Promise<ServiceRes> {
        const branches: Array<any> | null = await CompanyAddressModel.find({
            company: companyId
        }).populate('address')
        return {
            success: true,
            data: branches
        }
    }
    public async getAllEmployees({companyId}: {companyId: string}): Promise<ServiceRes>{
        const employees: Array<IUserCompany> | null = await UserCompanyModel.find({
            company: companyId
        }).populate('user')
        return {
            success: true,
            data: employees
        }
    }
    public async getOneBranch({branchId, companyId}: {branchId: string, companyId: string}): Promise<ServiceRes>{
        const branch: ICompanyAddress | null = await CompanyAddressModel.findOne({
            company: companyId,
            address: branchId
        })
        if(!branch){
            return {
                success: false,
                message: 'Branch does not exist.'
            }
        }
        const employees: Array<IUserBranch> | null = await UserBranchModel.find({
            address: branchId
        }).populate('user')
        return {
            success: true,
            data: employees
        }
    }
}
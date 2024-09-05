import { IUser, UserModel } from "../models/user.schema";
import Utils from "../utils/helper.utils"
import {AuthPayload, IAddressPayload, IprofileUser, ServiceRes} from"./types/auth.types"
import { CompanyModel, ICompany } from "../models/company.schema";
import { IUserBranch, UserBranchModel } from "../models/userBranch.schema";
import { IUserCompany, UserCompanyModel } from "../models/userCompany.schema";
import { AddressModel, IAddress } from "../models/address.schema";
import { CompanyAddressModel, ICompanyAddress } from "../models/companyAddress.schema";
import { hash } from "bcrypt";
import { DepartmentModel } from "../models/department.schema";
import jsonToCsv from "json2csv";
import csvToJson from "csvtojson"
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
    public async createDepartment ({name, headOfDepartment, user_id}:{name: string, headOfDepartment?: string, user_id: string}): Promise<ServiceRes>{
        const userCompany = await UserCompanyModel.findOne({
            user: user_id
        })

        const createDepartment = await DepartmentModel.create({
            name,
            headOfDepartment,
            company: userCompany?.company
        })

        return {
            success: true,
            data: createDepartment.toJSON(),
            message: "Department created Successfully",
        }
    }
    public async downloadTemplate ({authorizer}:{authorizer: AuthPayload}): Promise<ServiceRes>{
        const { id } = authorizer;
        const userCompany = await UserCompanyModel.findOne({
            user: id
        })
        const departmentTemp = [
            {
                name: "HR",
                company: userCompany?.company,
                headOfDepartment: "",
                parentDepartment: ""
            }
        ]
        const json2csvParser = new jsonToCsv.Parser();
        const csv = json2csvParser.parse(departmentTemp);
        return {
            success: true,
            data: csv,
        }
    }
    public async bulkCreateDepartment ({ authorizer, file }: {authorizer: AuthPayload; file: any}): Promise<ServiceRes>{
        const { id } = authorizer;

        const userCompany = await UserCompanyModel.findOne({
            user: id
        })

        let jsonObject = await csvToJson().fromFile(file)

        jsonObject = jsonObject.map((item) => ({
            ...item,
            company: userCompany?.company
        }))

        await DepartmentModel.insertMany(jsonObject)

        return {
            success: true,
        }
    }
    public async getAllDepartments ({authorizer}: {authorizer: AuthPayload}) : Promise<ServiceRes>{
        const { id } = authorizer;

        const userCompany = await UserCompanyModel.findOne({
            user: id
        })

        const allDepartments = await DepartmentModel.find({
            company: userCompany?.company
        })

        return {
            success: true,
            data: allDepartments
        }
    }
    public async getOneDepartments ({authorizer, department_id}: {authorizer: AuthPayload; department_id: string;}) : Promise<ServiceRes>{
        const { id } = authorizer;

        const userCompany = await UserCompanyModel.findOne({
            user: id
        })

        const department = await DepartmentModel.findOne({
            company: userCompany?.company,
            _id: department_id
        })

        return {
            success: true,
            data: department
        }
    }
    
    public async updateOneDepartment ({authorizer, department_id, changes}: {authorizer: AuthPayload; department_id: string; changes: any}): Promise<ServiceRes>{
        const { id } = authorizer;

        const userCompany = await UserCompanyModel.findOne({
            user: id
        })
        const department = await DepartmentModel.updateOne({
            company: userCompany?.company,
            _id: department_id
        }, {
            $set: changes
        },{
            new: true
        })

        return {
            success: true,
            data: department
        }
    }
}
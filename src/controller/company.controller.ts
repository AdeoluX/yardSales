import { NextFunction, Request, Response } from "express";
import ApiResponse from '../utils/api-response'
import { CompanyService } from "../services/company.service";
import { IAddressPayload, IprofileUser } from "../services/types/auth.types";
const { created, customError, ok, response } = ApiResponse;
export class Company{
    
    public async profileUser(req: Request, res: Response, next: NextFunction ){
        try{
            const {email, firstName, lastName, middleName, no, phoneNumber, role, addressId, authorizer: {id}}: IprofileUser = req.body;
            const result = await CompanyService.prototype.profileUser({email, firstName, lastName, middleName, no, phoneNumber, role, addressId}, id)
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, '')
        }catch(error){
            next(error)
        }
    }

    public async createAddress(req: Request, res: Response, next: NextFunction){
        try{
            const {authorizer: {id}, country, no, state, street, town, hq, coordinates}: IAddressPayload = req.body;
            const result = await CompanyService.prototype.addAddress({country, no, state, street, town, hq, coordinates}, id)
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, result.message)
        }catch(error){
            next(error)
        }
    }

    public async getCompanyBranches(req: Request, res: Response, next: NextFunction){
        try{
            const {authorizer: {id}} = req.body
            const result = await CompanyService.prototype.getAllBranches({companyId: id})
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Branches gotten successfully')
        }catch(error){
            next(error)
        }
    }

    public async getAllEmployees(req: Request, res: Response, next: NextFunction){
        try{
            const {authorizer: {id}} = req.body
            const result = await CompanyService.prototype.getAllEmployees({companyId: id})
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Employees gotten successfully')
        }catch(error){
            next(error)
        }
    }

    public async getOneBranch(req: Request, res: Response, next: NextFunction){
        try{
            const {authorizer} = req.body
            const {id} = req.params
            const result = await CompanyService.prototype.getOneBranch({companyId: authorizer.id, branchId: id})
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Branch gotten successfully')
        }catch(error){
            next(error)
        }
    }
}
import { NextFunction, Request, Response } from "express";
import ApiResponse from '../utils/api-response'
import { CompanyService } from "../services/company.service";
import { IAddressPayload, IprofileUser } from "../services/types/auth.types";
const { created, customError, ok, response, downloadFile } = ApiResponse;
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

    public async createDepartment(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer, ...rest } = req.body
            const result = await CompanyService.prototype.createDepartment({
                name: rest.name,
                user_id: authorizer.id,
                headOfDepartment: rest?.headOfDepartment
            })
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Department created successfully.')
        }catch(error){
            next(error)
        }
    }

    public async downloadTemplate(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer, ...rest } = req.body;
            const result = await CompanyService.prototype.downloadTemplate({authorizer})
            return downloadFile(res, result.data, 'DepartmentTemplate.csv', 'text/csv')
        }catch(error){
            next(error)
        }
    }

    public async bulkCreateDepartment(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer } = req.body
            const file: any = req.files
            const result = await CompanyService.prototype.bulkCreateDepartment({
                authorizer,
                file: file?.departmentSheet.tempFilePath
            })
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Department created successfully.')
        }catch(error){
            next(error)
        }
    }

    public async getAllDepartments(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer } = req.body
            const result = await CompanyService.prototype.getAllDepartments({
                authorizer
            })
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Department created successfully.')
        }catch(error){
            next(error)
        }
    }

    public async getOneDepartments(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer } = req.body;
            const { id } = req.params;
            const result = await CompanyService.prototype.getOneDepartments({
                authorizer,
                department_id: id
            })
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Department created successfully.')
        }catch(error){
            next(error)
        }
    }

    public async updateOneDepartment(req: Request, res: Response, next: NextFunction){
        try{
            const { authorizer, changes } = req.body;
            const { id } = req.params;
            const result = await CompanyService.prototype.updateOneDepartment({
                authorizer,
                changes,
                department_id: id
            })
            if(!result.success) return customError(res, 400, result.message)
            return ok(res, result, 'Department created successfully.')
        }catch(error){
            next(error)
        }
    }
}
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/api-response";
import { UserService } from "../services/user.service";
import { Icheckin, Ipagination, IReviewProducts, IUploadProduct, IUserLocation } from "../services/types/auth.types";
import { NotAuthorizedError } from "../utils/error-handler";
import Utils from "../utils/helper.utils";
const { created, customError, ok, response } = ApiResponse;

export class UserController {
    public async getUser(req: Request, res: Response, next: NextFunction) {
      try {
        const payload: any = req.body;
        const { success, message, token, data } = await UserService.prototype.getUser(payload.authorizer);
        if (!success) throw new NotAuthorizedError(message ?? 'Unauthorized user')
        return ok(
          res,
          data,
          message
        );
      } catch (error) {
        next(error);
      }
    }
    public async updateUserLocation(req: Request, res: Response, next: NextFunction){
      try{
        const payload: IUserLocation = req.body;
        const { success, message, token, data } = await UserService.prototype.updateUserLocation(payload);
        if (!success) return customError(res, 400, message)
        return ok(
          res,
          data,
          message
        );
      }catch(error){
        next(error)
      }
    }
    public async uploadProduct(req: Request, res: Response, next: NextFunction){
      try{
        let payload: IUploadProduct  = req.body;
        let image: any;
        if(Array.isArray(req?.files?.image)){
          image = req.files.image.map(item => item.tempFilePath)
        }else{
          image = req?.files?.image
        }
        const { success, message, token, data } = await UserService.prototype.uploadProduct({...payload, image});
        if (!success) return customError(res, 400, message)
          return ok(
            res,
            {data},
            message
          );
      }catch(error){
        next(error)
      }
    }
    public async reviewProduct(req: Request, res: Response, next: NextFunction){
      try{
        const { id } = req.params;
        let payload : IReviewProducts = req.body;
        payload = { product: id, ...payload }
        const { success, message, token, data } = await UserService.prototype.reviewProduct(payload);
        if (!success) return customError(res, 400, message)
        return ok(
          res,
          {data},
          message
        );

      }catch(error){
        next(error)
      }
    }
    public async viewProduct(req: Request, res: Response, next: NextFunction){
      try{
        const { id } = req.params
        const { success, message, token, data, options } = await UserService.prototype.viewProduct(id);
        if (!success) return customError(res, 404, message);
        return ok(
          res,
          {data, ...options},
          message
        );
      }catch(error){

      }
    }
    public async viewProducts(req: Request, res: Response, next: NextFunction){
      try{
        const query: any = req.query
        const { category } = req.params
        const paginate: Ipagination = Utils.paginateOptions(query)
        const { success, message, token, data, options } = await UserService.prototype.viewProducts({query: { ...query, ...paginate }, params: category});
        if (!success) return customError(res, 400, message)
        return ok(
          res,
          {data, ...options},
          message
        );
      }catch(error){
        next(error)
      }
    }
    public async seedUserAndProducts(req: Request, res: Response, next: NextFunction){
      try{
        const { success, message, token, data } = await UserService.prototype.seedUserAndProducts();
        if (!success) throw new NotAuthorizedError(message ?? 'Unauthorized user')
        return ok(
          res,
          data,
          message
        );
      }catch(error){
        next(error)
      }
    }

    public async productsNearby(req: Request, res: Response, next: NextFunction){
      try{
        const query: any = req.query
        const { category } = req.params
        const { authorizer } = req.body
        const paginate: Ipagination = Utils.paginateOptions(query)
        const { success, message, token, data } = await UserService.prototype.productsNearby({query: { ...query, ...paginate }, params: category, authorizer});
        if (!success) return customError(res, 400, message)
        return ok(
          res,
          {data},
          message
        );
      }catch(error){
        next(error)
      }
    }

  }
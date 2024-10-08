import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/api-response";
import {  ICompanyPayload, IresetPassword, IsendOtp, IsignIn, IsignUp, IverifyOtp } from "../services/types/auth.types";
import { AuthService } from "../services/auth.service";
const { created, customError, ok, response } = ApiResponse;

export class AuthController {
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: IsignIn = req.body;
      const { success, message, token } = await AuthService.prototype.signIn(
        payload
      );
      if (!success) return customError(res, 400, message);
      return ok(
        res,
        { token },
        success ? "Logged in Successfully" : "Invalid Credentials."
      );
    } catch (error) {
      next(error);
    }
  }

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: IsignUp = req.body;
      const { success, message, options, token } =
        await AuthService.prototype.signUp(payload);
      if (!success) return customError(res, 400, message);
      return ok(
        res,
        { ...options, token },
        message
      );
    } catch (error) {
      next(error);
    }
  }

  public async sendOtp(req: Request, res: Response, next: NextFunction) {
    try{
      const payload : IsendOtp = req.body;
      const { success, message, token } = await AuthService.prototype.sendOtp(
        payload
      );
      return ok(
        res,
        { },
        message
      );
    }catch(error){
      next(error)
    }
  }

  public async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try{
      const payload : IverifyOtp = req.body;
      const { success, message, token } = await AuthService.prototype.verifyOtp(
        payload
      );
      if(!success) return customError(res, 400, message);
      return ok(
        res,
        { },
        message
      );
    }catch(error){
      next(error)
    }
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try{
      const payload : IresetPassword = req.body;
      const { success, message, token } = await AuthService.prototype.resetPassword(
        payload
      );
      if(!success) return customError(res, 400, message);
      return ok(
        res,
        { },
        message
      );
    }catch(error){
      next(error)
    }
  }

}

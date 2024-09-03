import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/api-response";
import { UserService } from "../services/user.service";
import { Icheckin } from "../services/types/auth.types";
const { created, customError, ok, response } = ApiResponse;

export class UserController {
    public async checkIn(req: Request, res: Response, next: NextFunction) {
      try {
        const payload: Icheckin = req.body;
        const { success, message, token } = await UserService.prototype.checkIn(payload);
        if (!success) return customError(res, 400, message);
        return ok(
          res,
          { },
          message
        );
      } catch (error) {
        next(error);
      }
    }
  }
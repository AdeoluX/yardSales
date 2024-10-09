import { NextFunction, Request, Response } from "express";
import ApiResponse from "../utils/api-response";
import {  ChargeSuccessEvent, ICompanyPayload, IresetPassword, IsendOtp, IsignIn, IsignUp, IverifyOtp } from "../services/types/auth.types";
import { WebHookService } from "../services/webhook.service";
const { created, customError, ok, response } = ApiResponse;

export class WebHookController {
  public async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: ChargeSuccessEvent = req.body;
      const process = await WebHookService.prototype.purchaseWebhook(
        payload
      );
      return ok(
        res,
        {  },
        "Ok"
      );
    } catch (error) {
      next(error);
    }
  }

}

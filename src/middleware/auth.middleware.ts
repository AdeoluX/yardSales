import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../utils/error-handler";
import { AuthPayload, UserAuthPayload } from "../services/types/auth.types";
import Utils from "../utils/helper.utils";

// interface Request extends Request {
//   currentUser: Object;
// }

export class AuthMiddleware {
  // Constructor to initialize with roles (if necessary)
  constructor(private allowedRoles: string[] = []) {
    this.verifyUser = this.verifyUser.bind(this);
  }

  public verifyUser(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.authorization) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again."
      );
    }
    try {
      const BearerToken = req.headers?.authorization.split(" ")[1];
      if (req.headers?.authorization) {
        const payload: any = Utils.verifyToken(BearerToken);
        
        if (!payload) {
          throw new NotAuthorizedError(
            "You do not have permission to perform this action."
          );
        }
        console.log(this?.allowedRoles)
        if (this?.allowedRoles?.length > 0 && !this?.allowedRoles?.includes(payload?.role)) {
          throw new NotAuthorizedError(
            "You do not have permission to perform this action."
          );
        }

        req.body = {
          ...req.body,
          authorizer: payload,
        };
      }
    } catch (error) {
      throw new NotAuthorizedError("Token is invalid. Please login again.");
    }
    next();
  }

  public verifyCompany(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.authorization) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again."
      );
    }
    try {
      const BearerToken = req.headers?.authorization.split(" ")[1];
      if (req.headers?.authorization) {
        const payload: AuthPayload = Utils.verifyToken(BearerToken);
        
        // Check if the user has the required role
        if (!payload) {
          throw new NotAuthorizedError(
            "You do not have permission to perform this action."
          );
        }

        req.body = {
          ...req.body,
          authorizer: payload,
        };
      }
    } catch (error) {
      throw new NotAuthorizedError("Token is invalid. Please login again.");
    }
    next();
  }

  // Static method to easily create a middleware instance with roles
  public static withRoles(allowedRoles: string[]): AuthMiddleware {
    return new AuthMiddleware(allowedRoles);
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();

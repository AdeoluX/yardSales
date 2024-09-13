import { IUser, UserModel } from "../models/user.schema";
import Utils from "../utils/helper.utils";
import {
  Iactivate,
  IchangePassword,
  ICompanyPayload,
  IforgotPassword,
  IsignIn,
  IsignUp,
  ServiceRes,
} from "./types/auth.types";
import { compare } from "bcrypt";

export class AuthService {
  public async signIn(payload: IsignIn): Promise<ServiceRes> {
    const user = await UserModel.findOne({email: payload.email})
    if(!user) return {
      success: false,
      data: {},
      message: 'Invalid Credentials'
    }
    const check = user.isValidPassword(payload.password)
    if(!check) return {
      success: false,
      data: {},
      message: 'Invalid Credentials'
    }
    const token = Utils.signToken({
      email: user.email,
      id: user._id
    })
    return {
      success: true,
      data: {
        token
      },
      message: "Successful login"
    }
  }

  public async signUp(payload: IsignUp): Promise<ServiceRes> {
    const { confirmPassword, email, password } = payload;
    const user = await UserModel.findOne({ email })
    if(user) return {
      success: false,
      data: {},
      message: 'Email already exists'
    }
    if(confirmPassword !== password) return {
      success: false,
      data: {},
      message: "Passwords don't match"
    }
    const newUser = await UserModel.create({
      email, password
    })

    const token = Utils.signToken({
      id: newUser._id,
      email
    })

    await UserModel.updateOne({ _id: newUser._id }, { token })

    return {
      success: true,
      token,
      message: "Signed up successfully."
    }
  }

  // public async forgotPassword(payload: IforgotPassword): Promise<ServiceRes> {}
}

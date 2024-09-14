import { OtpModel } from "../models/otp.schema";
import { IUser, UserModel } from "../models/user.schema";
import Utils from "../utils/helper.utils";
import {
  Iactivate,
  IchangePassword,
  ICompanyPayload,
  IforgotPassword,
  IsendOtp,
  IsignIn,
  IsignUp,
  IverifyOtp,
  ServiceRes,
} from "./types/auth.types";
import { compare } from "bcrypt";
import { sendEmail } from "./email.service";

export class AuthService {
  public async signIn(payload: IsignIn): Promise<ServiceRes> {
    const user = await UserModel.findOne({email: payload.email})
    if(!user) return {
      success: false,
      data: {},
      message: 'Invalid Credentials'
    }
    const check = await compare(payload.password, user.password)
    // const check = user.isValidPassword(payload.password)
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
      data: {},
      token,
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

  public async sendOtp(payload: IsendOtp): Promise<ServiceRes>{
    //Find User
    const user = await UserModel.findOne({
      email: payload.email
    })
    if(!user) return {
      success: true,
      message: "Otp has been sent successfully"
    }
    const otp = Utils.generateString({number: true})
    //send otp to email
    sendEmail({
      to: payload.email,
      subject: 'Otp Verification',
      templateName: "otpEmail",
      replacements: {
        "OTP_CODE": otp
      }
    })
    //create otp
    await OtpModel.create({
      user_id: user._id,
      otp
    })
    return {
      success: true,
      message: "Otp has been sent successfully"
    }
  }

  public async verifyOtp(payload: IverifyOtp): Promise<ServiceRes>{
    const { email, otp } = payload;
    const user = await UserModel.findOne({email})
    if(!user) return {
      success: false,
      message: 'Invalid Otp!'
    }
    const findOtp = await OtpModel.findOne({
      user_id: user._id,
      otp, used: false
    })
    if(!findOtp){ 
      return {
        success: false,
        message: 'Invalid Otp!'
      }
    }
    await OtpModel.updateOne({_id: findOtp._id}, {used: true})
    return {
      success: true,
      message: 'Successfully Verified!'
    }
  }

  // public async forgotPassword(payload: IforgotPassword): Promise<ServiceRes> {}
}

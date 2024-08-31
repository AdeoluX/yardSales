import { TierModel } from "../models/tier.schema";
import { ICompany, CompanyModel } from "../models/company.schema";
import { OtpModel } from "../models/otp.schema";
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
import { AddressModel } from "../models/address.schema";
import { CompanyAddressModel } from "../models/companyAddress.schema";
import { sendEmail } from "./email.service";
import { compare } from "bcrypt";

export class AuthService {
  public async signIn(payload: IsignIn): Promise<ServiceRes> {
    const { email, password } = payload;
    const user: IUser | null = await UserModel.findOne({ email }).select('+password');
    if (!user) return { success: false, message: "Invalid credentials" };
    const isValid = await compare(password, user.password);
    // const isValid = await user.isValidPassword(password);
    if (!isValid) return { success: false, message: "Invalid credentials" };
    const token = Utils.signToken({ email, id: user._id, status: user.status });
    return {
      success: true,
      message: "Logged in successfully.",
      token,
    };
  }

  public async companySignIn(payload: IsignIn): Promise<ServiceRes> {
    const { email, password } = payload;
    const company: ICompany | null = await CompanyModel.findOne({ email });
    if (!company) return { success: false, message: "Invalid credentials" };
    const isValid = await company.isValidPassword(password);
    if (!isValid) return { success: false, message: "Invalid credentials" };
    const token = Utils.signToken({id: company._id, status: company.status });
    return {
      success: true,
      message: "Logged in successfully.",
      token,
    };
  }

  public async signUp(payload: ICompanyPayload): Promise<ServiceRes> {
    const {
      country,
      email,
      name,
      no,
      phoneNumber,
      password,
      confirmPassword,
      state,
      street,
      town
    } = payload;

    const companyExists: ICompany | null = await CompanyModel.findOne({ email });
    if (companyExists) return { success: false, message: "Invalid credentials." };
    if (confirmPassword !== password)
      return { success: false, message: "Passwords don't match." };
    let address = await AddressModel.create({
      country,
      no,
      town,
      state,
      street
    })
    address = await address.save()
    let createCompany = new CompanyModel({
      email,
      password,
      name,
      phoneNumber,
      tier: '66993361800a5c21c912ebda'
    });
    createCompany = await createCompany.save()
    if (!createCompany) return { success: false, message: "Invalid credentials" };
    await CompanyAddressModel.create({
      company: createCompany._id,
      address: address._id
    })
    const token = Utils.signToken({
      email,
      id: createCompany._id,
      status: createCompany.status,
    });
    const otp = Utils.generateString({ number: true });
    await OtpModel.create({
      author_id: createCompany._id,
      otp,
    });
    //send email to company
    sendEmail({
      to: email,
      subject: 'New Sign Up',
      templateName: `welcomeEmail`,
      replacements: {
        name,
        otp
      }
    })
    return {
      success: true,
      message: "Logged in successfully.",
      token,
      options: {
        otp,
      },
    };
  }

  public async activateProfile(payload: Iactivate): Promise<ServiceRes> {
    const { otp, authorizer } = payload;
    const user_id = authorizer.id;
    const userExists = await UserModel.findById(user_id);
    if (!userExists) return { success: false, message: "Invalid Otp" };
    const otpExists = await OtpModel.findOne({
      author_id: user_id,
      otp,
    });
    if (!otpExists) return { success: false, message: "Invalid Otp" };
    await UserModel.findByIdAndUpdate(
      user_id,
      { status: "active" },
      { new: true }
    );
    const token = Utils.signToken({
      email: userExists.email,
      id: userExists._id,
      status: userExists.status,
    });
    return {
      success: true,
      message: "Account activated successfully.",
      token,
      options: {
        otp,
      },
    };
  }

  public async forgotPassword(payload: IforgotPassword): Promise<ServiceRes> {
    const { email } = payload;
    const findUser = await UserModel.findOne({
      email,
    });
    if (!findUser) return { success: true, message: "Otp sent." };
    const otp = Utils.generateString({ number: true });
    await OtpModel.create({
      author_id: findUser._id,
      otp,
    });
    return {
      success: true,
      message: "Otp sent.",
      options: {
        otp,
      },
    };
  }

  public async changePassword(payload: IchangePassword): Promise<ServiceRes> {
    const { otp, confirmPassword, password, email } = payload;
    if (confirmPassword !== password)
      return { success: false, message: "Passwords don't match." };
    const userExists = await UserModel.findOne({
      email,
    });
    if (!userExists) return { success: false, message: "User does not exist" };
    const findOtp = await OtpModel.findOne({
      author_id: userExists._id,
      otp,
    });
    if (!findOtp) return { success: false, message: "Invalid or Expired otp" };
    await UserModel.findByIdAndUpdate(
      userExists._id,
      { password },
      { new: true }
    );
    return {
      success: true,
      message: "Password change successful",
    };
  }
}

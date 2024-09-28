export interface IsignIn {
  email: string;
  password: string;
}

export interface IsendOtp {
  email: string;
}

export interface IverifyOtp {
  email: string;
  otp: string;
}

export interface IresetPassword {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface IsignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICompanyPayload {
  name: string;
  street: string;
  town: string;
  no: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  state: string;
  email: string;
  country: string;
}

export interface IprofileUser {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: string;
  password?: string;
  role: string;
  no: string;
  authorizer?: any;
  addressId?: string
}

export interface IAddressPayload {
  street: string;
  no: string;
  town: string;
  state: string;
  country: string;
  hq?: boolean;
  authorizer?: any;
  coordinates: Array<number>
}

export interface Iactivate {
  otp: string;
  authorizer: AuthPayload;
}

export interface ServiceRes {
  success: boolean;
  message?: string;
  token?: string;
  options?: any;
  data?: any;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
}

export interface IforgotPassword {
  email: string;
}

export interface IchangePassword {
  otp: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface AuthPayload {
  id: string;
  email: string;
  status: string;
  iat?: number;
  role?: string
}

export interface UserAuthPayload {
  id: string;
  email: string;
  status: string;
  iat?: number;
  role: string
}

export interface Icheckin {
  coordinates: Array<number>;
  qrString: string;
  authorizer?: any;
}

export interface Ipagination {
  page: number;
  perPage: number;
  skip: number;
}

export interface IdateFilter {
  startDate: Date;
  endDate: Date;
}

export interface IQuerySearch {
  search: string;
}

export interface IQuery extends Ipagination, IdateFilter, IQuerySearch {}

export interface IReviewProducts {
  comment: string;
  rating: number;
  authorizer?: any;
  product?: string;
}

export interface IUserLocation {
    type: string;
    coordinates: [number, number];
    authorizer?: any;
}

export interface IUploadProduct {
  image: string | string[];
  currency: string;
  price: number;
  category: string;
  name: string;
  authorizer?: any;
}

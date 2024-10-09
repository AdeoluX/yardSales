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

export interface IpurchaseItem {
  quantity: number;
  product_id: string;
  user_id: string;
}

export interface IUploadProduct {
  image: string | string[];
  currency: string;
  price: number;
  category: string;
  name: string;
  quantity: number;
  authorizer?: any;
}

export interface InitiateChargeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface InitiateChargeParams {
  email?: string;
  amount: number;
  callbackUrl?: string;
  reference: string;
}

export interface Authorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: string;
  account_name: string | null;
}

export interface Customer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: any;
  risk_action: string;
  international_format_phone: string | null;
}

export interface ChargeSuccessEvent {
  event: string;
  data: {
      id: number;
      domain: string;
      status: string;
      reference: string;
      amount: number;
      message: string | null;
      gateway_response: string;
      paid_at: string;
      created_at: string;
      channel: string;
      currency: string;
      ip_address: string;
      metadata: string | null;
      fees_breakdown: any;
      log: any;
      fees: number;
      fees_split: any;
      authorization: Authorization;
      customer: Customer;
      plan: any;
      subaccount: any;
      split: any;
      order_id: string | null;
      paidAt: string;
      requested_amount: number;
      pos_transaction_data: any;
      source: {
          type: string;
          source: string;
          entry_point: string;
          identifier: string | null;
      };
  };
}

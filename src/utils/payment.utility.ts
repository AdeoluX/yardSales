import axios from 'axios';
import { InitiateChargeParams, InitiateChargeResponse } from 'services/types/auth.types';

// Paystack Secret Key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;

// Base URL for Paystack API
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Interface for the initiation of a transaction


// Interface for the response from Paystack after initializing a transaction


// Function to initialize a Paystack transaction
export const initiateCharge = async ({
  email = "",
  amount,
  callbackUrl = 'https://www.google.com',
  reference,
}: InitiateChargeParams): Promise<InitiateChargeResponse> => {
  try {
    const response = await axios.post<InitiateChargeResponse>(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100, // Convert amount to kobo
        callback_url: callbackUrl,
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Returns the data with the payment URL to redirect to
  } catch (error: any) {
    throw new Error(`Payment Initialization Failed: ${error.response?.data?.message}`);
  }
};

// Interface for the response from Paystack after verifying a transaction
interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    domain: string;
    metadata: any;
    gateway_response: string;
    channel: string;
    ip_address: string;
    log: any;
    fees: number;
    authorization: any;
    customer: any;
    plan: any;
  };
}

// Function to verify a Paystack transaction
export const verifyPayment = async (reference: string): Promise<VerifyPaymentResponse> => {
  try {
    const response = await axios.get<VerifyPaymentResponse>(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data; // Returns the transaction verification details
  } catch (error: any) {
    throw new Error(`Payment Verification Failed: ${error.response?.data?.message}`);
  }
};

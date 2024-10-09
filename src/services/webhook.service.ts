import { TransactionModel } from "../models/transaction.schema";
import { ChargeSuccessEvent } from "./types/auth.types";
import { OrderModel } from "../models/order.schema";
import { ProductModel } from "../models/product.schema";

export class WebHookService {
    public async purchaseWebhook(payload: ChargeSuccessEvent): Promise<void> {
        const { data } = payload;
        // Check if the event is a charge success event
        if (payload.event === 'charge.success') {
            const r = await this.processSuccessfulCharge(data);
            return;
        }
    }

    public async processSuccessfulCharge(data: any){
        const { amount } = data;
        //get transactions
        const transaction = await TransactionModel.findOne({
            reference: data.reference
        });
        if(!transaction || transaction.status !== 'processing'){
            return;
        }
        //get order
        const order = await OrderModel.findById(transaction?.order);
        //get product
        const product: any = await ProductModel.findById(order?.product);
        const quantityPurchased = Number(amount/100) / Number(product?.price);
        if(product.quantity < quantityPurchased){
            return;
        }
        await ProductModel.updateOne(
            { _id: product._id }, 
            { quantity: Number(product?.quantity) - Number(quantityPurchased) }
        )
        await TransactionModel.updateOne({
            _id: transaction?._id
        }, {
            status: 'success'
        })
        //send email or PN to user of the product
        return;
    }
}
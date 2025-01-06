import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICartItem {
  packageId: mongoose.Types.ObjectId;
  tourOption: string;
  date: Date;
  transferType: string;
  transferTimings: string;
  pax: number;
  cancelPolicy: string;
  availability: string;
  price: number;
  VAT: number;
  totalAmount: number;
  remarks?: string;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  couponCode?: string;
  subTotal: number;
  totalVAT: number;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CartItemSchema: Schema = new Schema({
  packageId: {
    type: mongoose.Types.ObjectId,
    ref: "Package",
    required: true,
  },
  tourOption: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  transferType: {
    type: String,
    required: true,
  },
  transferTimings: {
    type: String,
    required: true,
  },
  pax: {
    type: Number,
    required: true,
    default: 1,
  },
  cancelPolicy: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  VAT: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  remarks: {
    type: String,
  },
});

const CartSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema],
    couponCode: {
      type: String,
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    totalVAT: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel: Model<ICart> = mongoose.model<ICart>("Cart", CartSchema);
export default CartModel;

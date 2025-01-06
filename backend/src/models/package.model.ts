import mongoose, { Schema, Document, Model } from "mongoose";

interface Review {
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
}

interface TicketDetails {
  price: number;
  currency?: string;
  offers?: {
    title?: string;
    discount?: number;
  }[];
}

interface Location {
  city: string;
  country: string;
  coordinates?: {
    lat?: number;
    lng?: number;
  };
}

interface Experience {
  name: string;
  description?: string;
}

interface Realm {
  name: string;
  highlights: string[];
  features: string[];
}

interface Facility {
  name: string;
  description?: string;
}

interface Policies {
  refundPolicy: string;
  childPolicy?: string;
  additionalInfo?: string[];
}

interface AdditionalLinks {
  googleMap?: string;
  foodMenu?: string;
}

export interface IPackage extends Document {
  packageName: string;
  location: Location;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions?: string[];
  ticketDetails: TicketDetails;
  images?: string[];
  experiences: Experience[];
  realms: Realm[];
  operatingHours: {
    weekdays: string;
    weekends: string;
  };
  policies: Policies;
  facilities: Facility[];
  transferOptions?: boolean;
  bookingInfo: {
    mobileVoucherAccepted: boolean;
    instantConfirmation: boolean;
  };
  reviews: Review[];
  additionalLinks?: AdditionalLinks;
  createdAt?: Date;
  updatedAt?: Date;
}

const PackageSchema: Schema = new Schema(
  {
    packageName: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    description: { type: String, required: true },
    highlights: [{ type: String, required: true }],
    inclusions: [{ type: String, required: true }],
    exclusions: [{ type: String }],
    ticketDetails: {
      price: { type: Number, required: true },
      currency: { type: String, default: "AED" },
      offers: [
        {
          title: { type: String },
          discount: { type: Number },
        },
      ],
    },
    images: [{ type: String }],
    experiences: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    realms: [
      {
        name: { type: String, required: true },
        highlights: [{ type: String, required: true }],
        features: [{ type: String, required: true }],
      },
    ],
    operatingHours: {
      weekdays: { type: String, required: true },
      weekends: { type: String, required: true },
    },
    policies: {
      refundPolicy: { type: String, required: true },
      childPolicy: { type: String },
      additionalInfo: [{ type: String }],
    },
    facilities: [
      {
        name: { type: String, required: true },
        description: { type: String },
      },
    ],
    transferOptions: { type: Boolean, default: false },
    bookingInfo: {
      mobileVoucherAccepted: { type: Boolean, default: true },
      instantConfirmation: { type: Boolean, default: true },
    },
    reviews: [
      {
        userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String },
      },
    ],
    additionalLinks: {
      googleMap: { type: String },
      foodMenu: { type: String },
    },
  },
  { timestamps: true }
);

const PackageModel: Model<IPackage> = mongoose.model<IPackage>(
  "Package",
  PackageSchema
);
export default PackageModel;

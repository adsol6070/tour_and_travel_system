import { body } from "express-validator";

export const validateCreateCart = [
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid user ID format"),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array and contain at least one item")
    .bail()
    .custom((value) => {
      value.forEach((item: any) => {
        if (!item.packageId || typeof item.packageId !== "string") {
          throw new Error(
            "Each item must have a valid packageId (MongoDB ObjectId)"
          );
        }
        if (!item.tourOption || typeof item.tourOption !== "string") {
          throw new Error("Each item must have a valid tourOption (string)");
        }
        if (!item.date || isNaN(Date.parse(item.date))) {
          throw new Error("Each item must have a valid date");
        }
        if (!item.transferType || typeof item.transferType !== "string") {
          throw new Error("Each item must have a valid transferType (string)");
        }
        if (!item.transferTimings || typeof item.transferTimings !== "string") {
          throw new Error("Each item must have valid transferTimings (string)");
        }
        if (!item.pax || typeof item.pax !== "number" || item.pax <= 0) {
          throw new Error(
            "Each item must have a valid pax (number greater than 0)"
          );
        }
        if (!item.cancelPolicy || typeof item.cancelPolicy !== "string") {
          throw new Error("Each item must have a valid cancelPolicy (string)");
        }
        if (!item.availability || typeof item.availability !== "string") {
          throw new Error("Each item must have a valid availability (string)");
        }
        if (!item.price || typeof item.price !== "number" || item.price < 0) {
          throw new Error("Each item must have a valid price (number >= 0)");
        }
        if (!item.VAT || typeof item.VAT !== "number" || item.VAT < 0) {
          throw new Error("Each item must have a valid VAT (number >= 0)");
        }
        if (
          !item.totalAmount ||
          typeof item.totalAmount !== "number" ||
          item.totalAmount < 0
        ) {
          throw new Error(
            "Each item must have a valid totalAmount (number >= 0)"
          );
        }
        if (item.remarks && typeof item.remarks !== "string") {
          throw new Error("Each item remarks must be a string if provided");
        }
      });
      return true;
    }),

  body("couponCode")
    .optional()
    .isString()
    .withMessage("Coupon code must be a string"),

  body("subTotal")
    .notEmpty()
    .withMessage("Subtotal is required")
    .isNumeric()
    .withMessage("Subtotal must be a number")
    .custom((value) => value >= 0)
    .withMessage("Subtotal must be greater than or equal to 0"),

  body("totalVAT")
    .notEmpty()
    .withMessage("Total VAT is required")
    .isNumeric()
    .withMessage("Total VAT must be a number")
    .custom((value) => value >= 0)
    .withMessage("Total VAT must be greater than or equal to 0"),

  body("totalAmount")
    .notEmpty()
    .withMessage("Total amount is required")
    .isNumeric()
    .withMessage("Total amount must be a number")
    .custom((value) => value >= 0)
    .withMessage("Total amount must be greater than or equal to 0"),
];

export const validateUpdateCart = [
  body("userId").optional().isMongoId().withMessage("Invalid user ID format"),

  body("items")
    .optional()
    .isArray()
    .withMessage("Items must be an array")
    .bail()
    .custom((value) => {
      value.forEach((item: any) => {
        if (item.packageId && typeof item.packageId !== "string") {
          throw new Error(
            "Each item packageId must be a valid MongoDB ObjectId"
          );
        }
        if (item.tourOption && typeof item.tourOption !== "string") {
          throw new Error("Each item tourOption must be a string");
        }
        if (item.date && isNaN(Date.parse(item.date))) {
          throw new Error("Each item date must be valid");
        }
        if (item.transferType && typeof item.transferType !== "string") {
          throw new Error("Each item transferType must be a string");
        }
        if (item.transferTimings && typeof item.transferTimings !== "string") {
          throw new Error("Each item transferTimings must be a string");
        }
        if (item.pax && (typeof item.pax !== "number" || item.pax <= 0)) {
          throw new Error("Each item pax must be a number greater than 0");
        }
        if (item.cancelPolicy && typeof item.cancelPolicy !== "string") {
          throw new Error("Each item cancelPolicy must be a string");
        }
        if (item.availability && typeof item.availability !== "string") {
          throw new Error("Each item availability must be a string");
        }
        if (item.price && (typeof item.price !== "number" || item.price < 0)) {
          throw new Error("Each item price must be a number >= 0");
        }
        if (item.VAT && (typeof item.VAT !== "number" || item.VAT < 0)) {
          throw new Error("Each item VAT must be a number >= 0");
        }
        if (
          item.totalAmount &&
          (typeof item.totalAmount !== "number" || item.totalAmount < 0)
        ) {
          throw new Error("Each item totalAmount must be a number >= 0");
        }
        if (item.remarks && typeof item.remarks !== "string") {
          throw new Error("Each item remarks must be a string if provided");
        }
      });
      return true;
    }),

  body("couponCode")
    .optional()
    .isString()
    .withMessage("Coupon code must be a string"),

  body("subTotal")
    .optional()
    .isNumeric()
    .withMessage("Subtotal must be a number")
    .custom((value) => value >= 0)
    .withMessage("Subtotal must be greater than or equal to 0"),

  body("totalVAT")
    .optional()
    .isNumeric()
    .withMessage("Total VAT must be a number")
    .custom((value) => value >= 0)
    .withMessage("Total VAT must be greater than or equal to 0"),

  body("totalAmount")
    .optional()
    .isNumeric()
    .withMessage("Total amount must be a number")
    .custom((value) => value >= 0)
    .withMessage("Total amount must be greater than or equal to 0"),
];

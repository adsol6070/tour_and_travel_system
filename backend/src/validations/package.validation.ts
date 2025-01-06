import { body, param } from "express-validator";

export const validateCreatePackage = [
  // General details
  body("packageName").notEmpty().withMessage("Package name is required"),

  // Location validation
  body("location.city").notEmpty().withMessage("City is required"),
  body("location.country").notEmpty().withMessage("Country is required"),
  body("location.coordinates.lat")
    .optional()
    .isFloat()
    .withMessage("Latitude must be a valid number"),
  body("location.coordinates.lng")
    .optional()
    .isFloat()
    .withMessage("Longitude must be a valid number"),

  // Description and highlights
  body("description").notEmpty().withMessage("Description is required"),
  body("highlights")
    .isArray({ min: 1 })
    .withMessage("At least one highlight is required"),
  body("highlights.*").isString().withMessage("Highlight must be a string"),

  // Ticket details
  body("ticketDetails.price")
    .isFloat({ gt: 0 })
    .withMessage("Valid price is required"),
  body("ticketDetails.currency")
    .optional()
    .isString()
    .withMessage("Currency must be a string"),
  body("ticketDetails.offers")
    .optional()
    .isArray()
    .withMessage("Offers must be an array"),
  body("ticketDetails.offers.*.title")
    .optional()
    .isString()
    .withMessage("Offer title must be a string"),
  body("ticketDetails.offers.*.discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a valid number"),

  // Images
  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*").optional().isString().withMessage("Image must be a string"),

  // Experiences
  body("experiences")
    .isArray({ min: 1 })
    .withMessage("At least one experience is required"),
  body("experiences.*.name")
    .notEmpty()
    .withMessage("Experience name is required"),
  body("experiences.*.description")
    .optional()
    .isString()
    .withMessage("Experience description must be a string"),

  // Realms
  body("realms")
    .isArray({ min: 1 })
    .withMessage("At least one realm is required"),
  body("realms.*.name").notEmpty().withMessage("Realm name is required"),
  body("realms.*.highlights")
    .isArray({ min: 1 })
    .withMessage("Realm highlights are required"),
  body("realms.*.features")
    .isArray({ min: 1 })
    .withMessage("Realm features are required"),

  // Operating hours
  body("operatingHours.weekdays")
    .notEmpty()
    .withMessage("Weekday operating hours are required"),
  body("operatingHours.weekends")
    .notEmpty()
    .withMessage("Weekend operating hours are required"),

  // Policies
  body("policies.refundPolicy")
    .notEmpty()
    .withMessage("Refund policy is required"),
  body("policies.childPolicy")
    .optional()
    .isString()
    .withMessage("Child policy must be a string"),
  body("policies.additionalInfo")
    .optional()
    .isArray()
    .withMessage("Additional info must be an array"),
  body("policies.additionalInfo.*")
    .optional()
    .isString()
    .withMessage("Additional info must be a string"),

  // Facilities
  body("facilities")
    .isArray({ min: 1 })
    .withMessage("At least one facility is required"),
  body("facilities.*.name").notEmpty().withMessage("Facility name is required"),
  body("facilities.*.description")
    .optional()
    .isString()
    .withMessage("Facility description must be a string"),

  // Transfer options
  body("transferOptions")
    .optional()
    .isBoolean()
    .withMessage("Transfer options must be a boolean"),

  // Booking info
  body("bookingInfo.mobileVoucherAccepted")
    .isBoolean()
    .withMessage("Mobile voucher accepted must be a boolean"),
  body("bookingInfo.instantConfirmation")
    .isBoolean()
    .withMessage("Instant confirmation must be a boolean"),

  // Reviews
  body("reviews").optional().isArray().withMessage("Reviews must be an array"),
  body("reviews.*.userId")
    .optional()
    .isMongoId()
    .withMessage("Review userId must be a valid MongoDB ObjectId"),
  body("reviews.*.rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("reviews.*.comment")
    .optional()
    .isString()
    .withMessage("Review comment must be a string"),

  // Additional links
  body("additionalLinks.googleMap")
    .optional()
    .isString()
    .withMessage("Google Map link must be a string"),
  body("additionalLinks.foodMenu")
    .optional()
    .isString()
    .withMessage("Food menu link must be a string"),
];

export const validateUpdatePackage = [
  param("id").isMongoId().withMessage("Invalid package ID"),
  ...validateCreatePackage.map((rule) => rule.optional()),
];

export const validatePackageId = [
  param("id").isMongoId().withMessage("Invalid package ID"),
];

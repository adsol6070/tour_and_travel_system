import { body } from "express-validator";

export const validateCreateBlogCategory = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
];

export const validateUpdateBlogCategory = [
  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Name must not exceed 100 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),
];

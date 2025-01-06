import { body } from "express-validator";

export const validateCreateBlog = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),

  body("content").notEmpty().withMessage("Content is required").trim(),

  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isMongoId()
    .withMessage("Invalid author ID format"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .bail()
    .custom((value) => {
      value.forEach((category: string) => {
        if (typeof category !== "string") {
          throw new Error("Each category must be a string");
        }
      });
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .bail()
    .custom((value) => {
      value.forEach((tag: string) => {
        if (typeof tag !== "string") {
          throw new Error("Each tag must be a string");
        }
      });
      return true;
    }),

  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover image must be a string (URL or path)"),
];

export const validateUpdateBlog = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),

  body("content").optional().trim(),

  body("author").optional().isMongoId().withMessage("Invalid author ID format"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("Categories must be an array")
    .bail()
    .custom((value) => {
      value.forEach((category: string) => {
        if (typeof category !== "string") {
          throw new Error("Each category must be a string");
        }
      });
      return true;
    }),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .bail()
    .custom((value) => {
      value.forEach((tag: string) => {
        if (typeof tag !== "string") {
          throw new Error("Each tag must be a string");
        }
      });
      return true;
    }),

  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover image must be a string (URL or path)"),
];

import { body } from "express-validator";

export const inputAddValidation = [
  body("name", "Invalid name length(min:2 max:12) ")
    .isString()
    .isLength({ min: 2 }, { max: 12 }),
  body("rank", "Max rank is 9999 and only numbers ")
    .isNumeric()
    .isLength({ max: 4 }),
];

export const inputUpdateValidation = [
  body("newName", "Invalid name length(min:2 max:12)")
    .isString()
    .isLength({ min: 2 }, { max: 12 }),
];

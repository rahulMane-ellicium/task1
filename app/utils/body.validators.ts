import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ResponseHandler } from "./responseHandler";

export const validateBody = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(new ResponseHandler(errors.array()));
    }
    next();
  },
];

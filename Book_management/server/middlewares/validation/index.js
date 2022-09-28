import { body, validationResult } from 'express-validator';

function userRegisterValidatorRules() {
    return [
        body("firstname", "First Name is Required").notEmpty().isLength({ min: 2 }),
        body("lastname", "Last Name is Required / Min 2 Characters").notEmpty().isLength({ min: 2 }),
        body("email", "Email is Required").isEmail(),
        body("password", "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character")
            .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
        body("password2").custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm Password do not match");
                } else {
                    return true;
                }
            }
        )
    ]
}

function addbookvalidations() {
    return [
body("title","Title is Required").isString({min:2}),
body("Author","Author is Required").isString({min:6}),
body("coverImagrUrl","Image URL is Required").isURL(),
body("publisher","Publisher Name is Required").isString({min:2}),
body("synopsis","Synopsis is Required").isString({min:2}),
body("PageCount","Number is Required").notEmpty({min:2}),
    ]
}

function loginValidation() {
    return [
        body('email', "Email Is Required").isEmail(),
        body('password', "Passowrd is Required").notEmpty()
    ]
}

function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
}



export {
    userRegisterValidatorRules,
    errorMiddleware,loginValidation,addbookvalidations
}
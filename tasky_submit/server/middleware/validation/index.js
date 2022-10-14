import { body, validationResult } from "express-validator";

function loginValidation() {
    return [
        body('email', "Email Is Required").isEmail(),
        body('password', "Passowrd is Required").notEmpty()
    ]
}

function registerValidation() {
    return [
        body('firstname', "First Name is Required").notEmpty().isLength({ max: 30 }),
        body('lastname', "Lastname is Required ").notEmpty().isLength({ max: 30 }),
        body('email', "Email Is Invalid").isEmail(),
        body('password', "Password should be Min 8 Characters, Atleast 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character").isStrongPassword(),
        body("password2").custom(
            (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Password & Confirm Password do not match");
                } else {
                    return true;
                }
            }
        ),
        body('phone', "Mobile Phone is Invalid").isMobilePhone(),
    ]
}

function scheduleTaskValidation(){
    return[
        body("taskname","task cannnot be empty").notEmpty(),
        body("deadline").custom(value=>{
            if(new Date(value)=="invalid Date"){
                throw new Error ("Invalid date entered")
            }
            let deadline=new Date(value);
            let mins=(deadline -new Date())/(1000*60);
            let days=(deadline-new Date())/(1000*60*60*24);
            if(mins<1 || days>30){
                throw new Error("Invalid Date Entered, Deadline should be more than 30 mins and less than 30 days ")
            }
            else{
                return true;
            }
        })
    ]
}


function editTaskValidation(){
    const rules=scheduleTaskValidation()
    return [
        ...rules,
        body("isCompleted", "isCompleted cannot be empty and should be a boolean").isBoolean()
    ]
}

function errorMiddleware(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

export { loginValidation, registerValidation, scheduleTaskValidation,editTaskValidation, errorMiddleware }

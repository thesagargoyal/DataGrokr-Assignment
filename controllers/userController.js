const User = require("../models/User");
const {body, validationResult} = require("express-validator");

module.exports.registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is requires"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be 6 characters long")
];

module.exports.register = async (req, res)=>{

    const {firstName, lastName, phoneNumber, email, address, zip, city, state, country} = req.body;
    
    // 
        // validationResult
    //

    try{

        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            zip,
            city,
            state,
            country
        });

        return res.status(200).json({msg: "User Registered Successfully"});
        
    }catch (error){
        return res.status(500).json({errors: error});
    }

}


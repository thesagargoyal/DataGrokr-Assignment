const User = require("../models/User");


// user registration /register
module.exports.register = async (req, res)=>{

    const {firstName, lastName, phoneNumber, email, address, zip, city, state, country} = req.body;

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
        return res.status(500).json({msg: "User Not Registered"});
    }

}


const User = require("../models/User");


// User registration /register
module.exports.register = async (req, res)=>{


    // Destructing data from request
    const {firstName, lastName, phoneNumber, email, address, zip, city, rState, country} = req.body;

    try{

        // Storing data to cloud
        const user = await User.create({
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            zip,
            city,
            state:rState,
            country
        });

        return res.status(200).json({msg: "User Registered Successfully"});
        
    }catch (error){
        return res.status(500).json({msg: "User Not Registered"});
    }

}


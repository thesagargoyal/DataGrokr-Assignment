import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    zip: "",
    city: "",
    rState: "",
    country: "",
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setState((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const userRegister = async (e) => {
    
    e.preventDefault();

    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      zip,
      city,
      rState,
      country,
    } = state;

    // check if any field is empty
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !address ||
      !zip ||
      !city ||
      !rState ||
      !country
    ) {
      return toast.error("Please enter all required fields");
    }

    // Regular Expression for all the required fields
    var firstNameRegex = /^[A-Za-z. ]{3,30}$/;
    var lastNameRegex = /^[a-zA-Z\s]{2,}$/;
    var emailRegex = /\S+@\S+\.\S+/;
    var phoneRegex = /^[0-9]{10}$/;
    var addressRegex = /^[a-zA-Z0-9\s,'-]{3,30}$/;
    var zipRegex = /^[0-9]{6}$/;
    var cityStateCountryRegex = /^[a-zA-Z\s]{2,30}$/;

    var inputErrors = [];

    if (!firstNameRegex.test(firstName)) {
      inputErrors.push("firstName is invalid");
    }
    if (!lastNameRegex.test(lastName)) {
      inputErrors.push("lastName is invalid");
    }
    if (!emailRegex.test(email)) {
      inputErrors.push("email is invalid");
    }
    if (!phoneRegex.test(phoneNumber)) {
      inputErrors.push("phoneNumber is invalid");
    }
    if (!addressRegex.test(address)) {
      inputErrors.push("address is invalid");
    }
    if (!zipRegex.test(zip)) {
      inputErrors.push("zip is invalid");
    }
    if (!cityStateCountryRegex.test(city)) {
      inputErrors.push("city is invalid");
    }
    if (!cityStateCountryRegex.test(rState)) {
      inputErrors.push("state is invalid");
    }
    if (!cityStateCountryRegex.test(country)) {
      inputErrors.push("country is invalid");
    }

    if (inputErrors.length > 0) {
      inputErrors.map((error) => {
        toast.error(error);
      });
      inputErrors = [];
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const {msg} =  await axios.post("/register", state, config);
  
      setState({
        firstName: "", lastName: "", phoneNumber: "", email: "", address: "", zip: "", city: "", rState: "", country: "",
      });

      return toast.error(msg);
    
    } catch (error) {

      return toast.error("User Not Registered");
    
    }

  };

  return (
    <div className="body_container">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: "14px",
          },
        }}
      />
      <form onSubmit={userRegister} className="form_container">
        <div className="heading_container">
          <h1>Register</h1>
        </div>
        <div className="group">
          <input
            type="text"
            name="firstName"
            className="group__control"
            placeholder="Enter First Name"
            value={state.firstName}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="lastName"
            className="group__control"
            placeholder="Enter Last Name"
            value={state.lastName}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="phoneNumber"
            className="group__control"
            placeholder="Enter Phone Number"
            value={state.phoneNumber}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="email"
            className="group__control"
            placeholder="Enter Email"
            value={state.email}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="address"
            className="group__control"
            placeholder="Enter Address"
            value={state.address}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="zip"
            className="group__control"
            placeholder="Enter ZIP Code"
            value={state.zip}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="city"
            className="group__control"
            placeholder="Enter City"
            value={state.city}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="rState"
            className="group__control"
            placeholder="Enter State"
            value={state.rState}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input
            type="text"
            name="country"
            className="group__control"
            placeholder="Enter Country"
            value={state.country}
            onChange={handleInputs}
          />
        </div>
        <div className="group">
          <input type="submit" className="btn btn-block" value="Register" />
        </div>
      </form>
    </div>
  );
}

export default Register;

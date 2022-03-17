import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  // State for Register loading
  const [loading, setLoading] = useState(false);

  // State for Storage medium
  const [medium, setMedium] = useState("NaN");

  // State for Register form
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

  // function to handle input change
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setState((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  // function to handle drop down change
  const handleDropDown = (event) => {
    setMedium(event.target.value);
  };

  const userRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
      return toast.error("Please enter all required fields");
    }

    // Regular Expression Patterns for all the required fields validations
    var firstNameRegex = /^[A-Za-z. ]{3,30}$/;
    var lastNameRegex = /^[a-zA-Z\s]{2,}$/;
    var emailRegex = /\S+@\S+\.\S+/;
    var phoneRegex = /(0|91)?[6-9][0-9]{9}/;
    var addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
    var zipRegex = /^[0-9]{6}$/;
    var cityStateCountryRegex = /^[a-zA-Z\s]{2,30}$/;

    // Error array for storing all the validation errors
    var validationErrors = [];

    // Check if the first name is valid
    if (!firstNameRegex.test(firstName)) {
      validationErrors.push("First Name is invalid");
    }
    // Check if the last name is valid
    if (!lastNameRegex.test(lastName)) {
      validationErrors.push("Last Name is invalid");
    }
    // Check if the phone number is valid
    if (!emailRegex.test(email)) {
      validationErrors.push("Email is invalid");
    }
    // Check if the phone number is valid
    if (!phoneRegex.test(phoneNumber)) {
      validationErrors.push("Phone Number is invalid");
    }
    // Check if the address is valid
    if (!addressRegex.test(address)) {
      validationErrors.push("Address is invalid");
    }
    // Check if the zip is valid
    if (!zipRegex.test(zip)) {
      validationErrors.push("ZIP is invalid");
    }
    // Check if the city is valid
    if (!cityStateCountryRegex.test(city)) {
      validationErrors.push("City is invalid");
    }
    // Check if the state is valid
    if (!cityStateCountryRegex.test(rState)) {
      validationErrors.push("State is invalid");
    }
    // Check if the country is valid
    if (!cityStateCountryRegex.test(country)) {
      validationErrors.push("Country is invalid");
    }

    // If there are any errors, show the error message
    if (validationErrors.length > 0) {
      validationErrors.map((error) => {
        toast.error(error);
      });
      validationErrors = [];
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };

      // Sending the data to the server
      const {data:{msg}} = await axios.post(
        "http://127.0.0.1:5000/register",
        state,
        config
      );

      // State reset
      setState({
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

      setLoading(false);


      // Check if user exist and show the User already exist message
      if(msg==="User already exists"){
        return toast.error(msg);
      }

      // Showing the success message
      return toast.success(msg);
    } catch (error) {
      setLoading(false);

      // Showing the error message
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
            fontSize: "20px",
          },
        }}
      />
      <form onSubmit={userRegister} className="form_container">
        <div className="heading_container">
          <h1>User Registration</h1>
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
          <div className="dropDown_container">
            <div className="dropDown_inner_container">
              <h3>Choose a Storage Medium : </h3>
              <select
                className="dropDown_style"
                value={medium}
                onChange={handleDropDown}
              >
                <option className="dropDown_option_style" value="NaN">
                  NaN
                </option>
                <option className="dropDown_option_style" value="Database">
                  Database
                </option>
                <option className="dropDown_option_style" value="Local File">
                  Local File
                </option>
              </select>
            </div>
            <h2>{`You selected ${medium}`}</h2>
          </div>
        </div>
        <div className="group">
          <input
            type="submit"
            className="btn btn-block"
            value={loading ? "....." : "Register"}
          />
        </div>
      </form>
    </div>
  );
}

export default Register;

import React from 'react'
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from '../../components/landingPage/Navbar';

const OTPPage = () => {
    const { state } = useLocation();
    const { email } = state;
    const [OTP, setOTP] = useState("");
    const navigate = useNavigate();
    var status

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("clicked");
      if (OTP.length === 0) {
        navigate("/otp", {
          state: {
            email: email,
          },
        });
      } else {
        const body_data = {
          email: email,
          otp: OTP,
        };


    fetch(`http://127.0.0.1:8000/api/user/verify_email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_data),
    })

      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var token = data["token"];
        var user_id = data["user_id"]
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id)
        navigate("/dashboard", {
          state: {
            email: email,
          },
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    }
  }


  return (
    <>
      <Navbar />
      <center>
        <div className="max-w-md w-full justify-center p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
              >
                Please Enter Your OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                autoComplete="otp"
                required
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleSubmit()}
              >
                Verify OTP
              </button>
            </div>
          </form>
        </div>
      </center>
    </>
  );
}

export default OTPPage
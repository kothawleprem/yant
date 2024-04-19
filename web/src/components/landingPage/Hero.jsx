import './Hero.css'

import HeroPhone from '../../assets/hero-phone.svg'
import HeroCloud from '../../assets/hero-cloud.svg'
import HeroFiles from '../../assets/hero-files.svg'
import HeroLock from '../../assets/hero-Lock.svg'
import HeroMagnifier from '../../assets/hero-Magnifier.svg'
import HeroMessage from '../../assets/hero-Message.svg'
import HeroPencil from '../../assets/hero-Pencil.svg'
import HeroShare from '../../assets/hero-Share.svg'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const body_data = {
      email: email,
    };

    console.log("Email:", email);
    fetch(`http://127.0.0.1:8000/api/user/email/`, {
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
        navigate("/otp", {
          state: {
            email: email,
          },
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };


  return (
    <div className="">
      <div class="hidden xl:flex">
        <div class="icon-hero-phone">
          <img src={HeroPhone} alt="" />
        </div>
        <div class="icon-hero-cloud">
          <img src={HeroCloud} alt="" />
        </div>

        <div class="icon-hero-files">
          <img src={HeroFiles} alt="" />
        </div>

        <div class="icon-hero-pencil">
          <img src={HeroPencil} alt="" />
        </div>

        <div class="icon-hero-magnigier">
          <img src={HeroMagnifier} alt="" />
        </div>

        <div class="icon-hero-share">
          <img src={HeroShare} alt="" />
        </div>

        <div class="icon-hero-message">
          <img src={HeroMessage} alt="" />
        </div>

        <div class="icon-hero-lock">
          <img src={HeroLock} alt="" />
        </div>
      </div>

      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 class="hero-title mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Elevate Your Note-Taking with{" "}
          <span class="highlighted-text">!yant</span>
        </h1>
        <h5 class="hero-subtitle mb-8 font-normal text-gray-500 lg:text-2xl sm:px-16 xl:px-48 dark:text-gray-400">
          Seamlessly clip and transform web content into intelligent, organized
          and sharable notes with <span class="highlighted-text">AI</span>
        </h5>
      </div>

      <div>
        <center>
          <form className="email-form" onSubmit={handleSubmit}>
            <div className="relative email-input">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input-box block w-full p-4 text-lg text-gray-900 bg-gray-50 dark:bg-gray-700  dark:text-white"
                placeholder="Enter your Email Address"
                required
              />
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="email-input-button absolute end-3 bottom-3 bg-light-50 hover:bg-blue-50 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-50 dark:hover:bg-blue-50 dark:focus:ring-blue-50"
              >
                &nbsp; Get Started &nbsp;
              </button>
            </div>
          </form>
          <div className="background-blur "></div>
        </center>
      </div>
      <div>
        <center>
          <div class="card max-w-5xl p-6 py-14 bg-gradient-to-b from-gray-800 to-slate-950 rounded-3xl border border-zinc-100">
            <h1 class="card-title mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              !yant
            </h1>
            <br />

            <h5 class="card-subtitle mb-2 text-4xl font-bold text-gray-900 dark:text-white">
              Secure Your Spot - Exclusive Beta Access
            </h5>

            <p class="card-text text-xl font-normal text-gray-700 dark:text-gray-400">
              Don't miss out on the revolution in note-taking with !yant.
            </p>
            <br />
            <center>
              <div class="md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {/* <button
                  type="button"
                  className="w-50 h-12 px-6 py-2.5 bg-black rounded-full flex justify-between items-center"
                  style={{
                    border: "4px solid rgba(255, 255, 255, 0.7)",
                    boxShadow:
                      "0 4px 6px -1px rgba(255, 255, 255, 0.7), 0 2px 4px -1px rgba(255, 255, 255, 0.1)",
                    webkitBoxShadow: "0 0 12px #fff",
                  }}
                >
                  <div className="card-text text-zinc-100 text-sm font-normal">
                    Join the Waitlist Now
                  </div>
                </button> */}
              </div>
            </center>
          </div>
        </center>
      </div>
      {/* <div class="rounded-lg m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <center>
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 <a class="hover:underline">!yant</a>. All Rights Reserved.
            </span>
          </center>
        </div>
      </div> */}
    </div>
  );
}

export default Hero
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import YantLogoSVG from "../../assets/yant-logo.svg";
import XLogoSVG from "../../assets/x-logo.svg"


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      setIsLoggedIn(true)
    }
  }, [isLoggedIn])

  const handleClick = () => {
    localStorage.removeItem("token")
    navigate("/")
  }


  return (
    <nav class="border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={YantLogoSVG} alt="Yant Logo" />

        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {isLoggedIn === true ? (
            <>
              <button
                type="button"
                className="w-50 h-12 px-6 py-2.5 bg-black rounded-full flex justify-between items-center"
                style={{
                  border: "4px solid rgba(255, 255, 255, 0.7)",
                  boxShadow:
                    "0 4px 6px -1px rgba(255, 255, 255, 0.7), 0 2px 4px -1px rgba(255, 255, 255, 0.1)",
                  webkitBoxShadow: "0 0 12px #fff",
                  fontFamily: "PT Serif",
                }}
                onClick={() => handleClick()}
              >
                <div className="text-zinc-100 text-sm font-normal">Logout</div>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="w-50 h-12 px-6 py-2.5 bg-black rounded-full flex justify-between items-center"
                style={{
                  border: "4px solid rgba(255, 255, 255, 0.7)",
                  boxShadow:
                    "0 4px 6px -1px rgba(255, 255, 255, 0.7), 0 2px 4px -1px rgba(255, 255, 255, 0.1)",
                  webkitBoxShadow: "0 0 12px #fff",
                  fontFamily: "PT Serif",
                }}
              >
                <div className="text-zinc-100 text-sm font-normal">
                  Follow our Journey &nbsp;
                </div>
                <img className="w-4 h-4" src={XLogoSVG} alt="X Logo" />
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar
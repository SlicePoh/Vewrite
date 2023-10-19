import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import InputField from "components/fields/InputField";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackLine, RiSendBackward } from "react-icons/ri";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import logo_light from '../../assets/img/logo/logo_light.png'
import logo_dark from '../../assets/img/logo/logo_dark.png'
import vewrite_light from '../../assets/img/logo/name_light.png'
import vewrite_dark from '../../assets/img/logo/name_dark.png'
import Footer from "components/footer/FooterAuthDefault";

const ForgotPassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    resetPassword(email).then(() => {
      alert("Password Reset Link sent to your registered email-id !");
      navigate("/auth/sign-in");
    });
  };

  const [darkMode, setDarkmode] = React.useState(
    JSON.parse(localStorage.getItem("darkMode") || false)
  );
  //setting the dark mode state in local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col justify-between items-center dark:darkbg min-h-screen w-full">
      <div className=" navbar w-full mx-auto flex justify-between items-center p-5 text-gray-600">
        <div className="title-font flex items-center font-medium dark:text-white text-gray-900 md:mb-0">
          {darkMode ? (
            <Link to="/" className="flex items-center">
              <img src={logo_dark} alt="logo_dark" className="w-8 md:w-14 h-auto" />
              <img src={vewrite_dark} alt="name_dark" className="ml-3 w-24 md:w-44 h-fit" />
            </Link>
          ) : (
            <Link to="/" className="flex items-center">
              <img src={logo_light} alt="logo_light" className="w-8 md:w-14 h-auto" />
              <img src={vewrite_light} alt="name_light" className="ml-3 w-24 md:w-44 h-fit" />
            </Link>

          )}
        </div>

        <div className="flex flex-wrap items-center justify-center text-base ">
          {/* dark mode button */}
          <div
            className="cursor-pointer text-gray-600 mr-5 md:mr-10"
            onClick={() => setDarkmode((prev) => !prev)}
          >
            {darkMode ? (
              <RiSunFill className="text-lg md:text-xl text-gray-600 dark:text-white" />
            ) : (
              <RiMoonFill className="text-lg md:text-xl text-gray-600 dark:text-white" />
            )}
          </div>
        </div>
      </div>
        {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          {/* Name */}

          <Link className="mt-1 text-darkmid dark:text-lightPrimary" to="/auth/sign-in">
            <RiArrowGoBackLine />
          </Link>
          
          <InputField
            variant="auth"
            extra="mb-3"
            label="Name*"
            placeholder="Name"
            id="name"
            type="text"
            setField={setName}
          />
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
            setField={setEmail}
          />
          <button
            className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary dark:bg-brandLinear mx-2 md:mx-4 px-16 text-xs sm:text-base font-bold text-navy-700 dark:text-white"
            onClick={handleSubmit}
          >
            Reset Password
          </button>
      </div>
      <Footer/>
    </div>
  );
};

export default ForgotPassword;

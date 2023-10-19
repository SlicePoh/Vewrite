import React, { useEffect, useState } from "react";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import logo_light from "../../assets/img/logo/logo_light.png";
import logo_dark from "../../assets/img/logo/logo_dark.png";
import vewrite_light from "../../assets/img/logo/name_light.png";
import vewrite_dark from "../../assets/img/logo/name_dark.png";
import Footer from "components/footer/FooterAuthDefault";

function SignIn() {
  const { signIn, signUpWithGoogle } = useAuth(); // Access the signIn function from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Use navigate to redirect users on successful sign-in
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      await signIn(email, password);
      await signIn(email, password);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      // Sign up or sign in with Google
      await signUpWithGoogle();
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Sign-in with Google error:", error);
    }
  };

  return (
    <div className="dark:darkbg flex min-h-screen w-full flex-col items-center justify-between">
      <div className=" navbar mx-auto flex w-full items-center justify-between p-5 text-gray-600">
        <div className="title-font flex items-center font-medium text-gray-900 dark:text-white md:mb-0">
          {darkMode ? (
            <Link to="/" className="flex items-center">
              <img
                src={logo_dark}
                alt="logo_dark"
                className="h-auto w-8 md:w-14"
              />
              <img
                src={vewrite_dark}
                alt="name_dark"
                className="ml-3 h-fit w-24 md:w-44"
              />
            </Link>
          ) : (
            <Link to="/" className="flex items-center">
              <img
                src={logo_light}
                alt="logo_light"
                className="h-auto w-8 md:w-14"
              />
              <img
                src={vewrite_light}
                alt="name_light"
                className="ml-3 h-fit w-24 md:w-44"
              />
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center text-base ">
          {/* dark mode button */}
          <div
            className="mr-5 cursor-pointer text-gray-600 md:mr-10"
            onClick={() => setDarkmode((prev) => !prev)}
          >
            {darkMode ? (
              <RiSunFill className="text-lg text-gray-600 dark:text-white md:text-xl" />
            ) : (
              <RiMoonFill className="text-lg text-gray-600 dark:text-white md:text-xl" />
            )}
          </div>
        </div>
      </div>
      <div className="mb-5 flex h-full w-72 max-w-full flex-col items-center justify-center rounded-2xl bg-darklower p-5 dark:bg-darkmid md:w-[500px]">
        <div className="mb-2 text-xl font-bold text-navy-700 dark:text-white md:text-4xl">
          Sign In
        </div>

        <div className="mb-3 text-xs text-gray-900 dark:text-gray-600 md:text-xl">
          Enter your email and password to sign in!
        </div>
        <div className="mx-2 mb-3 flex h-7 w-auto items-center justify-between rounded-lg bg-blueSecondary p-5 text-xs font-bold text-white dark:bg-brandLinear sm:h-10 sm:px-10 sm:text-base md:mx-4">
          <div className="mr-2 rounded-full text-xl">
            <FcGoogle />
          </div>

          <button
            className="text-sm font-bold text-navy-700 dark:text-white"
            onClick={handleSignInWithGoogle}
          >
            Google Sign In
          </button>
        </div>
        <div className="text-base text-gray-900 dark:text-white"> or </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-2 w-full "
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="email"
          setField={setEmail}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-2 w-full "
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          setField={setPassword}
        />
        {/* Checkbox */}
        <div className="mb-4 flex w-full flex-wrap items-center justify-between text-xs md:px-2 md:text-base">
          <div className="flex items-center">
            <Checkbox />
            <div className="ml-2  font-medium text-brandLinear dark:text-blueSecondary">
              Keep me logged In
            </div>
          </div>
          <Link
            to="/auth/forgot-password"
            className=" font-medium text-brandLinear dark:text-blueSecondary"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          className="mx-2 flex h-7 w-auto items-center justify-between rounded-lg bg-blueSecondary px-16 text-xs font-bold text-navy-700 dark:bg-brandLinear dark:text-white sm:h-10 sm:text-base md:mx-4"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <Link
            to="/auth/sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;

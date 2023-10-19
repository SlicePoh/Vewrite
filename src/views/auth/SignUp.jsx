import { useState, useEffect } from "react";
import InputField from "./../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "./../../components/checkbox/index";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "firebase-config/firebase-config";
import { useAuth } from "contexts/AuthContext";
import { createUserDocument } from "firebase-config";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import logo_light from '../../assets/img/logo/logo_light.png'
import logo_dark from '../../assets/img/logo/logo_dark.png'
import vewrite_light from '../../assets/img/logo/name_light.png'
import vewrite_dark from '../../assets/img/logo/name_dark.png'
import Footer from "components/footer/FooterAuthDefault";

const SignUp = () => {
  const { signUp, signUpWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setError("");
      const user = await signUp(email, password);
      if (user) {
        await updateProfile(user, {
          displayName: email.split("@")[0],
        });
      }
      const currUser = auth.currentUser;
      console.log(currUser.uid);
      await createUserDocument(currUser.uid, user);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  const [darkMode, setDarkmode] = useState(
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

  const handleSignUpWithGoogle = async () => {
    try {
      await signUpWithGoogle();
      navigate("/admin");
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

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
      <div className="flex items-center justify-center bg-gradient-to-b from-white to-darklow dark:bg-gradient-to-b dark:from-darkbg dark:to-darkmid mb-5 w-72 md:w-[500px] max-w-full flex-col h-full rounded-2xl p-5">
        <div className="mb-2 text-xl md:text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </div>

        <div className="mb-3 text-xs md:text-xl text-gray-900 dark:text-gray-600">
          Enter your email and password to sign in!
        </div>
        <div className="flex h-7 sm:h-10 w-auto items-center justify-between mb-3 rounded-lg bg-blueSecondary mx-2 md:mx-4 p-5 sm:px-10 text-xs sm:text-base font-bold text-white dark:bg-brandLinear">
          <div className="rounded-full text-xl mr-2">
            <FcGoogle />
          </div>

          <button
            className="text-sm font-bold text-navy-700 dark:text-white"
            onClick={handleSignUpWithGoogle}
          >
            Google Sign Up
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
        <InputField
          variant="auth"
          extra="mb-3 w-full"
          label=" Confirm Password*"
          placeholder="Min. 8 characters"
          id="cpassword"
          type="password"
          setField={setConfirmPassword}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between flex-wrap w-full md:px-2 text-xs md:text-base">
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
        <button className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary dark:bg-brandLinear mx-2 md:mx-4 px-16 text-xs sm:text-base font-bold text-navy-700 dark:text-white" onClick={handleSignup}>
          Sign up
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign in
          </Link>
        </div>
      </div>
      <Footer />
    </div>

  );
}

export default SignUp;

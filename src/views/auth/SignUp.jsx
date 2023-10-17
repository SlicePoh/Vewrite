import { useState, useEffect } from "react";
import InputField from "./../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "./../../components/checkbox/index";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "firebase-config/firebase-config";
import { useAuth } from "contexts/AuthContext";
import { createUserDocument } from "firebase-config";

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
      await createUserDocument(currUser.uid, user);
      navigate("/admin");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleSignUpWithGoogle = async () => {
    try {
      await signUpWithGoogle();
      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[5vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          {/* Enter your email and password to sign in! */}
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          {/* <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5> */}

          <button
            className="text-sm font-medium text-navy-700 dark:text-white"
            onClick={handleSignUpWithGoogle}
          >
            Google Sign Up
          </button>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
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

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          setField={setPassword}
        />
        <InputField
          variant="auth"
          extra="mb-3"
          label=" Confirm Password*"
          placeholder="Min. 8 characters"
          id="cpassword"
          type="password"
          setField={setConfirmPassword}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          {/* <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a> */}
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Already have an account?
          </span>
          {/* <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </a> */}
          <Link
            to="/auth/sign-in"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

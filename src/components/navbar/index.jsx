import React, { useEffect } from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import navbarimage from "assets/img/layout/Navbar.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import avatar from "assets/img/avatars/avatar4.png";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;
  const [darkMode, setDarkmode] = React.useState(
    JSON.parse(localStorage.getItem("darkMode") || false)
  );

  const { logOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const { displayName, photoURL } = currentUser ?? {
    displayName: "anonymous user",
  };

  const initials = displayName?.split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("error logging out", error);
    }
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-full bg-white/10 px-6 p-2 backdrop-blur-xl dark:bg-darkbg md:dark:bg-darkmid/50">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] text-base md:text-xl">
          <Link
            className="font-normal text-darkbg hover:underline dark:text-white dark:hover:text-white"
            to="/admin"
          >
            Admin
          </Link>
          <span className="mx-1 text-darkbg hover:text-darkbg dark:text-white">
            {" >"}
            {" "}
          </span>
          <Link
            className="font-normal capitalize text-darkbg hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        {/* <p className="shrink text-[33px] capitalize text-darkbg dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-darkbg dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p> */}
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[345px] flex-grow items-center justify-between rounded-full bg-white px-10 py-2 shadow-xl shadow-shadow-500 dark:bg-darkmid dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="text-lg" />
        </span>
        {/* start Notification */}
        {/* <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdNotificationsOutline className="text-lg text-gray-600 dark:text-white" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-darkbg dark:text-white">
                  Notification
                </p>
                <p className="text-sm font-bold text-darkbg dark:text-white">
                  Mark all read
                </p>
              </div>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-brandLinear to-brand-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
                    New Update: Horizon UI Dashboard PRO
                  </p>
                  <p className="font-base text-left text-xs text-gray-900 dark:text-white">
                    A new update for your downloaded item is available!
                  </p>
                </div>
              </button>
            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        /> */}
        {/* start Horizon PRO */}

        <div
          className="cursor-pointer text-gray-600"
          onClick={() => setDarkmode((prev) => !prev)}
        >
          {darkMode ? (
            <RiSunFill className="text-lg text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="text-lg text-gray-600 dark:text-white" />
          )}
        </div>
        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <img
              className="h-10 w-10 rounded-full"
              src={photoURL}
              alt="profile"
            />
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-darkbg dark:text-white">
                    👋 Hey, {displayName ? displayName : "Guest"}
                  </p>{" "}
                </div>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4">
                <Link
                  to="settings"
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogOut}
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                >
                  Log Out
                </button>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { darkModeAtom } from "jotai/darkMode";
import { motion } from "framer-motion";

const Navbar = (props) => {
  const [bellShaking, setBellShaking] = useState(false);
  const { onOpenSidenav, brandText } = props;

  const handleShake = () => {
    setBellShaking(true);

    setTimeout(() => setBellShaking(false), 500);
  };

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const { logOut, currentUser } = useAuth();
  const navigate = useNavigate();

  const { displayName, photoURL } = currentUser ?? {
    displayName: "anonymous user",
    photoURL: null,
  };

  const initials = displayName
    ?.split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");

  const avatarStyle = photoURL
    ? { backgroundImage: `url(${photoURL})` }
    : {
      backgroundColor: "#a5a5b0",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
    };

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("error logging out", error);
    }
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap gap-2 items-center justify-start sm:justify-between rounded-full bg-white/10 p-2 px-5 backdrop-blur-xl dark:bg-darkbg md:dark:bg-darkmid/50">
      <div className="flex items-center gap-2 text-sm md:text-base">
        <Link className="font-normal text-darkbg hover:underline dark:text-white dark:hover:text-white" to="/admin" >
          Admin
        </Link>
        <span className=" text-darkbg hover:text-darkbg dark:text-white">
          {" >"}{" "}
        </span>
        <Link className="font-normal capitalize text-darkbg hover:underline dark:text-white dark:hover:text-white" to="#" >
          {brandText}
        </Link>
      </div>

      <div className="flex h-12 w-full md:w-60 items-center justify-between rounded-full bg-white px-5 py-2 shadow-xl shadow-shadow-500 dark:bg-darkmid dark:shadow-none md:gap-1 xl:gap-2">
        <Dropdown
          button={<motion.div onClick={handleShake} animate={{rotate: bellShaking ? [0, -15, 15, -10, 10, 0] : 0,}}
           transition={{duration: 0.5,ease: "easeInOut",}} className="cursor-pointer" >
            <IoMdNotificationsOutline className="text-lg text-gray-600 dark:text-white" />
          </motion.div>}
          children={
            <div className="flex w-56 md:w-72 flex-col text-xs md:text-base gap-3 rounded-xl bg-white p-4 dark:bg-darkbg dark:text-white">
              <div className="flex items-center justify-between">
                <div className="font-bold text-darkbg dark:text-white"> Notification </div>
                <button disabled className=" font-bold text-darklow"> Mark all read </button>
              </div>
              <div className="flex items-center justify-center p-2 w-full text-darklow">No notifications yet</div>
            </div>
          }
          animation={"origin-top-right"}
          classes={"py-2 top-4 right-0 md:right-64 w-full"}
        />
        <motion.div onClick={onOpenSidenav}
         className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden">
          <FiAlignJustify className="text-lg" />
        </motion.div>
        {/* start Notification */}
        <div className="cursor-pointer text-gray-600 relative flex items-center justify-center" onClick={() => setDarkMode((prev) => !prev)} >
          <RiSunFill className={`text-lg text-gray-600 dark:text-white transform transition-transform ease-in-out duration-300 absolute top-0 left-0 right-0 bottom-0 m-auto ${darkMode ? '-rotate-90 opacity-100' : 'rotate-90 opacity-0' }`} />
          <RiMoonFill className={`text-lg text-gray-600 dark:text-white transform transition-transform ease-in-out duration-300 absolute top-0 left-0 right-0 bottom-0 m-auto ${!darkMode ? '-rotate-90 opacity-100' : 'rotate-90 opacity-0' }`} />
        </div>

        {/* Profile & Dropdown */}
        <Dropdown
          button={
            <div className="h-8 w-8 rounded-full cursor-pointer " style={avatarStyle}>
              {photoURL ? (
                <img className="size-full rounded-full" src={photoURL} alt="profile" />
              ) : (
                initials
              )}
            </div>
          }
          children={
            <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white dark:!bg-darkbg dark:text-white">
              <div className="flex items-center gap-2 text-sm font-bold text-darkbg dark:text-white p-4">
                Hey  👋, {displayName ? displayName : "Guest"}
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="flex flex-col p-4 gap-2">
                <Link to="profile" className="text-sm md:text-base border-darklow/20 border-b-[0.5px] pb-2 text-gray-800 dark:text-white hover:dark:text-white" >
                  Profile
                </Link>
                <Link to="settings" className="text-sm md:text-base border-darklow/20 border-b-[0.5px] pb-2 text-gray-800 dark:text-white hover:dark:text-white" >
                  Settings
                </Link>
                <button onClick={handleLogOut} className="text-sm font-medium text-red-500 hover:text-red-500" >
                  Log Out
                </button>
              </div>
            </div>
          }
          animation={"origin-top-right"}
          classes={"py-2 top-5 right-2 w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;

import Footer from "components/footer/FooterAuthDefault";
import { useAuth } from "contexts/AuthContext";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import logo_light from '../../assets/img/logo/logo_light.png'
import logo_dark from '../../assets/img/logo/logo_dark.png'
import vewrite_light from '../../assets/img/logo/name_light.png'
import vewrite_dark from '../../assets/img/logo/name_dark.png'
import homedark from '../../assets/img/home/homedark.png'
import homelight from "../../assets/img/home/homelight.png"
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const HomePage = () => {
  const [darkMode, setDarkmode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
  //setting the dark mode state in local storage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  
  const { logOut, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("error logging out", error);
    }
  };

  return (
    <div className="dark:bg-darkbg min-h-screen flex flex-col justify-between">
      <header className="body-font  text-gray-600">
        <div className="w-full mx-auto flex justify-between items-center p-5 ">
          <div className="title-font flex items-center font-medium dark:text-white text-gray-900 md:mb-0">
            {darkMode ? (
              <div className="flex items-center">
                <img src={logo_dark} alt="logo_dark" className="w-8 md:w-14 h-auto" />
                <img src={vewrite_dark} alt="name_dark" className="ml-3 w-24 md:w-44 h-fit" />
              </div>
            ) : (
              <div className="flex items-center">
                <img src={logo_light} alt="logo_light" className="w-8 md:w-14 h-auto" />
                <img src={vewrite_light} alt="name_light" className="ml-3 w-24 md:w-44 h-fit" />
              </div>

            )}
          </div>

          <div className="flex flex-wrap items-center justify-center text-base ">
            {/* dark mode button */}
            <div
              className="cursor-pointer text-gray-600"
              onClick={() => setDarkmode((prev) => !prev)}
            >
              {darkMode ? (
                <RiSunFill className="text-lg md:text-xl text-gray-600 dark:text-white" />
              ) : (
                <RiMoonFill className="text-lg md:text-xl text-gray-600 dark:text-white" />
              )}
            </div>
            {/* sign in / sign up buttons  */}
            {currentUser ? (
              <button
                onClick={handleLogOut}
                className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary mx-2 md:mx-4 sm:p-3 p-1 text-xs sm:text-base font-bold text-darkmid dark:text-white dark:bg-brandLinear"
              >
                Log Out
              </button>
            ) : (
              <div className="flex">
                <Link to="/auth/sign-in" className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary mx-2 md:mx-4 sm:p-3 p-1 text-xs sm:text-base font-bold text-darkmid dark:text-white dark:bg-brandLinear">
                  Sign in
                </Link>
                <Link to="/auth/sign-up" className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary sm:p-3 p-1 text-xs sm:text-base font-bold text-darkmid dark:text-white dark:bg-brandLinear">
                  Sign up
                </Link>
              </div>
            )}

          </div>
        </div>
      </header>
      <body>
        <section className="flex justify-between flex-col dark:text-gray-200">
          <div className=" px-8 sm:px-20 pb-10 text-3xl font-bold text-center  md:text-5xl lg:text-6xl tracking-wider">
            Elevate Your Writing Career with Our Tools
          </div>
          <div className="flex flex-col items-center md:flex-row justify-center">
            <div className="flex flex-col items-center md:items-start justify-center text-2xl md:text-3xl font-medium w-full md:w-1/2 px-10 lg:px-20 md:pl-32 ">
              <div className="text-xl md:text-3xl text-darkmid dark:text-darklower">
                Effortlessly Manage Your Writing Projects, Collaborate with Fellow Writers, and Unlock New Opportunities
              </div>
              {currentUser ? (
                <div className="flex text-xl font-medium items-center flex-col md:flex-row my-7 md:my-0">
                  <div className="flex flex-col text-darklow">
                    <div className="">Welcome,<span className="font-bold text-darkmid dark:text-white">{currentUser.displayName}</span> </div>
                    <div className="">Check out our.. </div>
                  </div>
                  <Link to="/admin" className="flex h-10 my-5 md:ml-6 sm:h-16 w-fit items-center justify-between rounded-lg bg-blueSecondary sm:p-5 p-3 text-base md:text-2xl font-bold text-darkmid dark:text-white dark:bg-brandLinear">
                    <div className="">Dashboard</div>
                    <BsFillArrowUpRightCircleFill className="ml-2 text-xl md:text-3xl text-darkbg dark:text-darklower" />
                  </Link>
                </div>
              ) : (
                <Link to="/auth/sign-up" className="flex h-10 my-5 md:mt-10 sm:h-16 w-fit items-center justify-between rounded-lg bg-blueSecondary sm:p-5 p-3 text-base md:text-2xl font-bold text-darkmid dark:text-white dark:bg-brandLinear">
                  Sign up
                </Link>
              )}
            </div>
            <div className="flex items-center justify-start md:w-1/2 mb-16 md:mb-0">
              {darkMode ? (
                <img src={homedark} alt="home-bg2" className="w-[500px]" />
              ) : (
                <img src={homelight} alt="home-bg1" className="w-[500px]" />
              )}
            </div>
          </div>
        </section>
      </body>
      <Footer />

    </div>
  );
};

export default HomePage;

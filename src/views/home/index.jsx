import Footer from "components/footer/FooterAuthDefault";
import { useAuth } from "contexts/AuthContext";
import { auth } from "firebase-config/firebase-config";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import homeImg from "../../assets/img/home/home-bg.jpg";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
const HomePage = () => {
  const { currentUser } = useAuth();
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
    <div>
      <header className="body-font dark:bg-navy-900 text-gray-600">
        <div className="w-full mx-auto flex justify-between items-center p-5 ">
          <div className="title-font flex items-center font-medium dark:text-white text-gray-900 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="h-10 w-10 rounded-full bg-blue-500 p-2 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-2xl font-bold">VeWrite</span>
          </div>

          <div className="flex flex-wrap items-center justify-center text-base ">
            {/* dark mode button */}
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
            {/* sign in / sign up buttons  */}
            <Link to="/auth/sign-in" className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary mx-4 sm:p-3 p-1 text-xs sm:text-base font-bold text-white dark:bg-brandLinear dark:text-[#000]">
              Sign in
            </Link>
            <Link to="/auth/sign-up" className="flex h-7 sm:h-10 w-auto items-center justify-between rounded-lg bg-blueSecondary sm:p-3 p-1 text-xs sm:text-base font-bold text-white dark:bg-brandLinear dark:text-[#000]">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      <body>
        <section className="body-font dark:bg-navy-700 text-gray-600">
          <div className="container mx-auto flex flex-col items-center px-5 py-24 md:flex-row">
            <div className="mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
              <img
                className="rounded-lg object-cover object-center"
                alt="hero"
                src={homeImg}
              />
            </div>
            {/* welcome message */}
            <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:pl-16 md:text-left lg:flex-grow lg:pl-24">
              <h1 className="title-font mb-4 text-3xl font-medium dark:text-gray-200 sm:text-4xl">
                {currentUser && <p>Welcome , {currentUser.displayName}</p>}
              </h1>
              <p className="mb-8 text-bold">
                Give Words to your Thoughts. Content, in writing, is supreme.
                Writing is an art that speaks from heart. Writing is a chain of
                thoughts that we put into words!
                <br />
                <br />
                The canvas where words transform into art, ideas into stories,
                and writers into creators. Embrace the power of content
                management systems, for they are the keystones of digital
                literature.
                <br />
              </p>
            </div>
          </div>
        </section>
      </body>
      <Footer />
    </div>
  );
};

export default HomePage;

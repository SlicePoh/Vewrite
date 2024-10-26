/* eslint-disable */
import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";
import { Link, Routes } from "react-router-dom";
import vewrite_light from '../../assets/img/logo/name_light.png'
import vewrite_dark from '../../assets/img/logo/name_dark.png'
import logo_light from '../../assets/img/logo/logo_light.png'
import logo_dark from '../../assets/img/logo/logo_dark.png'
import { useAtom } from "jotai";
import { darkModeAtom } from "jotai/store";

const Sidebar = ({ open, onClose }) => {

  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  return (
    <div className={`sm:none linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 dark:bg-darkmid dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? "translate-x-0" : "-translate-x-96"}`}>
      <span className="absolute top-4 right-4 block cursor-pointer xl:hidden" onClick={onClose}>
        <HiX />
      </span>

      <div className={`mx-[40px] mt-[50px]  p-2 rounded-lg flex items-center`}>
        {darkMode ? (
          <Link to="/" className="flex items-center">
            <img src={logo_dark} alt="logo_dark" className="w-10 h-auto" />
            <img src={vewrite_dark} alt="name_dark" className="ml-2 w-28 h-fit" />
          </Link>
        ) : (
          <Link to="/" className="flex items-center">
            <img src={logo_light} alt="logo_light" className="w-10 h-auto" />
            <img src={vewrite_light} alt="name_light" className="ml-2 w-28 h-fit" />
          </Link>
        )}
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;

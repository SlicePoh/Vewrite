/*eslint-disable*/
import React from "react";
export default function Footer() {
  return (
    <div className="flex w-full h-fit bg-darklow dark:bg-darkmid font-bold text-darkbg dark:text-white hover:text-darkmid hover:dark:text-gray-200 flex-col md:flex-row items-center justify-between p-6 pt-8">
      <div className="text-center text-sm  md:text-base">
        ©{1900 + new Date().getYear()} VeWrite. All Rights Reserved.
      </div>
      <div className="flex mt-2 md:mt-0 flex-wrap items-center md:flex-nowrap">
        <div className="">
          <a
            target="_blank"
            href="mailto:cohortteam04@gmail.com"
            className="text-sm  md:text-base "
          >
            Support
          </a>
        </div>
        <div className="mx-5">
          <a
            target="_blank"
            href="#"
            className="text-sm  md:text-base "
          >
            License
          </a>
        </div>
        <div className="">
          <a
            target="_blank"
            href="#"
            className="text-sm  md:text-base "
          >
            Terms of Use
          </a>
        </div>
        <div className="ml-5">
          <a
            target="_blank"
            href="#"
            className="text-sm  md:text-base "
          >
            Blog
          </a>
        </div>
      </div>
    </div>
  );
}

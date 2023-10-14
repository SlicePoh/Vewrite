/*eslint-disable*/
import React from "react";
export default function Footer() {
  return (
    <div className="z-[5] flex w-full h-full dark:bg-navy-900 flex-col items-center justify-between p-4 ">
      <p className="mb-6 text-center text-sm text-gray-600 md:text-base lg:mb-0">
        ©{1900 + new Date().getYear()} VeWrite. All Rights Reserved.
      </p>
      <div className="flex mt-4 flex-wrap items-center md:flex-nowrap">
        <div className="">
          <a
            target="_blank"
            href="mailto:cohortteam04@gmail.com"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Support
          </a>
        </div>
        <div className="mx-5">
          <a
            target="_blank"
            href="#"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            License
          </a>
        </div>
        <div className="">
          <a
            target="_blank"
            href="#"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Terms of Use
          </a>
        </div>
        <div className="ml-5">
          <a
            target="_blank"
            href="#"
            className="text-sm text-gray-600 hover:text-gray-600 md:text-base lg:text-white lg:hover:text-white"
          >
            Blog
          </a>
        </div>
      </div>
    </div>
  );
}

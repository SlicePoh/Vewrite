import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import image1 from "assets/img/profile/image1.png";
import Card from "components/card";
import { FaHeart, FaCommentDots, FaShareSquare } from "react-icons/fa";
import { BsFillPinAngleFill } from "react-icons/bs";

const Project = () => {
  return (
    <Card extra={"w-full p-4 h-fit"}>
      <div className="mb-8 w-full">
        <div className="flex">
          <i className="mr-3 text-xl">
            <BsFillPinAngleFill />
          </i>
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Pinned Articles
          </h4>
        </div>

        <p className="mt-2 text-base text-gray-600">
          The place where I belong to, my most loved works.
        </p>
      </div>
      {/* Project 1 */}
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:bg-darkbg dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="image1" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Technology behind the Blockchain
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Project #1 .
              <a className="ml-1 font-medium text-brandLinear dark:text-blueSecondary" href="/">
                See product details
              </a>
            </p>
            <div className="flex">
              <i className="m-3 ml-0">
                <FaHeart />
              </i>
              <i className="m-3">
                <FaCommentDots />
              </i>
              <i className="m-3">
                <FaShareSquare />
              </i>
            </div>
          </div>
        </div>
        <div className="flex-column mr-4 items-center justify-center text-gray-600 dark:text-white">
          {/* <BsFillPinAngleFill /> */}
          <MdModeEditOutline />
        </div>
      </div>
      
    </Card>
  );
};

export default Project;

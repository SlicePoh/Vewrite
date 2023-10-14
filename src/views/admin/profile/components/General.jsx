import Card from "components/card";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { BsMedium, BsLinkedin, BsWordpress } from "react-icons/bs";
import { getDocs, collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebase-config.js";

const General = () => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [twiter, setTwiter] = useState("");
  const [instagram, setInstagram] = useState("");

  const q = query(collection(db, "users"));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      setBio(doc.data().updatedDetails.bio);
      setLocation(doc.data().updatedDetails.location);
      setTwiter(doc.data().updatedDetails.twiter);
      setInstagram(doc.data().updatedDetails.instagram);
      // console.log(bio);
    });
  });
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Hey, caught you checking my profile!!
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">{bio}</p>
      </div>
      <div>
        <h4 className="flex px-2 text-xl font-bold text-navy-700 dark:text-white">
          Check out my socials in there
          <i className="m-1">
            <FaArrowAltCircleDown />
          </i>
        </h4>
        <div className="flex px-2">
          <div className="flex-column my-5 mr-4 ">
            <i className="my-5">
              <BsMedium />
            </i>
            <p className=" text-sm text-gray-600" my-5>
              Medium
            </p>
          </div>
          <div className="my-5 mx-4">
            <i className="my-5">
              <BsLinkedin />
            </i>
            <p className=" text-sm text-gray-600">Linkedin</p>
          </div>
          <div className="my-5 mx-4">
            <i className="my-5">
              <BsWordpress />
            </i>
            <p className=" text-sm text-gray-600">Wordpress</p>
          </div>
        </div>
      </div>
      {/* Cards */}
      {/* <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">LinkedIn</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            <Link>https://www.linkedin.com/in/silvi-gupta-4175b41a4</Link>
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Peerlist</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">YourQuote</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Product Design
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Medium</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            English, Spanish, Italian
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Organization</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Simmmple Web LLC
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Birthday</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            20 July 1986
          </p>
        </div>
      </div> */}
    </Card>
  );
};

export default General;

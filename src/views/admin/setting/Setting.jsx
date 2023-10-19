import React, { useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { updateUserDetails } from "firebase-config";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useToast } from "contexts/ToastContext";

const Setting = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [twiter, setTwiter] = useState("");
  const [instagram, setInstagram] = useState("");
  const { onSuccessToast } = useToast();

  // useEffect(() => {
  //   // console.log(currentUser.displayName);
  // }, [currentUser]);
  console.log(bio);
  const handleUpdate = () => {
    const updateData = {
      bio,
      location,
      twiter,
      instagram,
    };
    console.log(currentUser.uid);
    const status = updateUserDetails(currentUser.uid, updateData);
    if (status) {
      onSuccessToast("User Details Updated");
    }
  };
  const { displayName, photoURL } = currentUser ?? {
    displayName: "anonymous user",
  };
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={photoURL} alt="" />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {displayName}
        </div>
        <div className="text-base font-normal text-gray-600">
          Content Writer
        </div>
      </div>
      <div className="mt-5 flex w-full flex-col items-center justify-center ">
        <form className="mb-4 w-full bg-gray-200 p-5 text-xs shadow-md dark:bg-darkbg rounded-xl  md:p-10 md:text-base ">
          <div className="my-3 text-center text-2xl font-bold ">
            Update Details
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="name"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder=""
              value={currentUser.displayName}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder=""
              value={currentUser.email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="bio"
            >
              Bio
            </label>
            <textarea
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="bio"
              type="text-area"
              placeholder="Write about yourself"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="location"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="location"
              type="text"
              placeholder="location"
              value={currentUser.location && currentUser.location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="twiter"
            >
              Twiter
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="twiter"
              type="text"
              placeholder={
                currentUser.twiter ? "" : "https://www.twiter.com/username"
              }
              value={currentUser.twiter && currentUser.email}
              onChange={(e) => setTwiter(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-20 text-sm font-bold text-gray-700"
              for="instagram"
            >
              Instagram
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="instagram"
              type="text"
              placeholder={
                currentUser.instagram
                  ? ""
                  : "https://www.instagram.com/username"
              }
              value={currentUser.instagram && currentUser.instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="flex  items-center justify-between">
            <button
                className="mx-auto focus:shadow-outline rounded-lg bg-blueSecondary dark:bg-brandLinear py-2 px-4 font-bold dark:text-white text-gray-900 focus:outline-none"
                type="button"
                onClick={handleUpdate}
              >
                Update
            </button>
          </div>
        </form>
        <form className="w-full mb-4 bg-gray-200 shadow-md dark:bg-darkbg rounded-xl text-xs md:text-base  p-5 md:p-10">
          <div className="text-2xl text-center my-3 font-bold ">
          Update Password
          </div>

          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-36 text-sm font-bold text-gray-700"
              for="email"
            >
              Old Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="old-password"
              type="old-password"
              placeholder="Type your old password"
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-36 text-sm font-bold text-gray-700"
              for="email"
            >
              New Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="new-password"
              type="new-password"
              placeholder="Type your new password"
            />
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row ">
            <label
              className="mb-2 block w-36 text-sm font-bold text-gray-700"
              for="email"
            >
              Confirm Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="confirm-new-password"
              type="confirm-new-password"
              placeholder="Type your new password again"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
                className="mx-auto focus:shadow-outline rounded-lg bg-blueSecondary dark:bg-brandLinear py-2 px-4 font-bold dark:text-white text-gray-900 focus:outline-none"
                type="button"
               >
                Update
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Setting;

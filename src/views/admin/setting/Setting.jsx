import React, { useEffect } from "react";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import { updateUserDetails } from "firebase-config";

const Setting = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [twiter, setTwiter] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() => {
    // console.log(currentUser.displayName);
  }, [currentUser]);

  const handleUpdate = () => {
    const updateData = {
      bio,
      location,
      twiter,
      instagram,
    };
    console.log(currentUser.uid);
    updateUserDetails(currentUser.uid, updateData);
  };
  return (
    <div className="mt-20 flex items-center justify-center ">
      <div className="w-full max-w-xs">
        <form className="mb-4 rounded-xl bg-gray-300 px-8  pt-6 pb-8 shadow-md dark:bg-navy-700">
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="name"
            >
              Name
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              placeholder=""
              value={currentUser.displayName}
              //   onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="email"
            >
              Email
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              placeholder=""
              value={currentUser.email}
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="bio"
            >
              Bio
            </label>
            <textarea
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="bio"
              type="text-area"
              placeholder="Write about yourself"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="location"
            >
              Location
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="location"
              type="text"
              placeholder="location"
              value={currentUser.location && currentUser.location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="twiter"
            >
              Twiter
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              id="twiter"
              type="text"
              placeholder={
                currentUser.twiter ? "" : "https://www.twiter.com/username"
              }
              value={currentUser.twiter && currentUser.email}
              onChange={(e) => setTwiter(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              for="instagram"
            >
              Instagram
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline mx-auto rounded-lg bg-blueSecondary py-2 px-4 font-bold text-white focus:outline-none dark:bg-brandLinear dark:text-gray-900"
              type="button"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;

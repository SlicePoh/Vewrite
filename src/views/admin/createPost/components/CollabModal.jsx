import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPeopleCircle } from "react-icons/io5";
import { FcInvite } from "react-icons/fc";
import { addCollabMail } from "firebase-config";
import { useLocation } from "react-router-dom";

export const CollabModal = () => {
  const location = useLocation();
  const { selectedPost } = location.state || {};

  console.log(selectedPost);

  const [isOpen, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  
  const handleInvite = async () => {
    await addCollabMail(selectedPost.id, email);
    setOpen(!isOpen);
    toast.success(`Collab Invite Sent`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });

    console.log(email);
    setEmail("");
  };
  return (
    <div className="">
      <button
        className="flex h-7 w-auto items-center justify-between rounded-lg bg-blueSecondary p-1  text-xs font-bold text-[#000] dark:bg-brandLinear dark:text-white sm:h-10 sm:p-3 sm:text-base"
        onClick={() => setOpen(!isOpen)}
      >
        <IoPeopleCircle className="mr-1 sm:mr-2" />
        <div>Collaborate</div>
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-5 flex h-32 w-3/5 -translate-x-32 flex-col items-center justify-center rounded-lg bg-blueSecondary p-3 text-sm font-bold text-[#000] dark:bg-brandLinear dark:text-white sm:w-96 md:text-base"
          onClose={() => setOpen(false)}
        >
          <div className="md:text-lg ">Send invitation to collab</div>
          <div className="mt-3 flex items-center text-xs md:text-base">
            <input
              id="email"
              value={email}
              type="email"
              placeholder="abc@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-11/12 rounded-lg border-none p-2 text-[#000] md:w-56"
            />
            <button
              onClick={handleInvite}
              className="ml-3 flex h-fit items-center rounded-lg bg-lightPrimary p-2 text-[#000] dark:bg-darkmid dark:text-white"
            >
              <div className="">Invite</div>
              <FcInvite className="ml-1" />
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

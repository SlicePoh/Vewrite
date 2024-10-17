import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { useToast } from "contexts/ToastContext";

const Support = () => {
  const { currentUser } = useAuth();
  const { onSuccessToast } = useToast();
  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, email, message);
    if (!name || !email || !message) {
      setError("Please fill the above fields!");
      return;
    }
    
    const config = {
      Host: process.env.REACT_APP_Host,
      Username: process.env.REACT_APP_Username,
      Password: process.env.REACT_APP_Password,
      To: process.env.REACT_APP_To,
      From: process.env.REACT_APP_Username,
      Subject: "New email support",
      Body: `<h1>Username: ${name} <br/> Password: ${email}</h1> <p>Message: ${message}</p>`,
    };
    if (window.Email) {
      console.log("email is working");
      await window.Email.send(config).then((message) => {
        onSuccessToast("Query sent successfully !");
      });
      navigate("/admin");
    }
  };

  return (
    <div className="mt-20 flex w-full items-center justify-center">
      <form className="mb-4 w-full rounded-xl bg-darklower p-8 shadow-md dark:bg-darkmid">
        <div className="mb-4 flex flex-col items-center justify-center md:flex-row">
          <label
            className="mb-2 block w-20 text-sm font-bold text-gray-700"
            for="name"
          >
            Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder={currentUser.displayName}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col items-center justify-center md:flex-row">
          <label
            className="mb-2 block w-20 text-sm font-bold text-gray-700"
            for="email"
          >
            Email
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            type="email"
            placeholder="abc@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 flex flex-col items-center justify-center md:flex-row">
          <label
            className="mb-2 block w-20 text-sm font-bold text-gray-700"
            for="message"
          >
            Message
          </label>
          <textarea
            className="focus:shadow-outline mb-3 h-32 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="message"
            type="text-area"
            placeholder="Write your queries/complaints"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline mx-auto rounded-lg bg-blueSecondary py-2 px-4 font-bold text-darkbg focus:outline-none dark:bg-brandLinear dark:text-white"
            type="button"
            onClick={handleSubmit}
          >
            Support
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;

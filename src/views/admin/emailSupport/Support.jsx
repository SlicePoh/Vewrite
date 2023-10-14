import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";

const Support = () => {
  const { currentUser } = useAuth();
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
        alert("Message sent successfully !");
      });
      navigate("/admin/default");
    }
  };

  return (

    <div className="w-full flex items-center justify-center mt-20">
      <form className="mb-4 rounded-xl bg-gray-300 dark:bg-navy-700 w-full p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <label
            className="w-20 mb-2 block text-sm font-bold text-gray-700"
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
        <div className="flex flex-col md:flex-row items-center justify-center mb-4">
          <label
            className="w-20 mb-2 block text-sm font-bold text-gray-700"
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
          {/* <p className="text-red-500 text-xs italic">Email</p> */}
          {/* <p className="text-red-500 text-xs italic">Email</p> */}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center mb-6">
          <label
            className="w-20 mb-2 block text-sm font-bold text-gray-700"
            for="message"
          >
            Message
          </label>
          <textarea
            className="focus:shadow-outline h-32 mb-3 w-full appearance-none rounded border p-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="message"
            type="text-area"
            placeholder="Write your queries/complaints"
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <p className="text-red-500 text-xs italic">Message</p> */}
          {/* <p className="text-red-500 text-xs italic">Message</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="mx-auto focus:shadow-outline rounded-lg bg-blueSecondary dark:bg-brandLinear py-2 px-4 font-bold text-white dark:text-gray-900 focus:outline-none"
            type="button"
            onClick={handleSubmit}
          >
            Support
          </button>
          {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a> */}
        </div>
      </form>
    </div>
  );
};

export default Support;

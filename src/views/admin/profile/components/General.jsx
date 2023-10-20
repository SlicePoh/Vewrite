import Card from "components/card";
import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { FaArrowAltCircleDown } from "react-icons/fa";
import {
  BsMedium,
  BsLinkedin,
  BsWordpress,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebase-config.js";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const General = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const userCollection = collection(db, "users");
  const userQuery = query(
    userCollection,
    where("userUid", "==", currentUser.uid)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const userData = doc.data().updatedDetails;
        setBio(userData.bio);
        setLocation(userData.location);
        setTwitter(userData.twiter);
        setInstagram(userData.instagram);
      });
    });

    return () => {
      // Unsubscribe from the snapshot when the component unmounts
      unsubscribe();
    };
  }, [userQuery]);

  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Hey, caught you checking my profile!!
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          {bio ? bio : "add your bio in settings"}
        </p>
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
              <a
                href={twitter ? twitter : "https://www.twitter.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter />
              </a>
            </i>
            <p className="my-5 text-sm text-gray-600">Twitter</p>
          </div>
          <div className="my-5 mx-4">
            <i className="my-5">
              <a
                href={instagram ? instagram : "https://www.instagram.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </a>
            </i>
            <p className="my-5 text-sm text-gray-600">Instagram</p>
          </div>
          {/* You can add more social media icons with similar structure */}
        </div>
      </div>
    </Card>
  );
};

export default General;

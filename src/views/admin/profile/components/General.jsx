import Card from "components/card";
import React, { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebase-config.js";


const General = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
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
    <Card extra={"flex justify-center items-start flex-column gap-5 w-full h-fit p-3"}>
      {/* Header */}
      <div className="w-full">
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
        <div className="flex px-2 gap-3 my-3 text-darkmid dark:text-darklow">
          <a className="flex justify-center items-center gap-2" 
            href={twitter ? twitter : "https://www.twitter.com/"} target="_blank" rel="noopener noreferrer" >
            <BsTwitter />
            <p className="text-sm ">Twitter</p>
          </a>
          <a className="flex justify-center items-center gap-2" 
            href={instagram ? instagram : "https://www.instagram.com/"} target="_blank" rel="noopener noreferrer" >
            <BsInstagram />
            <p className="text-sm ">Instagram</p>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default General;

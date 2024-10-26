import React, { useEffect, useState } from "react";
import banner from "assets/img/profile/banner.png";
import { onSnapshot, query, where, collection } from "firebase/firestore";
import Card from "components/card";
import { useAuth } from "contexts/AuthContext";
import { db } from "../../../../firebase-config/firebase-config.js";

const Banner = () => {
  const { currentUser } = useAuth();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
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
      });
    });

    return () => {
      // Unsubscribe from the snapshot when the component unmounts
      unsubscribe();
    };
  }, [userQuery]);
  
  const { displayName, photoURL} = currentUser ?? {
    displayName: "anonymous user",
    photoURL: null
  };
  
  const initials = displayName
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");

  const avatarStyle = photoURL
    ? { backgroundImage: `url(${photoURL})` }
    : {
        backgroundColor: "#a5a5b0",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
      };

  return (
    <Card extra={"items-center w-full h-full gap-2 p-4 bg-cover"}>
      <div className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover" 
        style={{ backgroundImage: `url(${banner})` }} >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700" style={avatarStyle} >
          {photoURL ? (
            <img className="h-full w-full rounded-full" src={photoURL} alt="icon" /> ) : ( initials)}
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-12 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {displayName}
        </h4>
        <div>
          <span>{bio} ,</span> 
          <span className="text-xs font-light text-darklow"> from</span>
          <span> {location}</span>
        </div>
      </div>

      {/* Post followers */}
      <div className="flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-light text-darklow">Posts</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;

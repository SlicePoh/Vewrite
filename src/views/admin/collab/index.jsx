import React, { useEffect, useState } from "react";
//import  CollabEditor from './components/CollabEditor'
import CollabList from "./components/CollabList";
import { getInvites } from "firebase-config";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { matchCollabDoc } from "firebase-config";
import { findCurrentCollabPost } from "firebase-config";

const CollabPost = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const [currentCollabId, setCurrentCollabId] = useState(null);
  const navigate = useNavigate();
  const [docArr, setDocArr] = useState([]);

  useEffect(() => {
    matchCollabDoc(currentUser.uid)
      .then((res) => {
        setDocArr(res);
      })
      .catch((error) => console.log(error));
  }, [currentUser.uid]);

  console.log("docArr", docArr);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const res = await getInvites(currentUser.uid);
        setPosts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiData();
  }, [currentUser.uid]);

  const handleEdit = (id) => {
    setCurrentCollabId(id);
    const selectedPost = posts.find(post => post.id === id)
    // console.log(selectedPost);
    navigate("/admin/createPost", { state: { selectedPost , isCollab : true } });
  };


  return (
    <div className="mt-14 flex w-full flex-wrap items-center justify-center overflow-hidden md:justify-start">
      {/* <CollabEditor/> */}
      {posts &&
        posts.map((post) => {
          return (
            <CollabList
              post={post}
              postId={post.id}
              authorData={post.author}
              handleEdit={handleEdit}
            />
          );
        })}
    </div>
  );
};
export default CollabPost;

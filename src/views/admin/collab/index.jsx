import React, { useEffect, useState } from "react";
import CollabList from "./components/CollabList";
import { getInvites } from "firebase-config";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CollabPost = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
    const selectedPost = posts.find(post => post.id === id)
    navigate("/admin/createPost", { state: { selectedPost , isCollab : true } });
  };


  return (
    <div className="mt-14 flex w-full flex-wrap items-center justify-center overflow-hidden md:justify-start">
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

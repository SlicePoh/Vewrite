import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdGridView, MdViewList } from "react-icons/md";
import { Card } from "./Card";
import { GridCard } from "./GridCard";
import { useAuth } from "contexts/AuthContext";
import { onSnapshot } from "firebase/firestore";
import { postsCollection } from "firebase-config/firebase-config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletePost } from "firebase-config";

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [currentPostId, setCurrentPostId] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState("createdAt");

  const typeFilter = searchParams.get("status");

  useEffect(() => {
    // to avoid memory leak store it into var
    const userId = currentUser && currentUser.uid;
    console.log("loading user post");
    const unsubscribe = onSnapshot(postsCollection, function (snapshot) {
      // sync up our local notes array with the snapshot data
      // kind of websocket connection
      const filterPosts = snapshot.docs.filter((doc) => {
        return doc.data().author.userId === userId;
      });

      const postsArr = filterPosts.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(postsArr[0].createdAt);
      setPosts(postsArr);
    });

    return () => unsubscribe;
  }, [currentUser]);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleEdit = (postId) => {
    console.log(postId);
    setCurrentPostId(postId);
    const selectedPost = posts.find((post) => post.id === postId);
    navigate("/admin/createPost", { state: { selectedPost } });
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    console.log("deleted successfully");
    toast.success(`Post deleted Successfully!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  console.log(posts);

  const handleTypeFilter = (key, value) => {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }

      return prevParams;
    });
  };

  const filteredPosts = typeFilter
    ? posts.filter((post) => post.status.toLowerCase() === typeFilter)
    : posts;

  return (
    <div>
      <div className="post-filters mt-16 flex max-w-7xl justify-between gap-2">
        <div className="relative">
          <div className="flex h-full items-center rounded-full border-2 bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
            <div className="pl-3 pr-2 text-xl">
              <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
            </div>
            <input
              type="text"
              placeholder="Search by Title"
              className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button className="dark:text-white" onClick={() => handleTypeFilter("status", "draft")}>
            Drafts
          </button>
          <button className="dark:text-white" onClick={() => handleTypeFilter("status", "publish")}>
            Published
          </button>
        </div>

        <div className="flex items-center">
          <button
            className={`rounded-lg pr-2 dark:text-gray-200 sm:p-4`}
            onClick={toggleView}
          >
            {isGridView ? <MdViewList /> : <MdGridView />}
          </button>

          {/* filter options for posts */}

          <select
            className="flex h-full items-center rounded-full border-2 px-3 bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white "
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Published Date</option>
            <option value="likes">Likes</option>
            <option value="views">Views</option>
            <option value="comments">Comments</option>
          </select>
        </div>
      </div>

      <ToastContainer />

      <div
        className={`mt-4 ${
          isGridView
            ? "flex flex-wrap justify-center gap-4 md:justify-start"
            : "list-view"
        }`}
      >
        {filteredPosts.map((post) => {
          return isGridView ? (
            <GridCard
              key={post.id}
              postId={post.id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              createdAt={post.createdAt}     
              updatedAt={post.updatedAt}
            />
          ) : (
            <Card
              key={post.id}
              postId={post.id}
              post={post}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              createdAt={post.createdAt}    
              updatedAt={post.updatedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Posts;

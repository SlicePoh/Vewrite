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
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState("createdAt");
  const [searchQuery, setSearchQuery] = useState("");

  const typeFilter = searchParams.get("status");
  const [selectOpen, setSelectOpen] = useState(false);

  const selectOptions = [
    { value: "createdAt", label: "Published Date" },
    { value: "likes", label: "Likes" },
    { value: "views", label: "Views" },
    { value: "comments", label: "Comments" },
  ];

  useEffect(() => {
    // to avoid memory leak store it into var
    const userId = currentUser && currentUser.uid;
    // console.log("loading user post");
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

      setPosts(postsArr);
    });

    return () => unsubscribe;
  }, [currentUser]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleEdit = (postId) => {
    const selectedPost = posts.find((post) => post.id === postId);
    navigate("/admin/createPost", { state: { selectedPost } });
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    // console.log("deleted successfully");
    toast.success(`Post deleted Successfully!`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

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

  // console.log(filteredPosts);

  const handleOptionClick = (value) => {
    setSortBy(value);
    setSelectOpen(false);
  };

  return (
    <>
      <div className="post-filters mt-16 flex w-full flex-wrap items-center justify-between text-xs md:text-base">
        <div className="mb-5 flex h-full w-[225px] items-center rounded-full bg-darklower p-4 text-navy-700 dark:bg-darkmid dark:text-white sm:mb-0">
          <div className=" text-xl">
            <FiSearch className="h-4 w-4" />
          </div>
          <input type="text" onChange={handleSearch} value={searchQuery} placeholder="Search by Title"
            className="px-1 block h-full w-full rounded-full bg-darklower font-medium text-navy-700 outline-none placeholder:!text-darkbg dark:bg-darkmid dark:text-white dark:placeholder:!text-darklow" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button className="dark:text-white" onClick={() => handleTypeFilter("status", "draft")}>
            Drafts
          </button>
          <button className="dark:text-white" onClick={() => handleTypeFilter("status", "publish")}>
            Published
          </button>
        </div>

        <div className="flex items-center relative">
          <button className={`rounded-lg pr-2 dark:text-gray-200`} onClick={toggleView}>
            {isGridView ? <MdViewList /> : <MdGridView />}
          </button>

          {/* filter options for posts */}
          <div className="flex items-center w-max h-full cursor-pointer rounded-full bg-darklower p-4 text-navy-700 dark:bg-darkmid dark:text-darklower"
            onClick={() => setSelectOpen(!selectOpen)}>
            {selectOptions.find((option) => option.value === sortBy)?.label || "Select an option"}

            <motion.div className="ml-2" animate={{ rotate: selectOpen ? 180 : 0 }} transition={{ duration: 0.3 }} >
              <IoIosArrowDown />
            </motion.div>
          </div>

          {/* Custom dropdown options */}
          <AnimatePresence>
            {selectOpen && (
              <motion.div
               className="absolute top-16 w-max rounded-xl bg-white shadow-lg dark:bg-darkbg z-10 cursor-pointer"
               initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                {selectOptions.map((option) => (
                  <div key={option.value}
                    className="px-4 py-2 rounded-xl hover:bg-brandLinear hover:text-darkbg dark:text-darklow"
                    onClick={() => handleOptionClick(option.value)}>
                    {option.label}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ToastContainer />

      <div className={`mt-4 ${isGridView ? "flex flex-wrap justify-center gap-4 md:justify-start" : "list-view"}`}>
        {filteredPosts
          .filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((post) => {
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
    </>
  );
};

export default Posts;

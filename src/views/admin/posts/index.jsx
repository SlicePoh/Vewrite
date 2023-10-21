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
  const [isGridView, setIsGridView] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState("createdAt");
  const [searchQuery, setSearchQuery] = useState("");

  const typeFilter = searchParams.get("status");

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

  return (
    <div>
      <div className="post-filters mt-16 flex w-full flex-wrap items-center justify-between text-xs md:text-base">
        <div className="mb-5 flex h-full w-[225px] items-center rounded-full bg-darklower p-4 text-navy-700 dark:bg-darkmid dark:text-white sm:mb-0">
          <div className=" text-xl">
            <FiSearch className="h-4 w-4" />
          </div>
          <input
            type="text"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search by Title"
            className="ml-2 block h-full w-full rounded-full bg-darklower font-medium text-navy-700 outline-none placeholder:!text-darkbg dark:bg-darkmid dark:text-white dark:placeholder:!text-darklow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            className="dark:text-white"
            onClick={() => handleTypeFilter("status", "draft")}
          >
            Drafts
          </button>
          <button
            className="dark:text-white"
            onClick={() => handleTypeFilter("status", "publish")}
          >
            Published
          </button>
        </div>

        <div className="flex items-center ">
          <button
            className={`rounded-lg pr-2 dark:text-gray-200`}
            onClick={toggleView}
          >
            {isGridView ? <MdViewList /> : <MdGridView />}
          </button>

          {/* filter options for posts */}

          {/* <select
            className="flex h-full items-center rounded-full bg-darklower p-4 text-navy-700 outline-none dark:bg-darkmid dark:text-white"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option
              className=" rounded-full hover:bg-blueSecondary "
              value="createdAt"
            >
              Published Date
            </option>
            <option
              className=" rounded-full hover:bg-blueSecondary "
              value="likes"
            >
              Likes
            </option>
            <option
              className=" rounded-full hover:bg-blueSecondary "
              value="views"
            >
              Views
            </option>
            <option
              className=" rounded-full hover:bg-blueSecondary "
              value="comments"
            >
              Comments
            </option>
          </select> */}
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
    </div>
  );
};

export default Posts;

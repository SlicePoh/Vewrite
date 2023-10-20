import { formatDistanceToNow } from "date-fns";
import React, { useState, useEffect } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { updateLikes, fetchLike } from "firebase-config";

export const ArticleCard = (props) => {
  const { post, authorData, createdAt, id } = props;

  const [like, setLike] = useState(false);

  useEffect(() => {
    fetchLike(post.id)
      .then((res) => {
        if (res) {
          // console.log(res);
          setLike(!like);
        }
      })
      .catch((err) => console.log(err));
  }, [post.id]);

  const handleLike = (postId) => {
    setLike(!like);
    updateLikes(postId);
  };

  const createdDate = new Date(createdAt).toLocaleString();

  return (
    <div className="my-4 max-w-7xl overflow-hidden rounded-xl bg-gray-200 shadow-md dark:bg-darkmid">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <div className="w-fit basis-3/4">
          <h3 className="oneLine text-gray-1000 text-xl font-bold dark:text-white md:text-3xl">
            {post.title.slice(0, 40)}
            {`..`}
          </h3>
          <div className="text-sm text-blueSecondary dark:text-brandLinear dark:text-indigo-400 md:text-xl">
            {post.content[0].insert.slice(0, 80)}
            {`...`}
          </div>
          <div className="text-slate-700 text-sm font-bold dark:text-white">
            {authorData.name}
          </div>
          <div className="text-slate-300 text-xs dark:text-gray-400 ">
            Posted{" "}
            {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
          </div>
          {/* like section */}
          <div className="mt-2 flex items-center">
            {like ? (
              <button className="" onClick={() => setLike(!like)}>
                <AiTwotoneHeart className="text-lg text-red-500" />
              </button>
            ) : (
              <button className="" onClick={() => handleLike(post.id)}>
                <AiOutlineHeart className="text-lg text-red-500" />
              </button>
            )}
            {/* insert the number of likes here */}
            <div className="mx-2 dark:text-white">Likes</div>
          </div>
          <div className="flex flex items-center justify-center	">
            <Link to={id} state={{ article: props }}>
              <button className="rounded bg-indigo-400 p-2 font-bold text-white hover:bg-indigo-300 dark:bg-brandLinear dark:hover:bg-indigo-400">
                Read
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* <Link to={id} state={{ article: props }}> */}
          <img
            className="h-20 w-32 rounded-2xl object-fill md:h-28 md:w-44"
            src={post.imageUrl}
            alt="post tile"
          />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

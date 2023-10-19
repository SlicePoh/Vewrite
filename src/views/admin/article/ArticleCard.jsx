import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ArticleCard = (props) => {
  const { post, authorData, createdAt, id } = props;

  const [like, setLike] = useState(false)

  const createdDate = new Date(createdAt).toLocaleString();

  return (
    <div className="my-4 max-w-7xl overflow-hidden bg-gray-200 shadow-md dark:bg-darkmid rounded-xl">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <div className="w-fit basis-3/4">
          <h3 className="oneLine text-gray-1000 text-xl md:text-3xl font-bold dark:text-white">
            {post.title.slice(0, 40)}
            {`..`}
          </h3>
          <div className="text-sm md:text-xl text-blueSecondary dark:text-brandLinear dark:text-indigo-400">
            {post.content.slice(0, 80)}
            {`...`}
          </div>
          <div className="text-sm text-slate-700 font-bold dark:text-white">
            {authorData.name}
          </div>
          <div className="text-slate-300 text-xs dark:text-gray-400 ">
            Posted {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
          </div>
          {/* like section */}
          <div className="flex items-center mt-2">
            {like ? (
              <button className="" onClick={() => setLike(!like)}>
                <AiTwotoneHeart className="text-lg text-red-500" />
              </button>
            ) : (
              <button className="" onClick={() => setLike(!like)}>
                <AiOutlineHeart className="text-lg text-red-500" />
              </button>
            )}
            {/* insert the number of likes here */}
            <div className="mx-2 dark:text-white">Likes</div>
          </div>
          <div className="flex flex justify-center items-center	">
          <Link to={id} state={{ article: props }}>
            <button class="bg-indigo-400 hover:bg-indigo-300 text-white font-bold p-2 rounded dark:bg-brandLinear dark:hover:bg-indigo-400">
              Read
            </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {/* <Link to={id} state={{ article: props }}> */}
            <img
              className="w-32 md:w-44 h-20 md:h-28 rounded-2xl object-fill"
              src={post.imageUrl}
              alt="post tile"
            />
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

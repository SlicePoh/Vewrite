import React from "react";
import { BiBookOpen } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

export const GridCard = (props) => {
  const { post, postId, handleEdit, handleDelete, createdAt } = props;

  const createdDate = new Date(createdAt).toLocaleString();

  return (
    <div className="w-80 overflow-hidden bg-gradient-to-b from-white to-darklower dark:bg-gradient-to-b dark:from-darkbg dark:to-darkmid rounded-xl ">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="h-32 w-full object-cover"
      />
      <div className="flex items-center justify-between p-6">
        <div className="w-48">
          <div className="oneLine text-lg font-bold text-darkbg dark:text-white">
            {post.title}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            <div className="font-bold text-blueSecondary dark:text-brandLinear ">
              Published{" "}
              {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
            </div>
            <div className="mt-2 text-xs text-darkmid dark:text-darklow">Details: {post.details}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => handleEdit(postId)}
            className="flex h-8 w-16 items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold dark:text-white dark:bg-brandLinear text-[#000]"
          >
            <BiBookOpen className="text-sm  " />
            Edit
          </button>
          <button
            onClick={() => handleDelete(postId)}
            className="mt-4 flex h-8 w-auto items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold dark:text-white dark:bg-brandLinear text-[#000]"
          >
            <AiOutlineDelete className="text-sm " />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

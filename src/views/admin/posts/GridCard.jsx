import React from "react";
import { BiBookOpen } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";

export const GridCard = (props) => {
  const { post, postId, handleEdit, handleDelete, createdAt } = props;

  const createdDate = new Date(createdAt).toLocaleString();

  return (
    <div className="w-80 overflow-hidden bg-gray-200 shadow-md dark:bg-navy-700 sm:rounded-lg">
      <img
        src={post.imageUrl}
        alt={post.title}
        className="h-32 w-full object-cover"
      />
      <div className="flex items-center justify-between px-2 py-1 sm:p-6">
        <div>
          <h3 className="oneLine text-lg font-medium text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <div className="mt-1 text-sm text-gray-500">
            <div className="font-bold text-blueSecondary dark:text-brandLinear ">
              Published{" "}
              {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
            </div>
            <div className="mt-2 text-xs">Details: {post.details}</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => handleEdit(postId)}
            className="flex h-8 w-16 items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold text-white dark:bg-brandLinear dark:text-[#000]"
          >
            <BiBookOpen className="text-sm  " />
            Edit
          </button>
          <button
            onClick={() => handleDelete(postId)}
            className="mt-4 flex h-8 w-auto items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold text-white dark:bg-brandLinear dark:text-[#000]"
          >
            <AiOutlineDelete className="text-sm " />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

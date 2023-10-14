import { formatDistanceToNow, hoursToMilliseconds } from "date-fns";
import { deletePost } from "firebase-config";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBookOpen, BiCommentDetail, BiLike } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

export const Card = (props) => {
  const { post, postId, handleDelete, handleEdit, createdAt, updatedAt } =
    props;
  const createdDate = new Date(createdAt).toLocaleString();
  const updatedDate = new Date(updatedAt).toLocaleString();

  const displayDate = updatedAt ? updatedDate : createdDate;

  return (
    <div className="my-4 max-w-7xl overflow-hidden bg-gray-200 shadow-md dark:bg-navy-700 sm:rounded-lg">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <div className="w-1/3">
          <h3 className="oneLine text-lg font-medium text-gray-900 dark:text-white">
            {post.title}
          </h3>
          <div className="text-sm font-bold text-blueSecondary dark:text-brandLinear ">
            Published{" "}
            {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
          </div>
          {updatedAt && (
            <div className="text-sm text-gray-500">
              Last Edited: {updatedDate}
            </div>
          )}
        </div>
        <div className="flex w-1/3 justify-center gap-4">
          <p className="mt-2 text-sm text-gray-500">Likes: {post.likes}</p>
          <p className="mt-2 text-sm text-gray-500">Views: {post.views}</p>
          <p className="mt-2 text-sm text-gray-500">
            Comments: {post.comments}
          </p>
        </div>
        <div className="flex w-1/3 items-center justify-end">
          <button
            onClick={() => handleEdit(postId)}
            className="flex h-8 w-16 items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold text-white dark:bg-brandLinear dark:text-[#000]"
          >
            <BiBookOpen className="text-sm  " />
            Edit
          </button>
          <button
            onClick={() => handleDelete(postId)}
            className="mx-3 flex h-8 w-auto items-center justify-between rounded-lg bg-blueSecondary p-2 text-xs font-bold text-white dark:bg-brandLinear dark:text-[#000]"
          >
            <AiOutlineDelete className="text-sm " />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

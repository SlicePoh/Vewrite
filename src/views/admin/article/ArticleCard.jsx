import React from "react";

export const ArticleCard = (props) => {
  const { post, authorData, createdAt } = props;

  const createdDate = new Date(createdAt.toMillis()).toLocaleString();

  return (
    <div className="my-4 max-w-7xl overflow-hidden bg-gray-100 shadow-md dark:bg-navy-700 sm:rounded-2xl">
      <div className="flex items-center justify-between px-4 py-5 sm:px-6">
        <div className="w-30 basis-3/4">
          <h3 className="oneLine text-gray-1000 text-3xl font-bold dark:text-white">
            {post.title}
          </h3>
          <div className="text-xl text-blueSecondary dark:text-brandLinear">
            {post.content.slice(0, 180)}
            {`...`}
          </div>
          <div className="text-xm text-slate-700 font-bold dark:text-white">
            {authorData.name}
          </div>
          <div className="text-slate-300 text-xs dark:text-gray-400 ">
            {createdDate}
          </div>
        </div>
        <div className="flex basis-1/4 items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              className="w-22 h-20 rounded-2xl object-fill"
              src={post.imageUrl}
              alt="post tile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

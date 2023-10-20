import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import { formatDistanceToNow } from "date-fns";
import DeltaContent from "./DeltaContent";
import Footer from "components/footer/FooterAuthDefault";

export const ArticleDetailCard = (props) => {
  const { state } = useLocation();
  const { article } = state;

  const createdDate = new Date(article.post.createdAt).toLocaleString();
  return (
    <>
      <div className="min-h-screen p-3 dark:bg-darkbg dark:text-white md:p-10">
        <Navbar />

        <div className="flex w-full flex-wrap px-3 md:px-10">
          <div className="mt-5 flex w-full flex-col items-start justify-start md:w-1/3">
            <div className="text-gray-1000 flex justify-center text-4xl font-bold dark:text-white">
              {article.post.title}
            </div>

            <div className="my-2 flex justify-center py-0 text-xl  text-blueSecondary  dark:text-brandLinear">
              {article.post.details}
            </div>

            <div className="my-2 flex justify-center py-0 text-base text-gray-800 dark:text-white ">
              {article.authorData.name}
            </div>

            <div className="flex justify-center">
              <img
                className="w-100 rounded-2xl"
                src={article.post.imageUrl}
                alt="article tile"
              />
            </div>

            <div className="flex justify-center gap-4">
              <div className="pt-4 text-sm text-red-500">
                Likes : {article.post.likes}
              </div>
              <div className="text-slate-300 pt-4 text-sm dark:text-gray-400">
                Posted{" "}
                {formatDistanceToNow(new Date(createdDate), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>

          <div className="justify- center mt-10 flex w-full flex-col md:w-2/3">
            <div className="m-5 overflow-hidden rounded-xl bg-darklower px-10 py-10 shadow-md dark:bg-darkmid ">
              <DeltaContent delta={article.post.content} />
              <div className="flex justify-center">
                <Link to=".." relative="path">
                  <button className="mt-6 rounded bg-indigo-400 py-2 px-4 font-bold text-white hover:bg-indigo-300 dark:bg-brandLinear dark:hover:bg-indigo-400">
                    Back to Feed
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

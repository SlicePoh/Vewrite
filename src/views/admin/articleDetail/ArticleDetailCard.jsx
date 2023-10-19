import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import { formatDistanceToNow } from "date-fns";

export const ArticleDetailCard = (props) => {

    const { state } = useLocation();
    console.log(state);
    const { article } = state;

    const createdDate = new Date(article.post.createdAt).toLocaleString();
    return (
        <>
            <div className="dark:text-white dark:bg-navy-900 h-screen">
                <Navbar />
                <div>
                    <div className="flex flex-wrap w-full px-10">
                        <div className="w-full md:w-1/3 flex flex-col justify-center items-start mt-5">

                            <div className='flex justify-center text-gray-1000 text-4xl font-bold dark:text-white'>
                                {article.post.title}
                            </div>

                            <div className='my-2 flex justify-center text-gray-800 py-0 text-xl dark:text-white dark:text-brandLinear text-blueSecondary'>
                                {article.post.details}
                            </div>

                            <div className='my-2 flex justify-center text-gray-800 py-0 text-base dark:text-white dark:text-gray-400'>
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
                                <div className='pt-4 text-red-500 text-sm'>
                                    Likes : {article.post.likes}
                                </div>
                                <div className='pt-4 text-slate-300 text-sm dark:text-gray-400'>
                                    Posted {formatDistanceToNow(new Date(createdDate), { addSuffix: true })}
                                </div>
                            </div>
                        </div>

                        <div class="mt-10 w-full md:w-2/3 flex flex-col justify- center">
                            <div className='px-10 py-10 m-5 overflow-hidden bg-gray-200 shadow-md dark:bg-navy-700 rounded-xl '>
                                {article.post.content}

                                <div className="flex justify-center">
                                    <Link to={`..`} relative="path">
                                        <button class="mt-6 bg-indigo-400 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded dark:bg-brandLinear dark:hover:bg-indigo-400">
                                            Back to Feed
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
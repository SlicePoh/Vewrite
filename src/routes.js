import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import NewPost from "views/admin/createPost";
import CollabPost from "views/admin/collab";

// Icon Imports
import {
  MdHome,
  MdPerson,
  MdLock,
  MdBook,
  MdNoteAdd,
  MdSettings,
} from "react-icons/md";
import Posts from "views/admin/posts";
import { BsBucket, BsCardList, BsList, BsListCheck, BsPatchQuestionFill, BsPeopleFill } from "react-icons/bs";
import FaqPage from "views/admin/faq";
import ErrorPage from "views/error";
import Support from "views/admin/emailSupport/Support";
import { RiMailSettingsLine } from "react-icons/ri";
import ArticlePage from "views/admin/article";
import Setting from "views/admin/setting/Setting";

const routes = [
  // {
  //   name: "Home",
  //   layout: "/admin",
  //   path: "default",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <MainDashboard />,
  // },
  {
    name: "Articles Feed",
    layout: "/admin",
    path: "feed",
    icon: <BsCardList className="h-6 w-6" />,
    component: <ArticlePage />,
  },
  {
    name: "Posts",
    layout: "/admin",
    path: "posts",
    icon: <MdBook className="h-6 w-6" />,
    component: <Posts />,
  },
  {
    name: "Add New Post",
    layout: "/admin",
    path: "createPost",
    icon: <MdNoteAdd className="h-6 w-6" />,
    component: <NewPost />,
  },
  {
    name: "Collab on a Post",
    layout: "/admin",
    path: "collab",
    icon: <BsPeopleFill className="h-6 w-6" />,
    component: <CollabPost />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  // {
  //   name: "Trash",
  //   layout: "/admin",
  //   path: "trash",
  //   icon: <BsBucket className="h-6 w-6" />,
  //   component: <h1>Trash Page</h1>,
  // },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Setting />,
  },
  {
    name: "ERROR",
    layout: "/",
    path: "*",
    icon: <MdNoteAdd className="h-6 w-6" />,
    component: <ErrorPage />,
  },
  {
    name: "Email Support",
    layout: "/admin",
    path: "support",
    icon: <RiMailSettingsLine className="h-6 w-6" />,
    component: <Support />,
  },
  {
    name: "FAQ",
    layout: "/admin",
    path: "faq",
    icon: <BsPatchQuestionFill className="h-6 w-6" />,
    component: <FaqPage />,
  },
];
export default routes;

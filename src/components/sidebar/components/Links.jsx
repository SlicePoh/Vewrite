/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";

export function SidebarLinks(props) {
  let location = useLocation();
  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      if ( route.layout === "/admin" || route.layout === "/auth" || route.layout === "/rtl") {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className={`relative py-2 flex hover:cursor-pointer hover:bg-darklower dark:hover:bg-darkbg ${activeRoute(route.path) && "bg-darklower dark:bg-darkbg"}`}>
              <li className="my-[3px] flex cursor-pointer items-center px-8" key={index} >
                <span className={`${activeRoute(route.path) ? "font-extrabold text-darkbg dark:text-white" : "font-medium text-darkmid dark:text-darklower"}`}>
                  {route.icon ? route.icon : <DashIcon />}{" "}
                </span>
                <p className={`leading-1 ml-4 flex ${activeRoute(route.path) ? "font-extrabold text-darkbg dark:text-white" : "font-medium text-darkmid dark:text-darklower" }`} >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-0 top-0 h-full w-1 rounded-lg bg-blueSecondary dark:bg-brandLinear" />
              ) : null}
            </div>
          </Link>
        );
      }
    });
  };
  return createLinks(routes);
}

export default SidebarLinks;

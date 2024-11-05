/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPenNib } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ isCollapsed }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const Data = [
    {
      title: "IP",
      link: "/",
      icon: <FontAwesomeIcon icon={faPenNib} />,
    },
    {
      title: "DEVICES",
      link: "/devices/homeChart",
      icon: <FontAwesomeIcon icon={faCode} />,
    },
    {
      title: "VC",
      link: "/vc/homeChart",
      icon: <FontAwesomeIcon icon={faCode} />,
    },
    {
      title: "TDH",
      link: "/tdh/homeChart",
      icon: <FontAwesomeIcon icon={faCode} />,
    },
    {
      title: "SYNC",
      link: "/sync/homeChart",
      icon: <FontAwesomeIcon icon={faCode} />,
    },
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-[50px]" : ""
      } bg-navy text-white flex-shrink-0 transition-width duration-300`}
    >
      <div className="flex text-2xl gap-2 p-2 bg-navy text-white justify-center border-b-2 border-blue-200">
        <div>
          <img
            src="./logofinepro.png"
            alt="logo"
            className="w-[50px] h-[40px]"
          />
        </div>
        {!isCollapsed && (
          <h1 className="font-bold flex justify-center">finepro</h1>
        )}
      </div>
      <div>
        {Data.map((props, index) => {
          return (
            <div
              key={index}
              className={`text-white text-2xl py-5 ${
                activeLink === props.link
                  ? " bg-gray-100 text-black"
                  : "hover:bg-blue-200 hover:text-black"
              }`}
              onClick={() => handleLinkClick(props.link)}
            >
              <Link to={props.link}>
                <div className="flex">
                  <span className="w-[50px] h-[40px] text-center">
                    {props.icon}
                  </span>
                  {!isCollapsed && <h1>{props.title}</h1>}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;

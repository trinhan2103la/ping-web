/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const Data = [
    {
      title: "IP",
      link: "/",
    },
    {
      title: "DEVICES",
      link: "/devices/homeChart",
    },
    {
      title: "VC",
      link: "/vc/homeChart",
    },
    {
      title: "TDH",
      link: "/tdh/homeChart",
    },
    {
      title: "SYNC",
      link: "/sync/homeChart",
    },
  ];

  return (
    <div className="flex bg-navy justify-between items-center">
      <div className="flex text-2xl gap-2 px-2 text-light">
        <Link to="/">
          <h1 className="font-bold cursor-pointer">finepro</h1>
        </Link>
      </div>
      <div className="flex">
        {Data.map((props, index) => {
          const isActive = location.pathname === props.link;
          return (
            <Link key={index} to={props.link}>
              <div
                className={`text-light font-bold text-2xl px-4 py-2 hover:bg-blue-950 hover:text-light h-full ${
                  isActive ? "bg-blue-950" : ""
                }`}
              >
                <h1>{props.title}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;

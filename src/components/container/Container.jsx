import Content from "./content";
import SideBar from "./sidebar";
import { useState } from "react";

const Container = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className="flex">
      <div className="bg-navy min-h-[100vh] ">
        <SideBar isCollapsed={isCollapsed} />
      </div>
      <div className="w-full bg-cyan-300">
        <Content isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      </div>
    </div>
  );
};

export default Container;

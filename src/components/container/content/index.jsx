/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { publicRoutes } from "./pages/route";
import { Routes, Route } from "react-router-dom";

const Content = () => {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.Component;
          return <Route key={index} path={route.path} element={<Page />} />;
        })}
      </Routes>
    </div>
  );
};

export default Content;

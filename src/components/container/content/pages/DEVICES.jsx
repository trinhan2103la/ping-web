/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { publicRoutesCharts, DataALL } from '../charts/routeChart';

import { Routes, Route } from 'react-router-dom';

export default function DEVICES() {
  const apiUrl = 'https://127.0.0.1:8080/';
  return (
    <div>
      <div className="flex gap-4 p-2">
        {DataALL.map((props, index) => {
          return (
            <Link key={index} to={props.links}>
              <button className="text-2xl font-bold  text-light  bg-navy ">
                {props.name}
              </button>
            </Link>
          );
        })}
      </div>
      <div className="w-full">
        <Routes>
          {publicRoutesCharts.map((route, index) => {
            const Pages = route.Component;
            return (
              <Route
                key={index}
                path={route.path}
                element={<Pages apiUrl={apiUrl} />}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}

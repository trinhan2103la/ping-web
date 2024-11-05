/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import { publicRoutesCharts, DataSYNC } from '../charts/routeChart';

import { Routes, Route } from 'react-router-dom';

export default function SYNC() {
  const apiUrl = 'https://127.0.0.1:8080/api/SYNC';
  return (
    <div>
      <div className="flex gap-4 p-2">
        {DataSYNC.map((props, index) => {
          return (
            <Link key={index} to={props.links}>
              <button className="font-bold text-2xl bg-navy text-light">
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

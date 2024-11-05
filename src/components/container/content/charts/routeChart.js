import HomeChart from "./HomeChart";
import ConnectChart from "./ConnectChart";
import PingChart from "./PingChart";

export const publicRoutesCharts = [
  { path: "/homeChart", Component: HomeChart },
  { path: "/connectChart", Component: ConnectChart },
  { path: "/pingChart", Component: PingChart },
];

export const DataVC = [
  {
    links: "/vc/homeChart",
    name: "HOME",
  },
  {
    links: "/vc/connectChart",
    name: "CHART",
  },
  {
    links: "/vc/pingChart",
    name: "PING",
  },
];

export const DataALL = [
  {
    links: "/devices/homeChart",
    name: "HOME",
  },
  {
    links: "/devices/connectChart",
    name: "CHART",
  },
  {
    links: "/devices/pingChart",
    name: "PING",
  },
];

export const DataTDH = [
  {
    links: "/tdh/homeChart",
    name: "HOME",
  },
  {
    links: "/tdh/connectChart",
    name: "CHART",
  },
  {
    links: "/tdh/pingChart",
    name: "PING",
  },
];

export const DataSYNC = [
  {
    links: "/sync/homeChart",
    name: "HOME",
  },
  {
    links: "/sync/connectChart",
    name: "CHART",
  },
  {
    links: "/sync/pingChart",
    name: "PING",
  },
];

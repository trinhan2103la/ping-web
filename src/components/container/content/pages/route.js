import SYNC from "./SYNC";
import DEVICES from "./DEVICES";
import TDH from "./TDH";
import IP from "./IP";
import VC from "./VC";

export const publicRoutes = [
  { path: "/sync/*", Component: SYNC },
  { path: "/devices/*", Component: DEVICES },
  { path: "/tdh/*", Component: TDH },
  { path: "/vc/*", Component: VC },
  { path: "/", Component: IP },
];

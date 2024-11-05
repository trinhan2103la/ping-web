/* eslint-disable react/prop-types */
import { Data } from "../comp/Data";
import Result from "../comp/Result";

export default function HomeChart({ apiUrl }) {
  return (
    <>
      <div>
        <Data apiUrl={apiUrl} />
      </div>
      <div>
        <Result apiUrl={apiUrl} />
      </div>
    </>
  );
}

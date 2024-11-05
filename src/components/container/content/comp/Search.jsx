/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Search = ({
  searchTerm,
  onSearchTermChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}) => {
  return (
    <div className="mb-4 flex space-x-4 items-center">
      <input
        type="text"
        placeholder="Search "
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="w-[30%]"
      />
      <DatePicker
        selected={startDate}
        onChange={onStartDateChange}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm:ss"
        placeholderText="Start"
      />
      <DatePicker
        selected={endDate}
        onChange={onEndDateChange}
        showTimeSelect
        dateFormat="yyyy-MM-dd HH:mm:ss"
        placeholderText="End"
      />
    </div>
  );
};

export default Search;

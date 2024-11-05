/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import SearchAndFilter from './Search';

export const Data = ({ apiUrl }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(new Date('2024-07-29 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2024-08-11 23:59:59'));

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const responseData = response.data;

        if (Array.isArray(responseData.data)) {
          setData(responseData.data);
          setFilteredData(responseData.data);
        } else {
          setError('Data is not an array');
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data');
      });
  }, [apiUrl]);

  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ['id_may', 'datetime', 'ip_type', 'result', 'status'].some(
          (field) =>
            item[field] !== undefined &&
            item[field]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      );
    }

    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.datetime);
        const isAfterStartDate = !startDate || itemDate >= startDate;
        const isBeforeEndDate = !endDate || itemDate <= endDate;
        return isAfterStartDate && isBeforeEndDate;
      });
    }

    setFilteredData(filtered);
  }, [searchTerm, startDate, endDate, data]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const headers = ['TYPE', 'IP', 'PING', 'STATUS', 'DATE TIME', 'TIME START'];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-serif pb-3">DATA</h1>
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
      />

      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th
                key={header}
                className="border border-gray-300 p-2 text-center"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index} className="bg-white even:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="border border-gray-300 p-2">
                  {header === 'IP' ? row.id_may : row[header]}
                  {header === 'TIME START' ? row.uptime_start : ''}
                  {header === 'TYPE' ? row.ip_type : ''}
                  {header === 'DATE TIME' ? row.datetime : ''}
                  {header === 'PING' ? row.result : ''}
                  {header === 'STATUS' ? row.status : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

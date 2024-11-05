/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Pagination from './Pagination';
import SearchAndFilter from './Search';

export default function Result({ apiUrl }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(new Date('2024-07-29 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2024-08-11 23:59:59'));

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const responseData = response.data;

        if (Array.isArray(responseData.data)) {
          const sortedData = responseData.data.sort(
            (a, b) => new Date(a.datetime) - new Date(b.datetime)
          );

          const events = {};
          const now = new Date().toISOString();

          sortedData.forEach((row) => {
            if (!events[row.id_may]) {
              events[row.id_may] = [];
            }
            const lastEvent = events[row.id_may][events[row.id_may].length - 1];
            if (row.status === 1) {
              if (!lastEvent || lastEvent.disconnect) {
                events[row.id_may].push({
                  connect: row.datetime,
                  disconnect: null,
                });
              }
            } else if (row.status === 0) {
              if (lastEvent && !lastEvent.disconnect) {
                lastEvent.disconnect = row.datetime;
              }
            }
          });

          const flattenedData = [];
          Object.keys(events).forEach((id_may) => {
            events[id_may].forEach((event) => {
              if (event.connect && !event.disconnect) {
                event.disconnect = now;
              }
              if (event.connect && event.disconnect) {
                flattenedData.push({
                  ip_type: sortedData.find((row) => row.id_may === id_may)
                    .ip_type,
                  id_may,
                  connect: format(
                    new Date(event.connect),
                    'yyyy-MM-dd HH:mm:ss'
                  ),
                  disconnect: format(
                    new Date(event.disconnect),
                    'yyyy-MM-dd HH:mm:ss'
                  ),
                });
              }
            });
          });

          setData(flattenedData);
          setFilteredData(flattenedData);
        } else {
          setError('Data is not an array');
        }
      } catch (error) {
        console.error('There was an error fetching the data!', error);
        setError('There was an error fetching the data');
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ['ip_type', 'id_may', 'connect', 'disconnect'].some(
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
        const itemConnectDate = new Date(item.connect);
        const itemDisconnectDate = new Date(item.disconnect);
        const isAfterStartDate = !startDate || itemConnectDate >= startDate;
        const isBeforeEndDate = !endDate || itemDisconnectDate <= endDate;
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

  const headers = ['IP', 'TYPE', 'CONNECT', 'DISCONNECT'];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4">
      <h1 className="pb-3 text-3xl font-serif">CONNECT - DISCONNECT</h1>
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
                  {header === 'CONNECT' || header === 'DISCONNECT'
                    ? row[header.toLowerCase()]
                    : header === 'IP'
                    ? row.id_may
                    : header === 'TYPE'
                    ? row.ip_type
                    : row[header.toLowerCase()]}
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
}

import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../comp/Pagination';

export default function IP() {
  const [ips, setIps] = useState([]);
  const [filteredIps, setFilteredIps] = useState([]);
  const [newType, setNewType] = useState('');
  const [newIP, setNewIP] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can change the number of items per page

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = ips;

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        ['TYPE', 'IP'].some(
          (field) =>
            item[field] !== undefined &&
            item[field]
              .toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredIps(filtered);
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, ips]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8080/api/list');
      setIps(response.data.data);
      setFilteredIps(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async () => {
    try {
      const response = await axios.post('hhttps://127.0.0.1:8080/api/list', {
        type: newType,
        ip: newIP,
      });
      if (response.data.status) {
        fetchData(); // Refresh the data after adding
        setNewType(''); // Clear input fields
        setNewIP('');
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const deleteData = async (index) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this IP?'
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete('https://127.0.0.1:8080/api/list', {
          data: { ip: filteredIps[index].IP },
        });
        if (response.data.status) {
          fetchData(); // Refresh the data after deleting
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIps = filteredIps.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIps.length / itemsPerPage);

  return (
    <div className="p-4">
      <div className="mb-5">
        <div className="mb-2">
          <h1 className="text-2xl font-bold p-1">Add New IP</h1>
        </div>
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          />
          <input
            type="text"
            placeholder="IP"
            value={newIP}
            onChange={(e) => setNewIP(e.target.value)}
          />
          <button className=" bg-navy text-light  " onClick={addData}>
            Add
          </button>
        </div>
      </div>
      <div>
        <div className="mb-2">
          <h3 className="text-2xl font-bold p-1">IP List</h3>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" border-gray-300  w-[30%] mb-5"
        />
        <table className="w-full text-center border border-gray-300 border-collapse ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">IP</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentIps.map((ip, index) => (
              <tr key={index} className="bg-white even:bg-gray-50">
                <>
                  <td className="border border-gray-300 p-2">{ip.TYPE}</td>
                  <td className="border border-gray-300 p-2">{ip.IP}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-navy text-light"
                      onClick={() => deleteData(indexOfFirstItem + index)}
                    >
                      Delete
                    </button>
                  </td>
                </>
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
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import Chart from 'react-apexcharts';

import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PingChart = ({ apiUrl }) => {
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [startDate, setStartDate] = useState(new Date('2024-07-29 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2024-08-11 23:59:59'));

  // Fetch data from the API
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      const rawData = response.data.data;

      // Process data
      const processedData = rawData.map((item) => ({
        x: new Date(item.datetime).getTime() + 7 * 60 * 60 * 1000,
        y: item.status === 1 ? item.result : 2000, // Set a high value for status 0
        id_may: item.id_may,
      }));

      setChartData(processedData);
      setFilteredData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilter = useCallback(() => {
    if (startDate && endDate) {
      const filtered = chartData.filter((data) => {
        const dataTime = new Date(data.x).getTime();
        return dataTime >= startDate.getTime() && dataTime <= endDate.getTime();
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(chartData);
    }
  }, [startDate, endDate, chartData]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  const groupByIdMay = (data) => {
    const grouped = data.reduce((acc, item) => {
      if (!acc[item.id_may]) {
        acc[item.id_may] = [];
      }
      acc[item.id_may].push({ x: item.x, y: item.y });
      return acc;
    }, {});
    return Object.keys(grouped).map((key) => ({
      name: key,
      data: grouped[key],
    }));
  };

  const series = groupByIdMay(filteredData);

  const chartOptions = {
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
    },
    yaxis: {
      title: {
        text: 'Result',
      },
      min: 0,
      max: 2000, // Set according to your expected range
      labels: {
        formatter: (value) => {
          return value === 2000 ? 'Disconnect' : value;
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy HH:mm',
      },
      y: {
        formatter: (value, { seriesIndex, w }) => {
          const idMay = w.globals.seriesNames[seriesIndex];
          return value === 2000
            ? 'Disconnect'
            : `Result: ${value}, id_may: ${idMay}`;
        },
      },
    },
  };

  return (
    <div>
      <div className="flex pt-2 gap-5 pl-2">
        <div>
          <label className="text-2xl font-serif">Start Date: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div>
          <label className="text-2xl font-serif">End Date: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
      </div>
      <div className="pt-2 pr-2">
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height="500"
        />
      </div>
    </div>
  );
};

export default PingChart;

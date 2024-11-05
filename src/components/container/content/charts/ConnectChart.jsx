/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ConnectChart = ({ apiUrl }) => {
  // Initialize startDate to 1 day ago and endDate to the current date

  const [startDate, setStartDate] = useState(new Date('2024-07-29 00:00:00'));
  const [endDate, setEndDate] = useState(new Date('2024-08-11 23:59:59'));

  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  const processData = (data, startDate, endDate) => {
    const timelineData = [];
    const deviceMap = new Map();

    data.forEach((device) => {
      const deviceDateTime = new Date(device.datetime);
      const uptimeStartDateTime = new Date(device.uptime_start);

      // Convert timestamps to Vietnam time (UTC+7)
      const currentTimestamp = deviceDateTime.getTime() + 7 * 60 * 60 * 1000;
      const uptimeStartTimestamp =
        uptimeStartDateTime.getTime() + 7 * 60 * 60 * 1000;

      if (
        currentTimestamp < startDate.getTime() ||
        currentTimestamp > endDate.getTime()
      ) {
        return; // Skip data outside the selected range
      }

      if (!deviceMap.has(device.id_may)) {
        // First time seeing this device, initialize its data
        const initialStatus = device.status === 1 ? 1 : 0;
        deviceMap.set(device.id_may, {
          id: device.id_may,
          status: initialStatus,
          segments: [
            {
              start: isNaN(uptimeStartTimestamp)
                ? uptimeStartTimestamp
                : currentTimestamp,
              end: currentTimestamp,
              status: initialStatus,
            },
          ],
        });
      } else {
        const deviceData = deviceMap.get(device.id_may);
        const lastSegment = deviceData.segments[deviceData.segments.length - 1];

        if (device.status !== lastSegment.status) {
          // Status changed, close the last segment and start a new one
          lastSegment.end = currentTimestamp;
          deviceData.segments.push({
            start: currentTimestamp,
            end: currentTimestamp,
            status: device.status,
          });
        } else {
          // Update the end time of the last segment
          lastSegment.end = currentTimestamp;
        }

        // Update uptime_start if status is 1 (successful ping)
        if (device.status === 1) {
          deviceData.uptime_start = uptimeStartTimestamp;
        }
      }
    });

    // Convert the map to an array of objects
    deviceMap.forEach((deviceData) => {
      timelineData.push(deviceData);
    });

    return timelineData;
  };

  const createChartData = (data) => {
    const seriesData = [];

    data.forEach((device) => {
      const deviceData = device.segments.map((segment) => ({
        x: device.id,
        y: [segment.end, segment.start],
        fillColor: segment.status === 1 ? '#3498db' : '#e74c3c', // Blue for successful, Red for unsuccessful
      }));

      seriesData.push({
        name: device.id,
        data: deviceData,
      });
    });

    setChartOptions({
      chart: {
        type: 'rangeBar',
        height: 500,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '100%',
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'dd/MM HH:mm:ss',
        },
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: 'Device ID',
        },
        labels: {
          formatter: (value) => value, // Show unique device IDs
        },
      },
      tooltip: {
        show: true,
        x: {
          format: 'dd/MM HH:mm:ss',
        },
      },
    });

    setChartSeries(seriesData);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl);
      const rawData = response.data.data;

      const processedData = processData(rawData, startDate, endDate);
      createChartData(processedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiUrl, startDate, endDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          series={chartSeries}
          type="rangeBar"
          height="600"
        />
      </div>
    </div>
  );
};

export default ConnectChart;

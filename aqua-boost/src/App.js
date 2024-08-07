import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Line } from 'react-chartjs-2';
import Auth from './Auth';

function App() {
  const [impedance, setImpedance] = useState('');
  const [prediction, setPrediction] = useState('');
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data');
        setImpedance(response.data.impedance);
        setHistoricalData((prevData) => [...prevData, parseFloat(response.data.impedance)]);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    const fetchPrediction = async () => {
      try {
        const response = await axios.get('http://localhost:3001/predict');
        setPrediction(response.data.prediction);
      } catch (error) {
        console.error('Error fetching the prediction', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
      fetchPrediction();
    }, 1000); // Fetch data and prediction every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const data = {
    labels: historicalData.map((_, index) => index + 1),
    datasets: [
      {
        label: 'Impedance',
        data: historicalData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aqua Boost</h1>
        <Auth />
        <p>Current Impedance: {impedance} ohms</p>
        <p>Predicted Impedance: {prediction} ohms</p>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </header>
    </div>
  );
}

export default App;

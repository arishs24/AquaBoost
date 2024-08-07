import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [impedance, setImpedance] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/data');
        setImpedance(response.data.impedance);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    const interval = setInterval(fetchData, 1000); // Fetch data every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aqua Boost</h1>
        <p>Impedance: {impedance} ohms</p>
      </header>
    </div>
  );
}

export default App;

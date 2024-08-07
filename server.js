const express = require('express');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const app = express();
const port = 3001; // The port your backend will run on

const serialPort = new SerialPort('COM3', { baudRate: 9600 }); // Change COM3 to your Arduino port
const parser = serialPort.pipe(new Readline({ delimiter: '\n' }));

let impedanceData = '';

parser.on('data', data => {
  impedanceData = data.trim();
  console.log(`Received data: ${impedanceData}`);
});

app.get('/data', (req, res) => {
  res.json({ impedance: impedanceData });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

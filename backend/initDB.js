// scripts/initDB.js - Script to initialize MongoDB with sample data

const mongoose = require('mongoose');
const OptionData = require('./models/OptionData');

// Connect to MongoDB
mongoose.connect('MONGO_URI')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Sample data array with multiple records
const sampleData = [
  {
    Ticker: "NIFTY10000DEC22PE",
    Date: "2022/02/10",
    Time: "13:37",
    Open: 9.35,
    High: 9.35,
    Low: 9.35,
    Close: 9.35,
    Volume: 50,
    OI: 227475
  },
  {
    Ticker: "NIFTY10000DEC22PE",
    Date: "2022/02/11",
    Time: "09:15",
    Open: 9.40,
    High: 9.55,
    Low: 9.30,
    Close: 9.45,
    Volume: 75,
    OI: 228500
  },
  {
    Ticker: "NIFTY10000DEC22PE",
    Date: "2022/02/11",
    Time: "15:30",
    Open: 9.45,
    High: 9.65,
    Low: 9.40,
    Close: 9.60,
    Volume: 120,
    OI: 229750
  },
  {
    Ticker: "NIFTY10000DEC22CE",
    Date: "2022/02/10",
    Time: "13:45",
    Open: 185.60,
    High: 186.75,
    Low: 184.20,
    Close: 185.90,
    Volume: 150,
    OI: 193250
  },
  {
    Ticker: "NIFTY10000DEC22CE",
    Date: "2022/02/11",
    Time: "09:20",
    Open: 186.10,
    High: 188.45,
    Low: 185.70,
    Close: 187.60,
    Volume: 200,
    OI: 194500
  },
  {
    Ticker: "NIFTY9500DEC22PE",
    Date: "2022/02/10",
    Time: "10:30",
    Open: 6.75,
    High: 6.90,
    Low: 6.60,
    Close: 6.85,
    Volume: 85,
    OI: 175600
  },
  {
    Ticker: "NIFTY9500DEC22PE",
    Date: "2022/02/11",
    Time: "14:15",
    Open: 6.90,
    High: 7.10,
    Low: 6.85,
    Close: 7.05,
    Volume: 110,
    OI: 176800
  },
  {
    Ticker: "NIFTY9500DEC22CE",
    Date: "2022/02/10",
    Time: "11:20",
    Open: 245.30,
    High: 247.15,
    Low: 244.60,
    Close: 246.75,
    Volume: 175,
    OI: 162400
  },
  {
    Ticker: "NIFTY9500DEC22CE",
    Date: "2022/02/11",
    Time: "13:10",
    Open: 246.80,
    High: 248.50,
    Low: 246.20,
    Close: 247.90,
    Volume: 190,
    OI: 163200
  },
  {
    Ticker: "BANKNIFTY35000DEC22PE",
    Date: "2022/02/10",
    Time: "12:45",
    Open: 12.15,
    High: 12.40,
    Low: 12.05,
    Close: 12.30,
    Volume: 130,
    OI: 145750
  },
  {
    Ticker: "BANKNIFTY35000DEC22PE",
    Date: "2022/02/11",
    Time: "10:50",
    Open: 12.35,
    High: 12.60,
    Low: 12.20,
    Close: 12.55,
    Volume: 145,
    OI: 146600
  },
  {
    Ticker: "BANKNIFTY35000DEC22CE",
    Date: "2022/02/10",
    Time: "14:05",
    Open: 275.65,
    High: 278.30,
    Low: 274.90,
    Close: 277.50,
    Volume: 220,
    OI: 138900
  },
  {
    Ticker: "BANKNIFTY35000DEC22CE",
    Date: "2022/02/11",
    Time: "15:15",
    Open: 277.60,
    High: 280.45,
    Low: 276.85,
    Close: 279.70,
    Volume: 235,
    OI: 139800
  },
  {
    Ticker: "NIFTY10000DEC22PE",
    Date: "2022/02/12",
    Time: "10:00",
    Open: 9.65,
    High: 9.80,
    Low: 9.55,
    Close: 9.75,
    Volume: 95,
    OI: 230500
  },
  {
    Ticker: "NIFTY9500DEC22CE",
    Date: "2022/02/12",
    Time: "11:45",
    Open: 248.10,
    High: 250.35,
    Low: 247.75,
    Close: 249.85,
    Volume: 205,
    OI: 164200
  }
];

// Function to initialize database
async function initDB() {
  try {
    // Clear existing data
    await OptionData.deleteMany({});
    console.log('Cleared existing data');
    
    // Insert sample data
    await OptionData.insertMany(sampleData);
    console.log(`${sampleData.length} sample records inserted successfully`);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

// Run initialization
initDB();

import React from 'react';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';

// Sample data - you can replace this with your actual data source
const scriptsData = [
  {
    "id": 5,
    "value": "MIDCPNIFTY",
    "strikeDifference": 75,
    "lotSize": 50,
    "expiryWeek": "MONDAY",
    "name": "NIFTY MID SELECT",
    "exchange": {
      "id": 1,
      "value": "NSE",
      "expiryTime": "15:30:0"
    },
    "scriptExpiries": [
      {
        "id": 2,
        "expiryType": "MONTHLY"
      }
    ]
  }
];

// Add more sample data to better demonstrate the table
const extendedScriptsData = [
  ...scriptsData,
  {
    "id": 6,
    "value": "NIFTY",
    "strikeDifference": 50,
    "lotSize": 75,
    "expiryWeek": "THURSDAY",
    "name": "NIFTY 50",
    "exchange": {
      "id": 1,
      "value": "NSE",
      "expiryTime": "15:30:0"
    },
    "scriptExpiries": [
      {
        "id": 3,
        "expiryType": "WEEKLY"
      }
    ],
    "status": "READY"
  },
  {
    "id": 7,
    "value": "BANKNIFTY",
    "strikeDifference": 100,
    "lotSize": 25,
    "expiryWeek": "THURSDAY",
    "name": "NIFTY BANK",
    "exchange": {
      "id": 1,
      "value": "NSE",
      "expiryTime": "15:30:0"
    },
    "scriptExpiries": [
      {
        "id": 3,
        "expiryType": "WEEKLY"
      }
    ],
    "status": "FAILED"
  }
];

const ScriptsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Scripts</h2>
        <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium">
          Add New Script
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Strike Difference</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Lot Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expiry Week</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Exchange</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expiry Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {extendedScriptsData.map((script, index) => (
              <tr key={script.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{script.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.strikeDifference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.lotSize}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.expiryWeek}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.exchange.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.scriptExpiries[0].expiryType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {index === 1 || script.status === "READY" ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-md bg-yellow-500 text-white">
                      READY
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-md bg-red-500 text-white">
                      FAILED
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-2">
                      <FileText size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScriptsTable;
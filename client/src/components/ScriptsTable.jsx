import React from 'react';

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

const ScriptsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Scripts</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strike Difference</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Week</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scriptsData.map((script) => (
              <tr key={script.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{script.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.strikeDifference}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.lotSize}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.expiryWeek}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.exchange.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{script.scriptExpiries[0].expiryType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
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
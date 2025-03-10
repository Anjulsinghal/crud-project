import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

// Sample data - you can replace this with your actual data source
const exchangesData = [
  { "id": 1, "value": "NSE", "expiryTime": "15:30:0" },
  { "id": 2, "value": "BSE", "expiryTime": "15:30:0" },
  { "id": 3, "value": "NFO", "expiryTime": "15:30:0" },
  { "id": 4, "value": "CDS", "expiryTime": "17:00:0" },
  { "id": 5, "value": "MCX", "expiryTime": "23:30:0" },
  { "id": 11, "value": "BSE", "expiryTime": "15:30:0" }
];

const ExchangesTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Exchanges</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Exchange Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expiry Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {exchangesData.map((exchange) => (
              <tr key={exchange.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exchange.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exchange.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exchange.expiryTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex">
                    <button className="text-blue-600 hover:text-blue-800 mr-2">
                      <Eye size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 mr-2">
                      <Edit size={18} />
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

export default ExchangesTable;
import React from 'react'
import { Bell, User, Menu, X, BarChart2, Database, Settings, HelpCircle, LogOut, Search, Eye, Edit, Trash2, FileText } from 'lucide-react';


const DashboardStats = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <BarChart2 size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Scripts</h3>
              <p className="text-2xl font-semibold text-gray-700">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <Database size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Exchanges</h3>
              <p className="text-2xl font-semibold text-gray-700">6</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <User size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Active Users</h3>
              <p className="text-2xl font-semibold text-gray-700">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <Bell size={24} />
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Notifications</h3>
              <p className="text-2xl font-semibold text-gray-700">5</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default DashboardStats
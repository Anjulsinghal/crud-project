import React, { useState } from 'react';
import { Bell, User, Menu, X, BarChart2, Database, Settings, HelpCircle, LogOut, Search } from 'lucide-react';
import ScriptsTable from '../components/ScriptsTable';
import ExchangesTable from '../components/ExchangesTable';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
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
          <div className="p-3 rounded-full bg-green-100 text-green-600">
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
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
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
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
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

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center justify-between px-4">
          <div className="text-xl font-bold">Admin Panel</div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mt-10">
          <a className="flex items-center px-4 py-3 text-white bg-blue-600 rounded-md" href="#">
            <BarChart2 className="mr-3" size={20} />
            Dashboard
          </a>
          <a className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md mt-2" href="#">
            <Database className="mr-3" size={20} />
            Scripts & Exchanges
          </a>
          <a className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md mt-2" href="#">
            <User className="mr-3" size={20} />
            Users
          </a>
          <a className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md mt-2" href="#">
            <Settings className="mr-3" size={20} />
            Settings
          </a>
          <a className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md mt-2" href="#">
            <HelpCircle className="mr-3" size={20} />
            Help & Support
          </a>
          <a className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md mt-2" href="#">
            <LogOut className="mr-3" size={20} />
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-md">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button className="md:hidden mr-4" onClick={() => setSidebarOpen(true)}>
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <div className="relative mr-4">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="rounded-md px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="relative mr-4">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-2">A</div>
                <span className="hidden md:inline">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
          
          {/* Dashboard Stats */}
          <DashboardStats />
          
          {/* Scripts Table */}
          <div className="mb-6">
            <ScriptsTable />
          </div>
          
          {/* Exchanges Table */}
          <div className="mb-6">
            <ExchangesTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
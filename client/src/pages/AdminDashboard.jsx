import React, { useEffect, useRef, useState } from 'react';
import { Bell, User, Menu, X, BarChart2, Database, Settings, HelpCircle, LogOut, Search, Eye, Edit, Trash2, FileText } from 'lucide-react';
import ScriptsTable from '../components/ScriptsTable';
import ExchangesTable from '../components/ExchangesTable';
import DashboardStats from '../components/DashboardStats';




const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Handle clicks outside the search box
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    // Add event listener when search is open
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="flex items-center justify-between px-4">
          <div className="text-xl font-bold">FPrognos</div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mt-10">
          <a className="flex items-center px-4 py-3 text-white bg-blue-800 rounded-md" href="#">
            <BarChart2 className="mr-3" size={20} />
            Dashboard
          </a>
          <a className="flex items-center px-4 py-3 text-white hover:text-white hover:bg-blue-800 rounded-md mt-2" href="#">
            <Database className="mr-3" size={20} />
            Scripts & Exchanges
          </a>
          <a className="flex items-center px-4 py-3 text-white hover:text-white hover:bg-blue-800 rounded-md mt-2" href="#">
            <User className="mr-3" size={20} />
            Users
          </a>
          <a className="flex items-center px-4 py-3 text-white hover:text-white hover:bg-blue-800 rounded-md mt-2" href="#">
            <Settings className="mr-3" size={20} />
            Settings
          </a>
          <a className="flex items-center px-4 py-3 text-white hover:text-white hover:bg-blue-800 rounded-md mt-2" href="#">
            <HelpCircle className="mr-3" size={20} />
            Help & Support
          </a>
          <a className="flex items-center px-4 py-3 text-white hover:text-white hover:bg-blue-800 rounded-md mt-2" href="#">
            <LogOut className="mr-3" size={20} />
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-blue-900 shadow-md text-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4 hover:bg-blue-800 p-1 rounded-full transition-colors duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              {/* Mobile search */}
              <div className="md:hidden" ref={searchRef}>
                <div className={`flex items-center transition-all duration-300 ease-in-out ${searchOpen ? 'w-36 opacity-100' : 'w-0 opacity-0'}`}>
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Search..."
                      className="rounded-md px-3 py-1 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 text-sm transition-all duration-200"
                      autoFocus
                    />
                  )}
                </div>
                {!searchOpen && (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="mr-4 hover:bg-blue-800 p-1 rounded-full transition-colors duration-200"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Desktop search box - only visible on md and larger screens */}
              <div className="hidden md:block relative mr-4 group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded-md px-4 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 group-hover:ring-1 group-hover:ring-blue-400 transition-all duration-200"
                />
                <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
              </div>

              <button className="relative mr-4 hover:bg-blue-800 p-1 rounded-full transition-colors duration-200">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">5</span>
              </button>
              <div className="flex items-center group cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-white text-blue-900 flex items-center justify-center font-bold mr-2 group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-200">A</div>
                <span className="hidden md:inline group-hover:underline">Admin User</span>
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
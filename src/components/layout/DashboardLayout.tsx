import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar />
        <main className="ml-64 p-8 animate-in fade-in duration-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/Calendar';
import PlannerPage from './pages/Planner';
import IdeaBoard from './pages/IdeaBoard';
import AnalyticsPage from './pages/Analytics';
import SettingsPage from './pages/Settings';

// Simple placeholder components for other pages
const PostsPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
      <span className="text-4xl text-slate-300">📦</span>
    </div>
    <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Post Management</h2>
    <p className="text-slate-500 max-w-sm">This page is currently under development. Here you will be able to manage all your published and scheduled content.</p>
  </div>
);

const TeamPage = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-6">
      <span className="text-4xl text-slate-300">👥</span>
    </div>
    <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">Team Collaboration</h2>
    <p className="text-slate-500 max-w-sm">Collaboration features coming soon. Invite your team members and assign tasks directly to your content workflow.</p>
  </div>
);

const LoginPage = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div className="max-w-md w-full glass p-10 rounded-[3rem] soft-shadow text-center">
      <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center shadow-lg shadow-primary-green/20 mx-auto mb-8">
        <span className="text-white text-3xl font-bold font-display">S</span>
      </div>
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-2">Welcome Back</h1>
      <p className="text-slate-500 font-medium mb-10">Sign in to your Socially account</p>
      
      <div className="space-y-4">
        <div className="text-left">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Email Address</label>
          <input type="email" placeholder="name@company.com" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all" />
        </div>
        <div className="text-left">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all" />
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full py-4 gradient-bg text-white rounded-2xl font-bold shadow-xl shadow-primary-pink/20 hover:opacity-90 active:scale-95 transition-all mt-4"
        >
          Sign In
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-4">
         <p className="text-sm font-medium text-slate-400">Don't have an account?</p>
         <button className="text-sm font-bold text-primary-pink hover:underline">Get Started</button>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="ideas" element={<IdeaBoard />} />
          <Route path="posts" element={<PostsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

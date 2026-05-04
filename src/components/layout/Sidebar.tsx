import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Calendar, 
  FileEdit, 
  Lightbulb, 
  ListTodo, 
  BarChart3, 
  Users2, 
  Settings,
  Sparkles
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/' },
    { icon: Calendar, label: t('calendar'), path: '/calendar' },
    { icon: FileEdit, label: t('planner'), path: '/planner' },
    { icon: Lightbulb, label: t('idea_board'), path: '/ideas' },
    { icon: ListTodo, label: t('posts'), path: '/posts' },
    { icon: BarChart3, label: t('analytics'), path: '/analytics' },
    { icon: Users2, label: t('team'), path: '/team' },
    { icon: Settings, label: t('settings'), path: '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-50">
      <div className="mb-10 p-8 px-10">
        <h1 className="text-2xl font-bold font-display italic tracking-tight gradient-text">SociaFlow</h1>
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Content Management</p>
      </div>

      <nav className="flex-1 px-0 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-10 py-3.5 transition-all duration-300 group",
              isActive 
                ? "sidebar-link-active font-bold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
            )}
          >
            <item.icon className={cn("w-4 h-4", "group-hover:scale-110 transition-transform duration-300")} />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-6 bg-slate-50 m-4 rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-pink-400 shadow-sm" />
          <div>
            <p className="text-xs font-bold text-slate-800">Puji Rahmadani</p>
            <p className="text-[10px] text-slate-500 font-medium">Pro Plan</p>
          </div>
        </div>
        <button className="w-full py-2 bg-white border border-slate-200 text-[10px] font-bold rounded-lg uppercase tracking-wider hover:bg-slate-100 transition-colors">
          {t('settings')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

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

      <div className="mt-auto p-4 m-4">
        <NavLink to="/pricing" className="block">
          <div className="p-5 rounded-2xl bg-linear-to-br from-emerald-600 to-emerald-400 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Trial Status</span>
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-md">8 DAYS</span>
              </div>
              <p className="text-sm font-bold mb-1">Upgrade to Pro</p>
              <p className="text-[10px] opacity-70 mb-4 font-medium italic">Unleash full editorial power</p>
              <div className="w-full h-1.5 bg-white/20 rounded-full mb-4">
                <div className="w-[45%] h-full bg-white rounded-full" />
              </div>
              <button className="w-full py-2 bg-white text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors">
                {t('upgrade_now')}
              </button>
            </div>
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-1000" />
          </div>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

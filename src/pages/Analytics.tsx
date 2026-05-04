import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  TrendingUp, 
  Users2, 
  Eye, 
  MousePointer2, 
  Share2,
  Download,
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from '@/src/lib/utils';

const COLORS = ['#10B981', '#EC4899', '#6366F1', '#F59E0B'];

const barData = [
  { name: 'Mon', views: 4000, clicks: 2400 },
  { name: 'Tue', views: 3000, clicks: 1398 },
  { name: 'Wed', views: 2000, clicks: 9800 },
  { name: 'Thu', views: 2780, clicks: 3908 },
  { name: 'Fri', views: 1890, clicks: 4800 },
  { name: 'Sat', views: 2390, clicks: 3800 },
  { name: 'Sun', views: 3490, clicks: 4300 },
];

const pieData = [
  { name: 'Instagram', value: 400 },
  { name: 'TikTok', value: 300 },
  { name: 'Facebook', value: 200 },
  { name: 'Twitter', value: 100 },
];

const AnalyticsCard = ({ title, value, growth, icon: Icon, color }: any) => (
  <div className="glass p-6 rounded-3xl soft-shadow">
    <div className="flex items-center gap-4 mb-4">
      <div className={cn("p-2 rounded-xl bg-opacity-10", color.replace('text-', 'bg-'))}>
        <Icon className={cn("w-5 h-5", color)} />
      </div>
      <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{title}</p>
    </div>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-display font-bold text-slate-900">{value}</h3>
      <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
        <TrendingUp className="w-3 h-3" />
        {growth}
      </div>
    </div>
  </div>
);

const AnalyticsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('analytics')}</h1>
          <p className="text-slate-500 font-medium">Deep dive into your social media performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <CalendarIcon className="w-4 h-4" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard title="Total Views" value="452.1k" growth="+12.4%" icon={Eye} color="text-indigo-500" />
        <AnalyticsCard title="Engagement" value="4.2%" growth="+2.1%" icon={Share2} color="text-pink-500" />
        <AnalyticsCard title="Profile Clicks" value="12,842" growth="+5.7%" icon={MousePointer2} color="text-primary-green" />
        <AnalyticsCard title="Growth" value="+1.2k" growth="+8.3%" icon={Users2} color="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl soft-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-bold text-slate-900">Engagement Over Time</h3>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-indigo-500" />
                 <span className="text-xs font-bold text-slate-400">Views</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-primary-green" />
                 <span className="text-xs font-bold text-slate-400">Clicks</span>
               </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="views" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="clicks" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl soft-shadow flex flex-col">
          <h3 className="text-xl font-display font-bold text-slate-900 mb-2">{t('platform_dist')}</h3>
          <p className="text-slate-400 text-sm mb-8 font-medium">Which platform drives the most traffic?</p>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    padding: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-display font-bold text-slate-900">1.2k</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Posts</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-700">{item.name}</p>
                  <p className="text-[10px] font-bold text-slate-400">{item.value} Posts</p>
                </div>
                <span className="text-xs font-black text-slate-900">{(item.value/10).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

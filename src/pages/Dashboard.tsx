import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  FileText,
  Instagram,
  Facebook,
  Twitter,
  Image as ImageIcon,
  Unlock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { NavLink } from 'react-router-dom';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1000 },
];

const StatCard = ({ title, value, growth, icon: Icon, color, bgColor }: any) => (
  <div className={cn("glass-card p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300", bgColor)}>
    <div className="flex justify-between items-start mb-4">
      <p className={cn("text-[10px] font-bold uppercase tracking-wider mb-1", color)}>{title}</p>
    </div>
    <h3 className="text-3xl font-display text-slate-800">{value}</h3>
    <p className={cn("text-[10px] mt-2 font-medium", color.replace('text-', 'text-opacity-70 text-'))}>{growth}</p>
  </div>
);

const Dashboard = () => {
  const { t } = useTranslation();
  const [sub, setSub] = useState<any>(null);

  useEffect(() => {
    fetch('/api/user-details')
      .then(res => res.json())
      .then(data => setSub(data.subscription))
      .catch(console.error);
  }, []);

  const getTrialDaysLeft = (endDateStr: string) => {
    const end = new Date(endDateStr);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isBusiness = sub?.plan_id === 'business';
  const trialDays = sub?.status === 'trialing' ? getTrialDaysLeft(sub.trial_end) : 0;

  return (
    <div className="space-y-10">
      {/* Trial Countdown Banner */}
      {sub?.status === 'trialing' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 p-4 rounded-2xl flex items-center justify-between text-white shadow-xl shadow-emerald-500/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-display font-black">
              {trialDays}
            </div>
            <div>
              <p className="text-sm font-bold">{t('trial_ends_in', { days: trialDays })}</p>
              <p className="text-[10px] opacity-80 font-medium">Upgrade sekarang untuk mempertahankan akses ke fitur Pro & Kolaborasi Tim.</p>
            </div>
          </div>
          <NavLink to="/pricing">
            <button className="bg-white text-emerald-600 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-95 shadow-lg">
              Upgrade
            </button>
          </NavLink>
        </motion.div>
      )}

      <header className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-4xl font-display font-medium text-slate-800">
            {t('welcome_back')} <span className="italic">Puji</span>.
          </h1>
          <p className="text-sm text-slate-400 mt-2">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('total_content')} value="1,284" growth="↑ 12% dari bulan lalu" color="text-emerald-700" bgColor="bg-emerald-50/50 border-emerald-100" icon={() => null} />
        <StatCard title={t('status_scheduled')} value="24" growth="Untuk 7 hari ke depan" color="text-pink-700" bgColor="bg-pink-50/50 border-pink-100" icon={() => null} />
        <StatCard title={t('usage')} value={sub?.plan_id === 'free' ? "100%" : "42%"} growth={sub?.plan_id === 'free' ? "Limit tercapai" : "Limit penjadwalan"} color="text-slate-400" bgColor="bg-white" icon={() => null} />
        <StatCard title="Engagement" value="4.2%" growth="Statistik rata-rata" color="text-emerald-600" bgColor="bg-white" icon={() => null} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Performance Chart */}
        <div className="lg:col-span-2 space-y-8">
           {/* Section Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-display text-slate-800">{t('upcoming_posts')}</h3>
            <button className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline transition-all">Lihat Kalender →</button>
          </div>
          
          <div className="space-y-4">
            {[
              { platform: 'Instagram', time: '14:00 WIB', title: '5 Tips Memulai Bisnis Coffee Shop', type: 'Carousel', status: 'Scheduled', icon: 'Scheduled', statusBg: 'bg-emerald-100 text-emerald-700', isLocked: false },
              { platform: 'TikTok', time: 'Besok, 10:00 WIB', title: 'VLOG: Sehari di Kantor Startup', type: 'Video', status: 'Drafting', icon: 'Drafting', statusBg: 'bg-pink-100 text-pink-700', isLocked: false },
              { platform: 'Meta Ads', time: 'Promoted', title: 'Campaign: Summer Sale 2024', type: 'Ad', status: isBusiness ? 'Scheduled' : 'Business Feature', icon: isBusiness ? 'Check' : 'Locked', statusBg: isBusiness ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400', isLocked: !isBusiness },
            ].map((post, i) => (
              <div key={i} className={cn(
                "glass-card p-5 flex items-center justify-between group transition-all cursor-pointer relative overflow-hidden",
                post.isLocked ? "bg-slate-50/50 grayscale opacity-70" : "hover:scale-[1.01]"
              )}>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center font-display text-slate-400 text-xs shadow-inner uppercase">
                    {post.platform.substring(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{post.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{post.platform} • {post.type} • {post.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {post.isLocked && <Unlock className="w-4 h-4 text-emerald-500 animate-pulse" />}
                  <span className={cn("platform-badge px-3 py-1", post.statusBg)}>{post.status}</span>
                </div>
                {post.isLocked && (
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <NavLink to="/pricing">
                       <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Buka Fitur Business</button>
                     </NavLink>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Usage Visualization */}
          <div className="glass-card p-8 bg-linear-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                <h4 className="text-lg font-display font-medium">Batas Penggunaan Paket {sub?.plan_id === 'free' ? 'Free' : sub?.plan_id === 'business' ? 'Business' : 'Pro'}</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  {sub?.plan_id === 'free' ? 'Anda telah menggunakan semua limit konten terjadwal paket Free.' : `Anda telah menggunakan 42 dari ${sub?.plan_id === 'business' ? '∞' : '100'} konten terjadwal bulan ini.`}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - (sub?.plan_id === 'free' ? 1 : 0.42))} className="text-emerald-500" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-xl">{sub?.plan_id === 'free' ? '100%' : '42%'}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-50 text-emerald-400">Status</p>
                  <p className="text-sm font-bold">{sub?.plan_id === 'free' ? 'Upgrade' : 'Aman'}</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Featured Idea */}
        <div className="space-y-6">
          <h3 className="text-xl font-display text-slate-800">{t('recent_ideas')}</h3>
          <div className="glass-card bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-70">Priority: High</span>
              <h4 className="text-xl font-display leading-tight mt-3 mb-6">Trend Retro Aesthetic untuk Branding UMKM</h4>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg">
                Gunakan Ide Ini
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 text-[10rem] group-hover:scale-110 transition-transform duration-700 select-none">💡</div>
          </div>

          <div className="space-y-2 mt-4">
            {[
              { color: 'bg-pink-400', title: 'User Interview: Pain Points Content Creator' },
              { color: 'bg-emerald-400', title: 'Behind the scenes: Photoshoot Product' }
            ].map((item, idx) => (
              <div key={idx} className="p-4 border-b border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-white/50 transition-all rounded-xl">
                <div className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
                <p className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
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
  Image as ImageIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

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

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-end border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-4xl font-display font-medium text-slate-800">
            {t('welcome_back')} <span className="italic">Puji</span>.
          </h1>
          <p className="text-sm text-slate-400 mt-2">Senin, 24 Mei 2024</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title={t('total_content')} value="1,284" growth="↑ 12% dari bulan lalu" color="text-emerald-700" bgColor="bg-emerald-50/50 border-emerald-100" icon={() => null} />
        <StatCard title={t('status_scheduled')} value="24" growth="Untuk 7 hari ke depan" color="text-pink-700" bgColor="bg-pink-50/50 border-pink-100" icon={() => null} />
        <StatCard title={t('status_draft')} value="08" growth="Butuh persetujuan" color="text-slate-400" bgColor="bg-white" icon={() => null} />
        <StatCard title="Engagement" value="4.2%" growth="Statistik rata-rata" color="text-emerald-600" bgColor="bg-white" icon={() => null} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Performance Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-display text-slate-800">{t('upcoming_posts')}</h3>
            <button className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline transition-all">Lihat Kalender →</button>
          </div>
          
          <div className="space-y-4">
            {[
              { platform: 'Instagram', time: '14:00 WIB', title: '5 Tips Memulai Bisnis Coffee Shop', type: 'Carousel', status: 'Scheduled', icon: 'Scheduled', statusBg: 'bg-emerald-100 text-emerald-700' },
              { platform: 'TikTok', time: 'Besok, 10:00 WIB', title: 'VLOG: Sehari di Kantor Startup', type: 'Video', status: 'Drafting', icon: 'Drafting', statusBg: 'bg-pink-100 text-pink-700' },
              { platform: 'Twitter', time: '26 Mei, 19:00 WIB', title: 'Update Fitur Baru App - Thread', type: 'Thread', status: 'Review', icon: 'Review', statusBg: 'bg-slate-100 text-slate-700' },
            ].map((post, i) => (
              <div key={i} className="glass-card p-5 flex items-center justify-between group hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center font-display text-slate-400 text-xs shadow-inner uppercase">
                    {post.platform.substring(0, 1)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{post.title}</h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{post.platform} • {post.type} • {post.time}</p>
                  </div>
                </div>
                <span className={cn("platform-badge px-3 py-1", post.statusBg)}>{post.status}</span>
              </div>
            ))}
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

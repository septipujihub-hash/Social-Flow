import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Instagram,
  Twitter,
  Facebook,
  Tag
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const PlannerPage = () => {
  const { t } = useTranslation();

  const plans = [
    { title: "Product Launch Q2", platform: "Instagram", category: "Campaign", date: "2026-05-12", objective: "Awareness", status: "Draft" },
    { title: "Weekly Tips Series", platform: "TikTok", category: "Educational", date: "2026-05-15", objective: "Engagement", status: "Scheduled" },
    { title: "Customer Success Story", platform: "Facebook", category: "Testimonial", date: "2026-05-18", objective: "Conversion", status: "Review" },
    { title: "Industry News Recap", platform: "Twitter", category: "News", date: "2026-05-20", objective: "Authority", status: "Draft" },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-display font-bold text-slate-900">{t('planner')}</h1>
          <p className="text-slate-500 font-medium">Create and manage your content strategy.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-primary-pink/20">
          <Plus className="w-4 h-4" />
          Create Plan
        </button>
      </header>

      <div className="glass rounded-[2rem] p-4 flex flex-wrap items-center gap-4 soft-shadow">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Filter by campaign or platform..." className="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border-none rounded-xl outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4" />
          Category
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Tag className="w-4 h-4" />
          Objective
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {plans.map((plan, i) => (
          <div key={i} className="glass p-6 rounded-3xl soft-shadow hover:border-primary-green transition-all group flex items-center justify-between gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-primary-green/10 transition-colors">
                {plan.platform === 'Instagram' && <Instagram className="text-pink-500 w-6 h-6" />}
                {plan.platform === 'TikTok' && <Plus className="text-slate-900 w-6 h-6" />}
                {plan.platform === 'Twitter' && <Twitter className="text-sky-500 w-6 h-6" />}
                {plan.platform === 'Facebook' && <Facebook className="text-blue-600 w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{plan.title}</h3>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <span className="uppercase tracking-wider">{plan.platform}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-slate-500">{plan.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Date</p>
                <p className="text-sm font-bold text-slate-700">{plan.date}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Objective</p>
                <p className="text-sm font-bold text-primary-pink uppercase">{plan.objective}</p>
              </div>
              <div className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold",
                plan.status === 'Scheduled' ? "bg-emerald-100 text-emerald-600" :
                plan.status === 'Review' ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"
              )}>
                {plan.status}
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                <MoreHorizontal className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerPage;

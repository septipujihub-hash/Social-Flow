import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Globe, ChevronDown, User } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Topbar = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-sm border-b border-slate-50 px-10 flex items-center justify-between sticky top-0 z-40 ml-64 transition-all">
      <div className="flex-1 max-w-sm">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-primary-green)] transition-colors">🔍</span>
          <input 
            type="text" 
            placeholder={t('search')} 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-100 rounded-full text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary-green)]/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1 rounded-full px-2 shadow-sm">
          <button 
            onClick={() => i18n.changeLanguage('id')}
            className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-full transition-all",
              i18n.language === 'id' ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-slate-600"
            )}
          >
            ID
          </button>
          <button 
            onClick={() => i18n.changeLanguage('en')}
            className={cn(
              "px-3 py-1 text-[10px] font-bold rounded-full transition-all",
              i18n.language === 'en' ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-slate-600"
            )}
          >
            EN
          </button>
        </div>

        <button className="relative group p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
          <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-900 transition-colors" />
        </button>

        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95">
          + {t('new_post')}
        </button>
      </div>
    </header>
  );
};

export default Topbar;

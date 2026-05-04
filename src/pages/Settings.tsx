import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  Share2,
  ChevronRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", desc: "Update your personal details", color: "bg-blue-100 text-blue-600" },
        { icon: CreditCard, label: "Billing & Plans", desc: "Manage your subscription", color: "bg-emerald-100 text-emerald-600" },
        { icon: Lock, label: "Security", desc: "Password and 2FA settings", color: "bg-rose-100 text-rose-600" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Bell, label: "Notifications", desc: "Configure alert settings", color: "bg-indigo-100 text-indigo-600" },
        { icon: Palette, label: "Appearance", desc: "Themes and visual styles", color: "bg-amber-100 text-amber-600" },
        { icon: Share2, label: "Social Connections", desc: "Manage API integrations", color: "bg-pink-100 text-pink-600" },
      ]
    }
  ];

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <header>
        <h1 className="text-4xl font-display font-bold text-slate-900">{t('settings')}</h1>
        <p className="text-slate-500 font-medium">Manage your account preferences and integrations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-2">
          {["General", "Security", "Notifications", "Integrations", "Billing"].map((tab) => (
            <button 
              key={tab} 
              className={cn(
                "w-full text-left px-6 py-3 rounded-2xl font-bold text-sm transition-all",
                tab === "General" ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-8">
          {/* Profile Card */}
          <div className="glass p-8 rounded-[2.5rem] soft-shadow flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                 <User className="w-12 h-12 text-slate-300" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary-green text-white rounded-full border-4 border-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Palette className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-slate-900">Puji Rahmadani</h3>
              <p className="text-slate-400 font-medium mb-3">pujirahmadani27@gmail.com</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-primary-pink/10 text-primary-pink text-[10px] font-black uppercase tracking-widest">Enterprise</span>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-8">
             <div className="glass p-8 rounded-[2.5rem] soft-shadow">
               <h3 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <Globe className="w-5 h-5 text-primary-green" />
                 Language Selection
               </h3>
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { id: 'id', name: 'Bahasa Indonesia', native: 'Indonesia' },
                   { id: 'en', name: 'English (US)', native: 'English' }
                 ].map((lang) => (
                   <button 
                    key={lang.id}
                    onClick={() => changeLanguage(lang.id)}
                    className={cn(
                      "p-5 rounded-3xl border-2 transition-all flex flex-col items-center gap-2",
                      i18n.language === lang.id 
                        ? "border-primary-green bg-primary-green/5 shadow-inner" 
                        : "border-slate-100 bg-white hover:border-slate-200"
                    )}
                   >
                     <span className={cn(
                       "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                       i18n.language === lang.id ? "border-primary-green" : "border-slate-300"
                     )}>
                       {i18n.language === lang.id && <div className="w-2.5 h-2.5 bg-primary-green rounded-full underline" />}
                     </span>
                     <span className="font-bold text-slate-900">{lang.name}</span>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{lang.native}</span>
                   </button>
                 ))}
               </div>
             </div>

             {sections.map((section, idx) => (
               <div key={idx} className="glass p-8 rounded-[2.5rem] soft-shadow">
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-6">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <button key={i} className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-3 rounded-2xl", item.color)}>
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                      </button>
                    ))}
                  </div>
               </div>
             ))}

             <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold mb-1">Two-Factor Authentication</h3>
                  <p className="text-slate-400 text-sm font-medium">Add an extra layer of security to your account.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 flex items-center gap-1 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    Recommended
                  </span>
                  <button className="px-6 py-2 bg-white text-slate-900 rounded-xl font-bold text-sm">Enable</button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

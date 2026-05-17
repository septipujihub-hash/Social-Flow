import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  Share2,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Plus,
  MoreVertical,
  Download
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('General');
  const [billingData, setBillingData] = useState<{ subscription: any, history: any[] }>({
    subscription: null,
    history: []
  });

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const response = await fetch('/api/user-details');
      const data = await response.json();
      setBillingData({
        subscription: data.subscription,
        history: data.history
      });
    } catch (error) {
      console.error('Error fetching billing data:', error);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const getTrialDaysLeft = (endDateStr: string) => {
    const end = new Date(endDateStr);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile Information", desc: "Update your personal details", color: "bg-blue-100 text-blue-600" },
        { icon: CreditCard, label: "Billing & Plans", desc: "Manage your subscription", color: "bg-emerald-100 text-emerald-600", tab: 'Billing' },
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

  const sub = billingData.subscription;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <header>
        <h1 className="text-4xl font-display font-bold text-slate-900">{t('settings')}</h1>
        <p className="text-slate-500 font-medium">Manage your account preferences and integrations.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="space-y-2">
          {["General", "Security", "Notifications", "Integrations", t('billing')].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={cn(
                "w-full text-left px-6 py-3 rounded-2xl font-bold text-sm transition-all",
                activeTab === tab ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"
              )}
            >
              {tab === t('billing') ? t('billing') : tab}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-8">
          {activeTab === 'General' && (
            <>
              {/* Profile Card */}
              <div className="glass-card p-8 soft-shadow flex items-center gap-6">
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
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      {sub?.plan_id === 'pro' ? t('pro_plan') : sub?.plan_id === 'business' ? t('business_plan') : t('free_plan')}
                    </span>
                    {sub?.status === 'trialing' && (
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black uppercase tracking-widest">Active Trial</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Language Settings */}
              <div className="glass-card p-8 soft-shadow">
                <h3 className="text-lg font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-500" />
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
                          ? "border-emerald-500 bg-emerald-500/5 shadow-inner" 
                          : "border-slate-100 bg-white hover:border-slate-200"
                      )}
                    >
                      <span className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        i18n.language === lang.id ? "border-emerald-500" : "border-slate-300"
                      )}>
                        {i18n.language === lang.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                      </span>
                      <span className="font-bold text-slate-900">{lang.name}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{lang.native}</span>
                    </button>
                  ))}
                </div>
              </div>

              {sections.map((section, idx) => (
                <div key={idx} className="glass-card p-8 soft-shadow">
                  <h3 className="text-lg font-display font-bold text-slate-900 mb-6">{section.title}</h3>
                  <div className="space-y-4">
                    {section.items.map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => item.tab && setActiveTab(item.tab)}
                        className="w-full flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 transition-all group"
                      >
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
            </>
          )}

          {activeTab === t('billing') && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              {/* Active Plan Overview */}
              <div className="glass-card p-8 soft-shadow gradient-bg text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">{t('current_plan')}</p>
                      <h3 className="text-3xl font-display font-bold tracking-tight">
                        {sub?.plan_id === 'pro' ? t('pro_plan') : sub?.plan_id === 'business' ? t('business_plan') : t('free_plan')}
                      </h3>
                    </div>
                    {sub?.status === 'trialing' && (
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                        {t('trial_ends_in', { days: getTrialDaysLeft(sub.trial_end) })}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1 items-baseline mb-8">
                    <span className="text-4xl font-display font-bold font-black">
                      {sub?.plan_id === 'pro' ? '$10' : sub?.plan_id === 'business' ? '$22' : '$0'}
                    </span>
                    <span className="text-xs opacity-70 font-medium">/{sub?.billing_cycle || 'month'}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm font-bold opacity-90">
                      <ShieldCheck className="w-5 h-5" />
                      {sub?.status === 'trialing' ? `Ends: ${formatDate(sub.trial_end)}` : `Next renewal: ${formatDate(sub.current_period_end)}`}
                    </div>
                    <NavLink to="/pricing">
                      <button className="bg-white text-emerald-600 px-6 py-2.5 rounded-xl text-xs font-bold shadow-xl hover:bg-emerald-50 transition-all active:scale-95">
                        {t('upgrade_now')}
                      </button>
                    </NavLink>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-10 text-[15rem] -rotate-12 translate-x-10 group-hover:rotate-0 transition-transform duration-1000">🚀</div>
              </div>

              {/* Usage Limits */}
              <div className="glass-card p-8 soft-shadow space-y-8">
                <h3 className="text-lg font-display font-bold text-slate-900">{t('usage')}</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-500">{t('limit_posts')}</span>
                      <span className="text-emerald-500">42 / {sub?.plan_id === 'free' ? '10' : '∞'}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full gradient-bg rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]", sub?.plan_id === 'free' ? "w-full bg-rose-500" : "w-[42%]")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                      <span className="text-slate-500">{t('limit_ideas')}</span>
                      <span className="text-emerald-500">12 / {sub?.plan_id === 'free' ? '10' : '∞'}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full gradient-bg rounded-full", sub?.plan_id === 'free' ? "w-full bg-rose-500" : "w-[15%]")} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass-card p-8 soft-shadow">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-display font-bold text-slate-900">{t('payment_method')}</h3>
                  <button className="flex items-center gap-2 text-primary-pink text-xs font-bold hover:underline">
                    <Plus className="w-4 h-4" />
                    {t('add_card')}
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { type: 'Visa', last4: '4242', exp: '04/28', isDefault: true },
                    { type: 'Mastercard', last4: '8812', exp: '12/26', isDefault: false }
                  ].map((card, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-3xl border border-slate-100 bg-slate-50 group hover:bg-white hover:border-emerald-500/30 transition-all shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-black text-white italic tracking-tighter">
                          {card.type}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-slate-800">•••• •••• •••• {card.last4}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Expires {card.exp}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {card.isDefault && (
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">Default</span>
                        )}
                        <button className="p-2 text-slate-300 hover:text-slate-900">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Invoice History */}
              <div className="glass-card p-8 soft-shadow">
                 <h3 className="text-lg font-display font-bold text-slate-900 mb-6">{t('payment_history')}</h3>
                 <div className="overflow-x-auto">
                   <table className="w-full">
                     <thead>
                       <tr className="border-b border-slate-100">
                         <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('invoice_number')}</th>
                         <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('date')}</th>
                         <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('amount')}</th>
                         <th className="pb-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('status')}</th>
                         <th className="pb-4 text-right"></th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                       {billingData.history.map((invoice, i) => (
                         <tr key={i} className="group hover:bg-slate-50 transition-colors">
                            <td className="py-4 text-sm font-bold text-slate-700">{invoice.invoice_number}</td>
                            <td className="py-4 text-sm text-slate-500 font-medium">{formatDate(invoice.date)}</td>
                            <td className="py-4 text-sm font-bold text-slate-900">{invoice.amount}</td>
                            <td className="py-4">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                invoice.status === 'Paid' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                              )}>
                                {invoice.status}
                              </span>
                            </td>
                            <td className="py-4 text-right">
                              <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                                <Download className="w-4 h-4" />
                              </button>
                            </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

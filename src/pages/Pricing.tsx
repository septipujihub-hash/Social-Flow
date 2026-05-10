import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Zap, Rocket, Building2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const PricingPage = () => {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      id: 'free',
      name: t('free_plan'),
      price: '0',
      description: 'Perfect for getting started and exploring current trends.',
      icon: Zap,
      features: [
        'Limited content scheduling (10/mo)',
        '10 storage slots for content ideas',
        'Basic analytics overview',
        'Single user access',
        'Email support'
      ],
      buttonText: t('get_started'),
      isCurrent: false,
      color: 'bg-slate-100 text-slate-800'
    },
    {
      id: 'pro',
      name: t('pro_plan'),
      price: isYearly ? '8' : '10',
      description: 'Advanced features for creators and growing small businesses.',
      icon: Rocket,
      features: [
        'Unlimited content scheduling',
        'Unlimited content ideas & planner',
        'Advanced platform analytics',
        'Multi-platform management',
        'Team collaboration (up to 3 users)',
        'Priority email support'
      ],
      buttonText: t('upgrade_now'),
      isCurrent: true,
      highlight: true,
      color: 'bg-emerald-500 text-white',
      badge: t('most_popular')
    },
    {
      id: 'business',
      name: t('business_plan'),
      price: isYearly ? '18' : '22',
      description: 'Complete workflow control for digital marketing agencies.',
      icon: Building2,
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'Advanced workflow automation',
        'Custom performance reporting',
        'Role and permission management',
        'Dedicated account manager'
      ],
      buttonText: t('upgrade_now'),
      isCurrent: false,
      color: 'bg-slate-900 text-white'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-medium text-slate-900 mb-6 tracking-tight">
          Choose the right plan for <span className="italic">your growth</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          Whether you're just starting or scaling an agency, we have a plan that fits your social media needs perfectly.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={cn("text-sm font-bold transition-all", !isYearly ? "text-slate-900" : "text-slate-400")}>{t('monthly')}</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-8 bg-slate-200 rounded-full p-1 relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          >
            <motion.div 
              animate={{ x: isYearly ? 24 : 0 }}
              className="w-6 h-6 bg-white rounded-full shadow-md"
            />
          </button>
          <span className={cn("text-sm font-bold transition-all", isYearly ? "text-slate-900" : "text-slate-400")}>
            {t('yearly')}
            <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-full">
              {t('save_20')}
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "glass-card p-8 flex flex-col relative transition-all duration-500",
              plan.highlight ? "border-emerald-500 ring-4 ring-emerald-500/10 scale-105 z-10" : "border-slate-100"
            )}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-amber-400 to-rose-400 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(251,191,36,0.4)] flex items-center gap-2 z-20">
                <Star className="w-3 h-3 fill-white animate-pulse" />
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500", 
                plan.highlight ? "bg-emerald-100 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-slate-100 text-slate-600"
              )}>
                <plan.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-display font-bold text-slate-900">${plan.price}</span>
              <span className="text-slate-400 text-sm font-medium">/{isYearly ? 'year' : 'month'}</span>
            </div>

            <div className="space-y-4 mb-10 flex-1">
              <p className="text-xs font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">{t('features')}</p>
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 group/feat">
                  <div className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover/feat:bg-emerald-500 group-hover/feat:text-white transition-colors duration-300">
                    <Check className="w-3 h-3 text-emerald-500 group-hover/feat:text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600 leading-tight group-hover/feat:text-slate-900 transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            {plan.highlight && (
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
            )}

            <button className={cn(
              "w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl relative z-10 overflow-hidden group/btn",
              plan.highlight 
                ? "bg-emerald-500 text-white shadow-emerald-500/20 hover:shadow-emerald-500/40" 
                : "bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800",
              plan.isCurrent && "bg-white text-emerald-500 border-2 border-emerald-500 shadow-none hover:translate-y-0 cursor-default"
            )}>
              <span className="relative z-10">{plan.isCurrent ? t('current_plan') : plan.buttonText}</span>
              {plan.highlight && !plan.isCurrent && (
                <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-400 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badges / Footer */}
      <div className="mt-24 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by 10,000+ creators worldwide</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="text-2xl font-display italic font-bold">InstaVibe</div>
          <div className="text-2xl font-display italic font-bold">Trendify</div>
          <div className="text-2xl font-display italic font-bold">SocialLink</div>
          <div className="text-2xl font-display italic font-bold">BrandSpark</div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

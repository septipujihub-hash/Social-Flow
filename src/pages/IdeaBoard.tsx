import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Lightbulb, 
  Star, 
  MoreVertical,
  MessageSquare,
  Paperclip
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

const IdeaBoard = () => {
  const { t } = useTranslation();

  const columns = [
    { title: "Raw Ideas", items: [
      { title: "UGC Trend React", priority: "High", comments: 12, attachment: 2 },
      { title: "Weekly Roundup Audio", priority: "Medium", comments: 3, attachment: 0 },
      { title: "Software Review Series", priority: "Low", comments: 0, attachment: 1 }
    ]},
    { title: "In Development", items: [
      { title: "How-to: Content Strategy", priority: "High", comments: 24, attachment: 5 },
      { title: "Collaboration with @puji", priority: "Medium", comments: 8, attachment: 2 }
    ]},
    { title: "Ready for Planner", items: [
      { title: "New Feature Teaser", priority: "High", comments: 45, attachment: 12 }
    ]}
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-8 animate-in zoom-in-95 duration-500">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-100">
            <Lightbulb className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-slate-900">{t('idea_board')}</h1>
            <p className="text-slate-500 font-medium">Capture inspiration and turn them into viral posts.</p>
          </div>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
            <Plus className="w-4 h-4" />
            {t('add_idea')}
          </button>
        </div>
      </header>

      <div className="flex-1 flex gap-8 overflow-x-auto pb-4 custom-scrollbar">
        {columns.map((column, i) => (
          <div key={i} className="min-w-[340px] w-[340px] flex flex-col space-y-4">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <h3 className="font-display font-bold text-slate-900">{column.title}</h3>
                <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{column.items.length}</span>
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {column.items.map((item, idx) => (
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  key={idx} 
                  className="glass p-5 rounded-2xl soft-shadow border-none cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md",
                      item.priority === 'High' ? "bg-rose-100 text-rose-500" :
                      item.priority === 'Medium' ? "bg-amber-100 text-amber-500" : "bg-emerald-100 text-emerald-500"
                    )}>
                      {item.priority}
                    </span>
                    <button className="text-slate-300 hover:text-slate-900">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-6 leading-tight">{item.title}</h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">{item.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold">{item.attachment}</span>
                      </div>
                    </div>
                    <div className="flex -space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-white" />
                      <div className="w-6 h-6 rounded-full bg-slate-200 border border-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-primary-green hover:text-primary-green transition-all">
                + Add Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaBoard;

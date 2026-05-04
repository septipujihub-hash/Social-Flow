import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Plus, Instagram, Twitter, Facebook } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const CalendarPage = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  // Mock events
  const events = [
    { date: new Date(), platform: 'Instagram', title: 'Summer Sale', color: 'bg-primary-pink' },
    { date: addDays(new Date(), 2), platform: 'TikTok', title: 'Hacks Tutorial', color: 'bg-primary-green' },
    { date: addDays(new Date(), 2), platform: 'Twitter', title: 'Poll Day', color: 'bg-sky-500' },
  ];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-center bg-white p-6 rounded-3xl soft-shadow">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-display font-bold text-slate-900">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>
            <button onClick={nextMonth} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
            Today
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 gradient-bg text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary-green/20">
            <Plus className="w-4 h-4" />
            {t('create_post')}
          </button>
        </div>
      </header>

      <div className="glass rounded-[2.5rem] overflow-hidden soft-shadow border-none">
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
          {days.map((day) => (
            <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dayEvents = events.filter(e => isSameDay(e.date, day));
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, monthStart);

            return (
              <div 
                key={i} 
                className={cn(
                  "min-h-[140px] p-4 border-r border-b border-slate-50 relative group hover:bg-slate-50/50 transition-colors",
                  !isCurrentMonth && "bg-slate-50/20"
                )}
              >
                <span className={cn(
                  "text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full mb-2",
                  isToday ? "bg-primary-green text-white shadow-lg shadow-primary-green/20" : "text-slate-900",
                  !isCurrentMonth && "text-slate-300"
                )}>
                  {format(day, 'd')}
                </span>

                <div className="space-y-1.5">
                  {dayEvents.map((event, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "px-2 py-1.5 rounded-lg text-[10px] font-bold text-white truncate shadow-sm",
                        event.color
                      )}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>

                <button className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white shadow-md text-primary-green opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

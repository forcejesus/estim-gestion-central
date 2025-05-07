
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface CalendarWidgetProps {
  className?: string;
  date?: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className, date, setDate }) => {
  // Sample schedule data for events
  const scheduleEvents = [
    { id: 1, date: new Date(2025, 4, 8), title: 'Réunion pédagogique', type: 'meeting', color: '#2196F3' },
    { id: 2, date: new Date(2025, 4, 10), title: 'Examen L2 Informatique', type: 'exam', color: '#F44336' },
    { id: 3, date: new Date(2025, 4, 12), title: 'Soutenance L3', type: 'defense', color: '#9C27B0' },
    { id: 4, date: new Date(2025, 4, 15), title: 'Conseil scientifique', type: 'meeting', color: '#2196F3' },
    { id: 5, date: new Date(2025, 4, 20), title: 'Examens de rattrapage', type: 'exam', color: '#F44336' },
    { id: 6, date: new Date(2025, 4, 22), title: 'Journée portes ouvertes', type: 'event', color: '#4CAF50' },
    { id: 7, date: new Date(2025, 4, 25), title: 'Remise des diplômes', type: 'ceremony', color: '#FF9800' },
  ];

  // Function to get current day events
  const getCurrentDayEvents = () => {
    if (!date) return [];
    return scheduleEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Highlight dates with events
  const highlightedDates = scheduleEvents.map(event => event.date);

  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'meeting': return 'Réunion';
      case 'exam': return 'Examen';
      case 'defense': return 'Soutenance';
      case 'event': return 'Événement';
      case 'ceremony': return 'Cérémonie';
      default: return 'Autre';
    }
  };

  return (
    <div className={className + " w-full"}>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border w-full win11-calendar"
            modifiers={{
              highlighted: (day) => {
                return highlightedDates.some(date => 
                  date.getDate() === day.getDate() && 
                  date.getMonth() === day.getMonth() && 
                  date.getFullYear() === day.getFullYear()
                );
              }
            }}
            modifiersStyles={{
              highlighted: { 
                backgroundColor: '#4caf5020',
                borderRadius: '100%',
                color: '#4CAF50',
                fontWeight: 'bold'
              }
            }}
          />
        </div>
        <div className="md:w-72 flex-shrink-0">
          <h3 className="font-medium text-sm mb-3">
            Évènements du {date?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          <div className="space-y-2 mt-4">
            {getCurrentDayEvents().length > 0 ? (
              getCurrentDayEvents().map(event => (
                <div 
                  key={event.id} 
                  className="flex items-start gap-3 p-3 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                >
                  <div 
                    className={`h-3 w-3 mt-1.5 rounded-full flex-shrink-0`} 
                    style={{ backgroundColor: event.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-1.5 py-0.5 bg-zinc-200 dark:bg-zinc-700 rounded text-zinc-700 dark:text-zinc-300">
                        {getEventTypeLabel(event.type)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md flex items-center gap-2">
                <CalendarIcon size={16} className="text-zinc-400" />
                <p className="text-sm text-muted-foreground">
                  Aucun événement programmé pour ce jour
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Légende</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-[#2196F3]"></div>
                <span>Réunion</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-[#F44336]"></div>
                <span>Examen</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-[#9C27B0]"></div>
                <span>Soutenance</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-[#4CAF50]"></div>
                <span>Événement</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="h-2.5 w-2.5 rounded-full bg-[#FF9800]"></div>
                <span>Cérémonie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;

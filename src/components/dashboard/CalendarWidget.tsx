
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface CalendarWidgetProps {
  className?: string;
  date?: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className, date, setDate }) => {
  // Sample schedule data
  const scheduleEvents = [
    { id: 1, date: new Date(2025, 4, 8), title: 'Réunion pédagogique', type: 'meeting' },
    { id: 2, date: new Date(2025, 4, 10), title: 'Examen L2 Informatique', type: 'exam' },
    { id: 3, date: new Date(2025, 4, 12), title: 'Soutenance L3', type: 'defense' },
    { id: 4, date: new Date(2025, 4, 15), title: 'Conseil scientifique', type: 'meeting' },
    { id: 5, date: new Date(2025, 4, 20), title: 'Examens de rattrapage', type: 'exam' },
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

  return (
    <Card className={className + " border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800 w-full"}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarIcon size={20} className="text-estim-green" />
          Calendrier
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
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
            <h3 className="font-medium text-sm mb-3">Évènements du {date?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
            <div className="space-y-2 mt-4">
              {getCurrentDayEvents().length > 0 ? (
                getCurrentDayEvents().map(event => (
                  <div 
                    key={event.id} 
                    className="flex items-center gap-3 p-3 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors"
                  >
                    <div className={`h-3 w-3 rounded-full ${
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
                  Aucun événement programmé pour ce jour
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;

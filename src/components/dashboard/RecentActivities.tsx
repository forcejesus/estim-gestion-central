
import React from 'react';
import { 
  Clock, 
  FileEdit, 
  CreditCard, 
  CalendarClock, 
  BookOpen,
  User
} from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  type: 'update' | 'payment' | 'calendar' | 'library';
  time: string;
  user: string;
  details: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  // Function to determine icon based on activity type
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'update':
        return <FileEdit className="h-5 w-5 text-blue-600" />;
      case 'payment':
        return <CreditCard className="h-5 w-5 text-green-600" />;
      case 'calendar':
        return <CalendarClock className="h-5 w-5 text-amber-600" />;
      case 'library':
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      default:
        return <FileEdit className="h-5 w-5 text-gray-600" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-750 transition-colors"
        >
          <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-700">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-zinc-900 dark:text-zinc-50">{activity.title}</h4>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">{activity.details}</div>
            <div className="flex items-center mt-1 gap-4 text-xs">
              <div className="flex items-center text-zinc-500 dark:text-zinc-400">
                <Clock className="mr-1 h-3 w-3" />
                {activity.time}
              </div>
              <div className="flex items-center text-zinc-500 dark:text-zinc-400">
                <User className="mr-1 h-3 w-3" />
                {activity.user}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button className="w-full py-2 text-sm text-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium">
        Afficher plus d'activités
      </button>
    </div>
  );
};

export default RecentActivities;

import React from 'react';
import { Calendar, CalendarDays, Clock } from 'lucide-react';

type TimeFilter = 'week' | 'month' | 'all';

interface FilterToggleProps {
  filter: TimeFilter;
  onFilterChange: (filter: TimeFilter) => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex gap-2">
      <div className="flex w-full justify-between rounded-xl border border-gray-200 bg-gray-100 p-1">
        <button
          onClick={() => onFilterChange('week')}
          className={`rounded-lg cursor-pointer p-2 transition-all duration-200 flex items-center gap-1.5 ${
            filter === 'week'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span className="text-xs font-medium ">This Week</span>
        </button>

        <button
          onClick={() => onFilterChange('month')}
          className={`rounded-lg p-2 cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
            filter === 'month'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <CalendarDays className="h-4 w-4" />
          <span className="text-xs font-medium">This Month</span>
        </button>

        <button
          onClick={() => onFilterChange('all')}
          className={`rounded-lg p-2 cursor-pointer transition-all duration-200 flex items-center gap-1.5 ${
            filter === 'all'
              ? 'bg-white shadow text-blue-600'
              : 'text-gray-500 hover:text-blue-600'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span className="text-xs font-medium">All Time</span>
        </button>
      </div>
    </div>
  );
};

export default FilterToggle;
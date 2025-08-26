import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

function Chart() {
  const { isDark } = useDarkMode();

  // Mock data for the chart
  const data = [
    { day: 'T2', incidents: 5, resolved: 4 },
    { day: 'T3', incidents: 8, resolved: 7 },
    { day: 'T4', incidents: 12, resolved: 10 },
    { day: 'T5', incidents: 6, resolved: 6 },
    { day: 'T6', incidents: 9, resolved: 8 },
    { day: 'T7', incidents: 4, resolved: 4 },
    { day: 'CN', incidents: 3, resolved: 3 },
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.incidents, d.resolved)));

  return (
    <div className="h-64">
      <div className="flex items-end justify-between h-48 px-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 flex-1">
            <div className="flex flex-col items-center space-y-1 h-full justify-end">
              {/* Resolved bar */}
              <div 
                className="w-8 bg-green-500 rounded-t"
                style={{ height: `${(item.resolved / maxValue) * 100}%` }}
              />
              {/* Incidents bar */}
              <div 
                className="w-8 bg-red-500 rounded-t"
                style={{ height: `${(item.incidents / maxValue) * 100}%` }}
              />
            </div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {item.day}
            </span>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sự cố mới</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Đã giải quyết</span>
        </div>
      </div>
    </div>
  );
}

export default Chart;
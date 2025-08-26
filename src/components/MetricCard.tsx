import React from 'react';
import { TrendingUp, TrendingDown, DivideIcon as LucideIcon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  description: string;
}

function MetricCard({ title, value, change, icon: Icon, description }: MetricCardProps) {
  const { isDark } = useDarkMode();
  const isPositive = change > 0;
  const isImprovement = title === 'SLA' ? isPositive : !isPositive;

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <Icon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </div>
        <div className={`flex items-center space-x-1 ${
          isImprovement ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      
      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>
      <p className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'} mb-1`}>
        {title}
      </p>
      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
}

export default MetricCard;
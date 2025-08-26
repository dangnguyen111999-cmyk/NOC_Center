import React from 'react';
import { Brain, AlertTriangle, TrendingUp, Lightbulb } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

function AIInsights() {
  const { isDark } = useDarkMode();

  const insights = [
    {
      type: 'warning',
      title: 'Cảnh báo SLA',
      message: 'Auth Service có nguy cơ vi phạm SLA trong 7 ngày tới.',
      icon: AlertTriangle,
      color: 'text-orange-500'
    },
    {
      type: 'trend',
      title: 'Xu hướng tăng',
      message: 'MTTR tăng 20% so với tháng trước → xem lại runbook Database.',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      type: 'suggestion',
      title: 'Gợi ý cải thiện',
      message: 'Tối ưu monitoring rules để phát hiện sự cố Database nhanh hơn 30%.',
      icon: Lightbulb,
      color: 'text-green-500'
    }
  ];

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${isDark ? 'bg-purple-900/20' : 'bg-purple-100'}`}>
          <Brain className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          AI Insights
        </h3>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 ${insight.color} mt-0.5 flex-shrink-0`} />
                <div>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {insight.title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {insight.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline">
          Xem thêm insights →
        </button>
      </div>
    </div>
  );
}

export default AIInsights;
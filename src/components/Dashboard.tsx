import React from 'react';
import { TrendingUp, TrendingDown, Clock, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import MetricCard from './MetricCard';
import Chart from './Chart';
import AIInsights from './AIInsights';

function Dashboard() {
  const { isDark } = useDarkMode();

  const metrics = [
    {
      title: 'MTTD',
      value: '12 phút',
      change: -15,
      icon: Clock,
      description: 'Thời gian phát hiện trung bình'
    },
    {
      title: 'MTTA',
      value: '8 phút',
      change: -20,
      icon: AlertCircle,
      description: 'Thời gian xác nhận trung bình'
    },
    {
      title: 'MTTR',
      value: '45 phút',
      change: 10,
      icon: CheckCircle,
      description: 'Thời gian khắc phục trung bình'
    },
    {
      title: 'SLA',
      value: '99.8%',
      change: 2,
      icon: Target,
      description: 'Tỷ lệ đáp ứng SLA'
    },
  ];

  const topServices = [
    { name: 'Auth Service', incidents: 12, trend: 'up' },
    { name: 'Payment Gateway', incidents: 8, trend: 'down' },
    { name: 'Database Cluster', incidents: 6, trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Trend Chart */}
         

          {/* Top Services */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Top 3 dịch vụ có nhiều sự cố
            </h3>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-red-500' : index === 1 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`} />
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {service.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {service.incidents} sự cố
                    </span>
                    {service.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Budget */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Error Budget
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Auth Service</span>
                  <span className="text-sm text-red-500">15% còn lại</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Payment Gateway</span>
                  <span className="text-sm text-green-500">68% còn lại</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="space-y-6">
          <AIInsights />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
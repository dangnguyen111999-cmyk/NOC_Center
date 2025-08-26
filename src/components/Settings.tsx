import React, { useState } from 'react';
import { Users, Bell, Settings as SettingsIcon, Zap, Slack, ExternalLink } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

function Settings() {
  const { isDark } = useDarkMode();
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Người dùng', icon: Users },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'integrations', label: 'Tích hợp', icon: Zap },
    { id: 'system', label: 'Hệ thống', icon: SettingsIcon }
  ];

  const users = [
    {
      name: 'Nguyễn Văn A',
      email: 'a.nguyen@company.com',
      role: 'Senior DevOps',
      team: 'Infrastructure',
      status: 'active',
      lastLogin: '2024-01-15 16:30'
    },
    {
      name: 'Trần Thị B',
      email: 'b.tran@company.com',
      role: 'Database Admin',
      team: 'DB Ops',
      status: 'active',
      lastLogin: '2024-01-15 14:20'
    },
    {
      name: 'Lê Văn C',
      email: 'c.le@company.com',
      role: 'Software Engineer',
      team: 'Backend',
      status: 'inactive',
      lastLogin: '2024-01-14 11:45'
    }
  ];

  const integrations = [
    {
      name: 'Slack',
      icon: Slack,
      description: 'Gửi thông báo sự cố và cập nhật',
      status: 'connected',
      lastSync: '2024-01-15 16:45'
    },
    {
      name: 'Jira',
      icon: ExternalLink,
      description: 'Tạo ticket tự động cho sự cố',
      status: 'connected',
      lastSync: '2024-01-15 15:30'
    },
    {
      name: 'ServiceNow',
      icon: ExternalLink,
      description: 'Đồng bộ với ITSM workflow',
      status: 'disconnected',
      lastSync: 'Chưa kết nối'
    }
  ];

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Quản lý Người dùng
        </h3>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Thêm người dùng
        </button>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Người dùng
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Vai trò
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Team
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Trạng thái
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider`}>
                  Đăng nhập cuối
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, index) => (
                <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.role}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.team}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Tích hợp Hệ thống
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Kết nối với các công cụ và dịch vụ khác
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <div key={index} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Icon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {integration.name}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      integration.status === 'connected'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                    }`}>
                      {integration.status === 'connected' ? 'Đã kết nối' : 'Chưa kết nối'}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                {integration.description}
              </p>
              
              <div className="space-y-3">
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Đồng bộ cuối: {integration.lastSync}
                </div>
                <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                  integration.status === 'connected'
                    ? `${isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-600 hover:bg-red-700'} text-white`
                    : `${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`
                }`}>
                  {integration.status === 'connected' ? 'Ngắt kết nối' : 'Kết nối'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Cài đặt Thông báo
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Tùy chỉnh cách thức và thời điểm nhận thông báo
        </p>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm space-y-6`}>
        {/* Email Notifications */}
        <div>
          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Thông báo Email
          </h4>
          <div className="space-y-3">
            {[
              { label: 'Sự cố mới được tạo', enabled: true },
              { label: 'Thay đổi severity', enabled: true },
              { label: 'Sự cố được giải quyết', enabled: false },
              { label: 'Báo cáo hàng tuần', enabled: true }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <div className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  item.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    item.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slack Notifications */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Thông báo Slack
          </h4>
          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Channel mặc định
              </label>
              <input
                type="text"
                defaultValue="#incidents"
                className={`w-full px-3 py-2 border rounded-lg ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
          Cài đặt Hệ thống
        </h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          Cấu hình chung của hệ thống quản lý sự cố
        </p>
      </div>

      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm space-y-6`}>
        {/* Auto Assignment */}
        <div>
          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Tự động phân công
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bật phân công tự động bằng AI
                </span>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  AI sẽ tự động gán sự cố cho team phù hợp
                </p>
              </div>
              <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none">
                <span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5" />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Thời gian SLA mặc định (phút)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>S1 Critical</label>
                  <input
                    type="number"
                    defaultValue="15"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>S2 High</label>
                  <input
                    type="number"
                    defaultValue="60"
                    className={`w-full px-3 py-2 border rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Cài đặt Hệ thống
        </h2>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          Quản lý người dùng, tích hợp và cấu hình hệ thống
        </p>
      </div>

      {/* Tabs */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm`}>
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${isDark ? 'text-blue-400 border-blue-400' : 'text-blue-600 border-blue-600'} border-b-2`
                    : `${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'integrations' && renderIntegrationsTab()}
          {activeTab === 'system' && renderSystemTab()}
        </div>
      </div>
    </div>
  );
}

export default Settings;
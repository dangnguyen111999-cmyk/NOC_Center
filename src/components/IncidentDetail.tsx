import React, { useEffect, useState } from 'react';
import { ArrowLeft, MessageSquare, Play, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SeverityBadge from './SeverityBadge';

interface IncidentDetailProps {
  incidentId: string | null;
  onBack: () => void;
}

interface Reason {
  title: string;
  description: string;
  actions: string;
}

interface IncidentResponse {
  detail: string;
  departure: string;
  reasonList: Reason[];
}

// Fake data luôn có sẵn
const FAKE_DETAIL: IncidentResponse = {
  detail: 'Ứng dụng HR nội bộ không truy cập được (DỮ LIỆU GIẢ)',
  departure: 'Phòng Ứng dụng nội bộ',
  reasonList: [
    {
      title: 'Lỗi kết nối cơ sở dữ liệu',
      description: 'Ứng dụng không thể kết nối tới DB do cấu hình sai hoặc DB dừng.',
      actions: 'Kiểm tra cấu hình và đảm bảo DB đang chạy.'
    },
    {
      title: 'Thiếu dữ liệu đầu vào',
      description: 'Một số trường dữ liệu bắt buộc bị thiếu.',
      actions: 'Đảm bảo các trường cần thiết có trong request.'
    },
    {
      title: 'Lỗi logic trong mã nguồn',
      description: 'Có thể do nhầm điều kiện trong luồng xử lý.',
      actions: 'Debug và viết test case để tái hiện.'
    }
  ]
};

function IncidentDetail({ incidentId, onBack }: IncidentDetailProps) {
  const { isDark } = useDarkMode();
  const [incident, setIncident] = useState<IncidentResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!incidentId) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://khanhnqheroku-a87ce8658e9d.herokuapp.com/api/incidents/detail', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ incidentId: Number(incidentId) }),
        });

        if (!res.ok) {
          // Lỗi -> fallback dữ liệu fake
          setIncident(FAKE_DETAIL);
          return;
        }

        const data: IncidentResponse = await res.json();
        setIncident(data);
      } catch (err) {
        // Mọi lỗi network -> fallback luôn
        setIncident(FAKE_DETAIL);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [incidentId]);

  const severity = 'S1';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <SeverityBadge severity={severity as 'S1' | 'S2' | 'S3'} />
            <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
              Đang xử lý
            </span>
          </div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {incident ? incident.detail : 'Đang tải...'}
          </h2>
        </div>
      </div>

      {loading && <p className="text-blue-500">Đang tải chi tiết sự cố...</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
              Thông tin
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-1`}>
              📌 Phòng phụ trách: <span className="font-medium">{incident?.departure || 'Chưa rõ'}</span>
            </p>
          </div>
        </div>

        {/* Sidebar - Nguyên nhân */}
        <div className="space-y-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Phân tích nguyên nhân AI
            </h3>
            <div className="space-y-4">
              {incident?.reasonList?.map((reason, i) => (
                <div key={i} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                    {reason.title}
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                    {reason.description}
                  </p>
                  <button className="w-full text-left text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center space-x-2 transition-colors">
                    <Play className="w-3 h-3" />
                    <span>{reason.actions}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Hành động nhanh
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <AlertTriangle className="w-4 h-4" />
                <span>Escalate lên L2</span>
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <CheckCircle className="w-4 h-4" />
                <span>Đánh dấu đã giải quyết</span>
              </button>
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Mở Runbook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentDetail;

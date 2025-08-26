import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, Filter, Clock } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SeverityBadge from './SeverityBadge';

interface IncidentsProps {
  onViewIncident: (id: string) => void;
  onCreateNew: () => void;
}

// Kiểu dữ liệu thô từ API (có thể có hoặc không có incidentId)
interface IncidentApiItem {
  incidentId?: number; // có thể có/không
  id?: number;         // đề phòng backend dùng key 'id'
  incidentName: string;
  description: string;
  departmentName: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | string;
  createdAt: string;
}

// Kiểu dữ liệu sau khi chuẩn hoá ở FE (luôn có id)
interface IncidentItemNormalized {
  incidentId: number;
  incidentName: string;
  description: string;
  departmentName: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | string;
  createdAt: string;
}

function Incidents({ onViewIncident, onCreateNew }: IncidentsProps) {
  const { isDark } = useDarkMode();
  const [incidents, setIncidents] = useState<IncidentItemNormalized[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://khanhnqheroku-a87ce8658e9d.herokuapp.com/api/incidents/with-department', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // Nếu muốn filter theo tên sự cố, thay null bằng query (hoặc để null để lấy tất cả)
          body: JSON.stringify({ incidentName: query?.trim() || null }),
        });

        if (!res.ok) throw new Error(`Lỗi tải dữ liệu (${res.status})`);
        const data: IncidentApiItem[] = await res.json();

        // Chuẩn hoá: đảm bảo luôn có incidentId để click sang detail
        const normalized: IncidentItemNormalized[] = data.map((it, idx) => ({
          incidentId: (typeof it.incidentId === 'number' && it.incidentId) || (typeof it.id === 'number' && it.id) || idx, // fallback idx
          incidentName: it.incidentName,
          description: it.description,
          departmentName: it.departmentName,
          status: it.status,
          createdAt: it.createdAt,
        }));

        setIncidents(normalized);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [query]);

  // Optional: filter nhanh trên FE khi người dùng gõ (đã gửi query cho BE ở trên)
  const listToShow = useMemo(() => incidents, [incidents]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Quản lý Sự cố
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            Theo dõi và xử lý các sự cố hệ thống
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Tạo sự cố mới</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm sự cố (theo tên)..."
              className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>

          <button className={`flex items-center space-x-2 px-4 py-2 border rounded-lg ${
            isDark
              ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          } transition-colors`}>
            <Filter className="w-5 h-5" />
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-blue-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Incidents List */}
      <div className="space-y-4">
        {listToShow.map((incident) => (
          <div
            key={incident.incidentId}
            className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-xl p-6 shadow-sm cursor-pointer transition-colors`}
            onClick={() => onViewIncident(String(incident.incidentId))}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  {/* Severity giả định theo status */}
                  <SeverityBadge severity={incident.status === 'OPEN' ? 'S1' : incident.status === 'IN_PROGRESS' ? 'S2' : 'S3'} />
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    incident.status === 'OPEN' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    incident.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {incident.status}
                  </span>
                </div>

                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {incident.incidentName}
                </h3>

                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                  {incident.description}
                </p>

                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                  📌 {incident.departmentName}
                </p>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      Tạo: {new Date(incident.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {!loading && listToShow.length === 0 && (
          <p className="text-gray-500 italic">Chưa có sự cố nào</p>
        )}
      </div>
    </div>
  );
}

export default Incidents;

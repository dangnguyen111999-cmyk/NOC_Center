import React, { useState } from 'react';
import { ArrowLeft, Bot, AlertTriangle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import SeverityBadge from './SeverityBadge';

interface CreateIncidentProps {
  onBack: () => void;
}

const ROOMS = [
  { id: 1, code: 'CORE', name: 'Phòng Ngân hàng lõi', desc: 'Quản lý hệ thống core banking, xử lý giao dịch lõi' },
  { id: 2, code: 'INTG', name: 'Phòng Tích hợp', desc: 'Quản lý tích hợp hệ thống, ESB, API gateway' },
  { id: 3, code: 'APP', name: 'Phòng Ứng dụng nội bộ', desc: 'Phát triển và vận hành ứng dụng nội bộ cho nhân viên' },
  { id: 4, code: 'RETAIL', name: 'Phòng Khách hàng cá nhân', desc: 'Chăm sóc và quản lý dịch vụ khách hàng cá nhân' },
];

function CreateIncident({ onBack }: CreateIncidentProps) {
  const { isDark } = useDarkMode();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedRoomId, setAssignedRoomId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggesting, setSuggesting] = useState(false);

  // Popup state
  const [popupMsg, setPopupMsg] = useState<string | null>(null);

  const [aiSuggestion, setAiSuggestion] = useState({
    severity: 'S2' as const,
    category: 'Database',
    team: 'DB Ops Team',
    confidence: 85,
  });

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  // Gợi ý phòng ban khi blur
  const handleSuggestDepartment = async () => {
    if (!title.trim()) return;
    setSuggesting(true);
    try {
      const res = await fetch('https://khanhnqheroku-a87ce8658e9d.herokuapp.com/api/incidents/suggest-department', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        const deptName = await res.text();
        console.log('Suggested department:', deptName);

        const matchedRoom = ROOMS.find((r) => r.name === deptName);
        if (matchedRoom) {
          setAssignedRoomId(matchedRoom.id);
          setPopupMsg(`Hệ thống gợi ý phòng: ${matchedRoom.name}`);
        } else {
          setPopupMsg(`Không tìm thấy phòng phù hợp cho: "${deptName}"`);
        }
      }
    } catch (err) {
      console.error('Suggest department error:', err);
    } finally {
      setSuggesting(false);
    }
  };

  const handleCreateIncident = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://khanhnqheroku-a87ce8658e9d.herokuapp.com/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title || 'Sự cố không có tiêu đề',
          description: description || 'Chưa có mô tả',
          status: 'OPEN',
          assignedRoomId,
        }),
      });
      if (!res.ok) throw new Error(`Tạo sự cố thất bại (${res.status})`);
      const data = await res.json();
      console.log('Incident created:', data);
      onBack();
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tạo Sự cố Mới</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            AI sẽ tự động phân tích và gợi ý thông tin sự cố
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form chính */}
        <div className="lg:col-span-2">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm space-y-6`}>
            {/* Tiêu đề */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Tiêu đề sự cố
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Database connection timeout"
                className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Mô tả chi tiết
              </label>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                onBlur={handleSuggestDepartment}
                placeholder="Mô tả chi tiết về sự cố..."
                className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {suggesting && <p className="text-sm text-blue-500 mt-1">Đang gợi ý phòng ban...</p>}
            </div>

            {/* Dropdown phòng */}
            <div>
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Phòng được gán
              </label>
              <select
                value={assignedRoomId ?? ''}
                onChange={(e) => setAssignedRoomId(Number(e.target.value))}
                className={`w-full px-4 py-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">-- Chọn phòng --</option>
                {ROOMS.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} ({room.code})
                  </option>
                ))}
              </select>
              {assignedRoomId && (
                <p className="text-xs text-gray-500 mt-1">{ROOMS.find((r) => r.id === assignedRoomId)?.desc}</p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {/* Action */}
            <div className="flex justify-end space-x-4 pt-4">
              <button onClick={onBack} className={`px-6 py-2 border rounded-lg ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>Hủy</button>
              <button
                onClick={handleCreateIncident}
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Đang tạo...' : 'Tạo sự cố'}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar AI */}
        <div className="space-y-6">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Assistant</h3>
            </div>
            <SeverityBadge severity={aiSuggestion.severity} />
          </div>
        </div>
      </div>

      {/* Popup modal */}
      {popupMsg && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl shadow-lg max-w-sm w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <p className="mb-4">{popupMsg}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setPopupMsg(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateIncident;

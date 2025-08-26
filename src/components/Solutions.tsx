import React, { useState } from 'react';
import { Search, Book, Star, Clock, Tag, ExternalLink } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

function Solutions() {
  const { isDark } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả', count: 45 },
    { id: 'database', label: 'Database', count: 12 },
    { id: 'network', label: 'Network', count: 8 },
    { id: 'application', label: 'Application', count: 15 },
    { id: 'infrastructure', label: 'Infrastructure', count: 10 }
  ];

  const solutions = [
    {
      id: 1,
      title: 'Database Connection Pool Exhaustion',
      description: 'Xử lý tình trạng connection pool đầy, không thể tạo kết nối mới',
      category: 'database',
      tags: ['PostgreSQL', 'Connection Pool', 'Performance'],
      rating: 4.8,
      usageCount: 156,
      lastUpdated: '2024-01-10',
      estimatedTime: '5-10 phút',
      steps: [
        'Kiểm tra số lượng connection hiện tại',
        'Restart connection pool',
        'Tăng max_connections nếu cần',
        'Monitor performance sau restart'
      ]
    },
    {
      id: 2,
      title: 'Service Memory Leak Detection',
      description: 'Phát hiện và xử lý memory leak trong các microservices',
      category: 'application',
      tags: ['Memory', 'Java', 'Monitoring'],
      rating: 4.6,
      usageCount: 89,
      lastUpdated: '2024-01-08',
      estimatedTime: '15-20 phút',
      steps: [
        'Sử dụng memory profiler',
        'Identify leak sources',
        'Restart affected service',
        'Deploy hotfix nếu có'
      ]
    },
    {
      id: 3,
      title: 'High CPU Usage Investigation',
      description: 'Điều tra và khắc phục tình trạng CPU usage cao',
      category: 'infrastructure',
      tags: ['CPU', 'Performance', 'Linux'],
      rating: 4.7,
      usageCount: 203,
      lastUpdated: '2024-01-12',
      estimatedTime: '10-15 phút',
      steps: [
        'Kiểm tra top processes',
        'Analyze CPU utilization',
        'Kill resource-heavy processes',
        'Scale resources nếu cần'
      ]
    }
  ];

  const filteredSolutions = solutions.filter(solution => {
    const matchesSearch = solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         solution.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || solution.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Kho Giải pháp & Runbook
        </h2>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          Tri thức khắc phục sự cố và hướng dẫn step-by-step
        </p>
      </div>

      {/* Search and Filters */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm space-y-4`}>
        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm giải pháp, runbook..."
            className={`w-full pl-10 pr-4 py-3 border rounded-lg ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : isDark 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSolutions.map((solution) => (
          <div
            key={solution.id}
            className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-xl p-6 shadow-sm cursor-pointer transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {solution.title}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-3`}>
                  {solution.description}
                </p>
              </div>
              <div className="ml-4">
                <ExternalLink className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {solution.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                    isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>

            {/* Steps Preview */}
            <div className="mb-4">
              <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Các bước thực hiện:
              </h4>
              <ol className="space-y-1">
                {solution.steps.slice(0, 2).map((step, index) => (
                  <li key={index} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex`}>
                    <span className="mr-2">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
                {solution.steps.length > 2 && (
                  <li className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    ... và {solution.steps.length - 2} bước nữa
                  </li>
                )}
              </ol>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {solution.rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Book className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {solution.usageCount} lần sử dụng
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {solution.estimatedTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSolutions.length === 0 && (
        <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <Book className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Không tìm thấy giải pháp phù hợp</p>
          <p className="text-sm mt-2">Thử thay đổi từ khóa tìm kiếm hoặc danh mục</p>
        </div>
      )}
    </div>
  );
}

export default Solutions;
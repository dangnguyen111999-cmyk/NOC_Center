import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Incidents from './components/Incidents';
import CreateIncident from './components/CreateIncident';
import IncidentDetail from './components/IncidentDetail';
import Solutions from './components/Solutions';
import Settings from './components/Settings';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

function AppContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const { isDark, toggleDark } = useDarkMode();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'incidents':
        return <Incidents onViewIncident={(id) => {
          setSelectedIncident(id);
          setActiveView('incident-detail');
        }} onCreateNew={() => setActiveView('create-incident')} />;
      case 'create-incident':
        return <CreateIncident onBack={() => setActiveView('incidents')} />;
      case 'incident-detail':
        return <IncidentDetail incidentId={selectedIncident} onBack={() => setActiveView('incidents')} />;
      case 'solutions':
        return <Solutions />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Hệ thống Quản lý Sự cố Thông minh
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                  Xử lý sự cố nhanh hơn với AI Assistant
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDark}
                  className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:bg-opacity-80 transition-colors`}
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;
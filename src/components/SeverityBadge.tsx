import React from 'react';

interface SeverityBadgeProps {
  severity: 'S1' | 'S2' | 'S3' | 'S4';
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const getSeverityConfig = (sev: string) => {
    switch (sev) {
      case 'S1':
        return { label: '🔴 S1', bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-800 dark:text-red-400' };
      case 'S2':
        return { label: '🟠 S2', bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-800 dark:text-orange-400' };
      case 'S3':
        return { label: '🟡 S3', bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-800 dark:text-yellow-400' };
      case 'S4':
        return { label: '🟢 S4', bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-800 dark:text-green-400' };
      default:
        return { label: severity, bg: 'bg-gray-100 dark:bg-gray-900/20', text: 'text-gray-800 dark:text-gray-400' };
    }
  };

  const config = getSeverityConfig(severity);

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}

export default SeverityBadge;
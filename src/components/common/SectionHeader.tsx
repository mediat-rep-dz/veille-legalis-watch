
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function SectionHeader({ title, description, icon: Icon, iconColor = "text-emerald-600" }: SectionHeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      {description && (
        <h4 className="text-base text-gray-600 max-w-4xl mx-auto">{description}</h4>
      )}
    </div>
  );
}

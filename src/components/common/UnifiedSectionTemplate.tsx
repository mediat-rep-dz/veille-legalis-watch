
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { SmartAutocomplete } from './SmartAutocomplete';

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'destructive';
  onClick: () => void;
}

interface TabData {
  id: string;
  label: string;
  count?: number;
  content: React.ReactNode;
}

interface UnifiedSectionTemplateProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchContext?: 'search' | 'legal' | 'procedure' | 'general';
  onSearch?: (query: string) => void;
  primaryActions?: ActionButton[];
  secondaryActions?: ActionButton[];
  tabs?: TabData[];
  stats?: Array<{ label: string; value: string | number; variant?: 'default' | 'success' | 'warning' }>;
  children?: React.ReactNode;
}

export function UnifiedSectionTemplate({
  title,
  description,
  searchPlaceholder = "Rechercher...",
  searchContext = 'general',
  onSearch,
  primaryActions = [],
  secondaryActions = [],
  tabs = [],
  stats = [],
  children
}: UnifiedSectionTemplateProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="flex gap-2">
            {primaryActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || 'default'}
                className="gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Search and Actions */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <SmartAutocomplete
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder={searchPlaceholder}
                  context={searchContext}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                {secondaryActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.onClick}
                    variant={action.variant || 'outline'}
                    size="default"
                    className="gap-2"
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Section */}
      {tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]?.id} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                {tab.label}
                {tab.count !== undefined && (
                  <Badge variant="secondary" className="ml-1">
                    {tab.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

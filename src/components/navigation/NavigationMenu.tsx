import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { menuItems } from "./menuConfig";

interface NavigationMenuProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
  isMobile?: boolean;
}

export function NavigationMenu({ onSectionChange, activeSection, isMobile = false }: NavigationMenuProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const isMenuActive = (item: any) => {
    if (item.section && activeSection === item.section) {
      return true;
    }
    if (item.submenu) {
      return item.submenu.some((subItem: any) => subItem.section === activeSection);
    }
    return false;
  };

  if (isMobile) {
    return (
      <div className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isActive = isMenuActive(item);

          if (hasSubmenu) {
            return (
              <div key={item.id} className="space-y-1">
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2 text-base font-medium rounded-lg transition-colors",
                  isActive ? "bg-green-50 text-green-700 border border-green-200" : "text-gray-700"
                )}>
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <div className="ml-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Button
                      key={subItem.section}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sm",
                        activeSection === subItem.section && "bg-green-50 text-green-700 font-medium border border-green-200"
                      )}
                      onClick={() => onSectionChange(subItem.section)}
                    >
                      {subItem.label}
                    </Button>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <Button
              key={item.section}
              variant="ghost"
              className={cn(
                "w-full justify-start text-base py-3 rounded-lg transition-colors",
                isActive && "bg-green-50 text-green-700 font-medium border border-green-200"
              )}
              onClick={() => onSectionChange(item.section)}
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center w-full overflow-x-auto">
      <div className="flex items-center space-x-0.5 flex-shrink-0 min-w-max">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isHovered = hoveredMenu === item.id;
          const isActive = isMenuActive(item);

          if (hasSubmenu) {
            return (
              <div 
                key={item.id} 
                className="relative"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 px-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-1 transition-all whitespace-nowrap",
                    isHovered && "bg-gray-100",
                    isActive && "bg-green-50 text-green-700 border-b-2 border-green-500"
                  )}
                >
                  <IconComponent className="w-3 h-3" />
                  <span className="text-xs">{item.label}</span>
                  <ChevronDown className="w-2 h-2 ml-0.5" />
                </Button>
                
                {isHovered && (
                  <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-64 z-50">
                    {item.submenu.map((subItem) => (
                      <button
                        key={subItem.section}
                        className={cn(
                          "w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors",
                          activeSection === subItem.section && "bg-green-50 text-green-700 font-medium border-l-2 border-green-500"
                        )}
                        onClick={() => {
                          onSectionChange(subItem.section);
                          setHoveredMenu(null);
                        }}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Button
              key={item.section}
              variant="ghost"
              className={cn(
                "h-10 px-2 text-xs font-medium hover:bg-gray-100 flex items-center gap-1 transition-all whitespace-nowrap",
                isActive && "bg-green-50 text-green-700 border-b-2 border-green-500"
              )}
              onClick={() => onSectionChange(item.section)}
            >
              <IconComponent className="w-3 h-3" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

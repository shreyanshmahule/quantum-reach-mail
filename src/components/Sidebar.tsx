import { Inbox, Send, FileText, Trash2, Folder, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const sidebarItems = [
  { icon: Inbox, label: "Inbox", count: 12, active: true },
  { icon: Send, label: "Sent", count: 0 },
  { icon: FileText, label: "Drafts", count: 3 },
  { icon: Trash2, label: "Trash", count: 5 },
  { icon: Folder, label: "Archive", count: 0 },
];

export const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside className={cn(
      "fixed left-0 top-12 h-[calc(100vh-3rem)] bg-sidebar border-r border-border transition-all duration-200 z-40",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-left",
              item.active && "bg-primary/10 text-primary",
              collapsed && "justify-center px-2"
            )}
          >
            <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.count > 0 && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
        
        <div className="pt-4 mt-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-left",
              collapsed && "justify-center px-2"
            )}
          >
            <Shield className={cn("h-4 w-4 text-quantum-secure", !collapsed && "mr-3")} />
            {!collapsed && <span>Quantum Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start text-left",
              collapsed && "justify-center px-2"
            )}
          >
            <Settings className={cn("h-4 w-4", !collapsed && "mr-3")} />
            {!collapsed && <span>Settings</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
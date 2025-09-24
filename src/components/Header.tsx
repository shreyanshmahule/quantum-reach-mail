import { Search, Menu, Bell, Settings, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onComposeClick: () => void;
  onMenuClick: () => void;
}

export const Header = ({ onComposeClick, onMenuClick }: HeaderProps) => {
  return (
    <header className="h-12 bg-primary flex items-center justify-between px-4 text-primary-foreground">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="text-primary-foreground hover:bg-primary-foreground/10"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="text-lg font-semibold">QuMail</div>
        
        <Button
          onClick={onComposeClick}
          size="sm"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          New Email
        </Button>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/60" />
          <Input
            placeholder="Search emails..."
            className="pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 px-3 py-1 bg-primary-foreground/10 rounded-full">
          <Shield className="h-4 w-4 text-quantum-secure" />
          <span className="text-xs">Quantum Secure</span>
        </div>
        
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
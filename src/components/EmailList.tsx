import { Shield, ShieldCheck, ShieldAlert, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Email } from "./EmailLayout";

interface EmailListProps {
  emails: Email[];
  selectedEmail: Email | null;
  onEmailSelect: (email: Email) => void;
}

const SecurityIcon = ({ level }: { level: Email["securityLevel"] }) => {
  switch (level) {
    case "quantum":
      return <ShieldCheck className="h-4 w-4 text-quantum-secure" />;
    case "aes":
      return <ShieldAlert className="h-4 w-4 text-quantum-aes" />;
    default:
      return <Shield className="h-4 w-4 text-quantum-none" />;
  }
};

const SecurityBadge = ({ level }: { level: Email["securityLevel"] }) => {
  const badges = {
    quantum: { text: "Quantum", className: "security-quantum" },
    aes: { text: "AES", className: "security-aes" },
    none: { text: "None", className: "security-none" },
  };

  const badge = badges[level];
  
  return (
    <span className={cn("px-2 py-0.5 text-xs rounded-full font-medium", badge.className)}>
      {badge.text}
    </span>
  );
};

export const EmailList = ({ emails, selectedEmail, onEmailSelect }: EmailListProps) => {
  return (
    <div className="flex-1 border-r border-border">
      {/* Email List Header */}
      <div className="h-12 bg-secondary flex items-center justify-between px-4 border-b border-border">
        <h2 className="font-semibold text-secondary-foreground">Inbox</h2>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last sync: 2 min ago</span>
        </div>
      </div>

      {/* Email List */}
      <div className="overflow-y-auto h-[calc(100vh-6rem)]">
        {emails.map((email) => (
          <div
            key={email.id}
            onClick={() => onEmailSelect(email)}
            className={cn(
              "border-b border-border p-4 cursor-pointer email-hover",
              selectedEmail?.id === email.id && "email-selected",
              !email.isRead && "bg-primary/5"
            )}
          >
            <div className="flex items-start space-x-3">
              <Checkbox className="mt-1" />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "font-medium truncate",
                      email.isRead ? "text-email-read" : "text-email-unread"
                    )}>
                      {email.from}
                    </span>
                    <SecurityIcon level={email.securityLevel} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <SecurityBadge level={email.securityLevel} />
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {email.date}
                    </span>
                  </div>
                </div>
                
                <div className={cn(
                  "text-sm mb-1 truncate",
                  email.isRead ? "text-email-read" : "text-email-unread font-medium"
                )}>
                  {email.subject}
                </div>
                
                <div className="text-sm text-muted-foreground truncate">
                  {email.preview}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
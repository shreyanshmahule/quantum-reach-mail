import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { EmailList } from "./EmailList";
import { EmailReader } from "./EmailReader";
import { ComposeEmail } from "./ComposeEmail";
import { Header } from "./Header";

export interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  isRead: boolean;
  securityLevel: "quantum" | "aes" | "none";
  body: string;
  isEncrypted?: boolean;
}

export const EmailLayout = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock email data
  const mockEmails: Email[] = [
    {
      id: "1",
      from: "security@quantumtech.com",
      subject: "Your Quantum Key Has Been Generated",
      preview: "Your new quantum encryption key is ready for secure communications...",
      date: "2 min ago",
      isRead: false,
      securityLevel: "quantum",
      body: "Your new quantum encryption key has been successfully generated and is now active for all secure communications. This key uses quantum entanglement protocols to ensure maximum security.",
    },
    {
      id: "2", 
      from: "team@company.com",
      subject: "Weekly Security Report",
      preview: "This week's security analysis shows improved encryption metrics...",
      date: "1 hour ago",
      isRead: false,
      securityLevel: "aes",
      body: "This week's security analysis shows improved encryption metrics across all departments. AES encryption is performing well with 99.9% success rate.",
    },
    {
      id: "3",
      from: "newsletter@techblog.com", 
      subject: "Latest in Quantum Computing",
      preview: "Discover the newest breakthroughs in quantum computing technology...",
      date: "3 hours ago",
      isRead: true,
      securityLevel: "none",
      body: "Discover the newest breakthroughs in quantum computing technology. This month's highlights include advances in quantum error correction and new quantum algorithms.",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header 
        onComposeClick={() => setShowCompose(true)}
        onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className={`flex flex-1 transition-all duration-200 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
          <EmailList 
            emails={mockEmails}
            selectedEmail={selectedEmail}
            onEmailSelect={setSelectedEmail}
          />
          
          {selectedEmail && (
            <EmailReader 
              email={selectedEmail}
              onClose={() => setSelectedEmail(null)}
            />
          )}
        </div>
      </div>

      {showCompose && (
        <ComposeEmail onClose={() => setShowCompose(false)} />
      )}
    </div>
  );
};
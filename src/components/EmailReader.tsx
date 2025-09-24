import { useState } from "react";
import { Reply, ReplyAll, Forward, Trash2, Eye, EyeOff, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Email } from "./EmailLayout";

interface EmailReaderProps {
  email: Email;
  onClose: () => void;
}

export const EmailReader = ({ email }: EmailReaderProps) => {
  const [showCiphertext, setShowCiphertext] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecryptToggle = () => {
    if (email.securityLevel === "quantum" && !showCiphertext) {
      setIsDecrypting(true);
      setTimeout(() => {
        setIsDecrypting(false);
        setShowCiphertext(!showCiphertext);
      }, 2000);
    } else {
      setShowCiphertext(!showCiphertext);
    }
  };

  const ciphertext = "∧ΨØ∫∆≈√π∑∞℮⌘⟨⟩▲▼◆◇⬢⬣⭐⭘⬟⬠⬡⬢⬣⬤⬥⬦⬧⬨⬩⬪⬫⬬⬭⬮⬯⬰⬱⬲⬳⬴⬵⬶⬷⬸⬹⬺⬻⬼⬽⬾⬿⭀⭁⭂⭃⭄";

  const getSecurityColor = (level: Email["securityLevel"]) => {
    switch (level) {
      case "quantum": return "text-quantum-secure";
      case "aes": return "text-quantum-aes";
      default: return "text-quantum-none";
    }
  };

  const getSecurityText = (level: Email["securityLevel"]) => {
    switch (level) {
      case "quantum": return "Quantum Secure (OTP)";
      case "aes": return "AES Encryption";
      default: return "No Encryption";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-card">
      {/* Email Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-card-foreground">{email.subject}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Reply className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="outline" size="sm">
              <ReplyAll className="h-4 w-4 mr-2" />
              Reply All
            </Button>
            <Button variant="outline" size="sm">
              <Forward className="h-4 w-4 mr-2" />
              Forward
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-card-foreground mb-1">{email.from}</div>
            <div className="text-sm text-muted-foreground">{email.date}</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={cn("flex items-center space-x-2", getSecurityColor(email.securityLevel))}>
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">{getSecurityText(email.securityLevel)}</span>
            </div>
            
            {email.securityLevel !== "none" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecryptToggle}
                disabled={isDecrypting}
                className="text-xs"
              >
                {isDecrypting ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                    Fetching Quantum Key...
                  </>
                ) : showCiphertext ? (
                  <>
                    <Eye className="h-3 w-3 mr-2" />
                    Show Plaintext
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 mr-2" />
                    Show Ciphertext
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quantum Key Fetching Animation */}
      {isDecrypting && (
        <div className="p-6 border-b border-border bg-quantum-secure/5">
          <div className="flex items-center space-x-3">
            <div className="quantum-spin">
              <Shield className="h-6 w-6 text-quantum-secure" />
            </div>
            <div>
              <div className="font-medium text-quantum-secure">Fetching Quantum Key</div>
              <div className="text-sm text-muted-foreground">Establishing secure quantum channel...</div>
            </div>
          </div>
        </div>
      )}

      {/* Email Body */}
      <div className="flex-1 p-6 overflow-y-auto">
        {showCiphertext ? (
          <div className="bg-muted p-4 rounded border font-mono text-sm">
            <div className="text-muted-foreground mb-2">Encrypted Content:</div>
            <div className="break-all text-quantum-secure">{ciphertext}</div>
          </div>
        ) : (
          <div className="prose max-w-none">
            <p className="text-card-foreground leading-relaxed">
              {email.body}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
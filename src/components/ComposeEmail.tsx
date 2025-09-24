import { useState } from "react";
import { X, Send, Shield, Key, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComposeEmailProps {
  onClose: () => void;
}

export const ComposeEmail = ({ onClose }: ComposeEmailProps) => {
  const [securityMode, setSecurityMode] = useState<"normal" | "aes" | "quantum">("quantum");
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (securityMode === "quantum") {
      setIsGeneratingKey(true);
      setTimeout(() => {
        setIsGeneratingKey(false);
        onClose();
      }, 3000);
    } else {
      onClose();
    }
  };

  const getSecurityInfo = () => {
    switch (securityMode) {
      case "quantum":
        return {
          title: "Quantum Secure Mode",
          description: "Uses quantum entanglement for unbreakable encryption",
          color: "text-quantum-secure",
          bgColor: "bg-quantum-secure/10",
        };
      case "aes":
        return {
          title: "AES Encryption",
          description: "Standard 256-bit AES encryption",
          color: "text-quantum-aes",
          bgColor: "bg-quantum-aes/10",
        };
      default:
        return {
          title: "Normal Mode",
          description: "No encryption - not recommended for sensitive data",
          color: "text-quantum-none",
          bgColor: "bg-quantum-none/10",
        };
    }
  };

  const securityInfo = getSecurityInfo();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Compose Email</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Security Mode Selector */}
          <div className={cn("p-4 rounded-lg border", securityInfo.bgColor)}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Shield className={cn("h-5 w-5", securityInfo.color)} />
                <span className={cn("font-medium", securityInfo.color)}>
                  {securityInfo.title}
                </span>
              </div>
              <Select value={securityMode} onValueChange={(value: any) => setSecurityMode(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quantum">Quantum Secure (OTP)</SelectItem>
                  <SelectItem value="aes">Quantum-Aided AES</SelectItem>
                  <SelectItem value="normal">Normal (No Encryption)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">{securityInfo.description}</p>
          </div>

          {/* Quantum Key Generation Progress */}
          {isGeneratingKey && (
            <div className="bg-quantum-secure/5 border border-quantum-secure/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="quantum-spin">
                  <Key className="h-5 w-5 text-quantum-secure" />
                </div>
                <div>
                  <div className="font-medium text-quantum-secure">Generating Quantum Key</div>
                  <div className="text-sm text-muted-foreground">Establishing quantum entanglement...</div>
                </div>
              </div>
              <div className="mt-3 bg-quantum-secure/10 rounded-full h-2">
                <div className="bg-quantum-secure h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
            </div>
          )}

          {/* Email Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">To:</label>
              <Input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Subject:</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject..."
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Message:</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Type your message..."
                className="w-full h-40 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={isGeneratingKey || !to || !subject}
              className="bg-primary hover:bg-primary/90"
            >
              {isGeneratingKey ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Securing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send {securityMode === "quantum" ? "Securely" : ""}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
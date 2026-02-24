import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Shield,
  MessageCircle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Send,
  MapPin,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface ActiveRentalScreenProps {
  onBack: () => void;
  onConfirmReturn: () => void;
  onOpenChat?: () => void;
  isOwner?: boolean;
}

const quickReplies = [
  "On the way po! 🏃",
  "Nandito na po ako 📍",
  "Salamat po! 🙏",
  "Sandali lang po",
  "Ok po, ingat!",
];

export function ActiveRentalScreen({
  onBack,
  onConfirmReturn,
  onOpenChat,
  isOwner = false,
}: ActiveRentalScreenProps) {
  const [showMiniChat, setShowMiniChat] = useState(false);
  const [miniChatInput, setMiniChatInput] = useState("");
  const [miniMessages, setMiniMessages] = useState([
    { sender: "other", text: "Kumusta! Kelan po ibabalik?" },
  ]);

  const sendMiniMessage = (text: string) => {
    if (!text.trim()) return;
    setMiniMessages((prev) => [...prev, { sender: "me", text }]);
    setMiniChatInput("");
    // Simulate reply
    setTimeout(() => {
      setMiniMessages((prev) => [...prev, { sender: "other", text: "Ok po, salamat!" }]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h3>Active Rental</h3>
          <p className="text-muted-foreground">In Progress</p>
        </div>
        <Badge className="bg-accent text-white border-0">Active</Badge>
      </div>

      {/* Return countdown */}
      <div className="bg-primary/5 border-b border-primary/10 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-primary">Return by: Oct 29, 6:00 PM</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-primary">8h left</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Item Info */}
        <Card className="p-4 mb-5 rounded-2xl border-border">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Power Drill Set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Power Drill Set</h4>
              <p className="text-primary mb-2">₱250/day</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Oct 28 – Oct 29, 2025</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
            <div className="flex items-center gap-2 text-accent">
              <Shield className="w-4 h-4" />
              <p>₱1,000 deposit held securely by réntahán</p>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-4 mb-5 rounded-2xl border-border">
          <h4 className="mb-3">{isOwner ? "Renter" : "Owner"}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={isOwner ? "bg-accent text-white" : "bg-primary text-white"}>
                  {isOwner ? "MR" : "JD"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4>{isOwner ? "Maria Reyes" : "Juan Dela Cruz"}</h4>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>4.9 ⭐</span>
                  <span>·</span>
                  <Badge variant="outline" className="border-accent text-accent px-1.5 py-0">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowMiniChat(!showMiniChat)}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
            </button>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-4 mb-5 rounded-2xl border-border">
          <h4 className="mb-4">Rental Timeline</h4>
          <div className="space-y-4">
            {[
              { label: "Booking Confirmed", time: "Oct 27, 3:45 PM", done: true },
              { label: "Item Picked Up", time: "Oct 28, 9:00 AM", done: true },
              { label: "Return Scheduled", time: "Oct 29, 6:00 PM", done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.done ? "bg-primary" : "bg-secondary border-2 border-primary"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  {i < 2 && (
                    <div
                      className={`w-0.5 flex-1 mt-1 mb-1 min-h-8 ${
                        step.done ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <h4 className="mb-1">{step.label}</h4>
                  <p className="text-muted-foreground">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reminder */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <p className="text-foreground/80">
            <span className="text-primary">Reminder:</span>{" "}
            {isOwner
              ? "Once the item is returned safely, confirm the return to release the deposit back to the renter."
              : "Please return the item in the same condition. Your ₱1,000 deposit will be refunded within 1 hour after return is confirmed."}
          </p>
        </div>
      </div>

      {/* Mini Chat bar */}
      {showMiniChat && (
        <div className="fixed bottom-[72px] left-0 right-0 z-40">
          <div className="max-w-md mx-auto bg-white border-t border-border shadow-lg rounded-t-2xl">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-primary">Quick Chat</span>
              </div>
              <div className="flex items-center gap-2">
                {onOpenChat && (
                  <button
                    onClick={onOpenChat}
                    className="text-accent"
                  >
                    Open Full Chat
                  </button>
                )}
                <button onClick={() => setShowMiniChat(false)}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Mini messages */}
            <div className="px-4 py-2 max-h-32 overflow-y-auto space-y-2">
              {miniMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`px-3 py-1.5 rounded-xl max-w-[75%] ${
                      msg.sender === "me"
                        ? "bg-primary text-white"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => sendMiniMessage(reply)}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs whitespace-nowrap flex-shrink-0"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-2 border-t border-border">
              <input
                value={miniChatInput}
                onChange={(e) => setMiniChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMiniMessage(miniChatInput);
                }}
                placeholder="Type a message..."
                className="flex-1 bg-secondary rounded-xl px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={() => sendMiniMessage(miniChatInput)}
                disabled={!miniChatInput.trim()}
                className="w-9 h-9 bg-primary rounded-full flex items-center justify-center disabled:opacity-40"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => setShowMiniChat(!showMiniChat)}
            className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center hover:bg-primary/20 flex-shrink-0"
          >
            <MessageCircle className="w-5 h-5 text-primary" />
          </button>
          <Button
            onClick={onConfirmReturn}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {isOwner ? "Confirm Item Returned" : "I'm Returning the Item"}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  ArrowLeft,
  Send,
  MapPin,
  Camera,
  ChevronDown,
  Clock,
  Shield,
  AlertTriangle,
  MoreVertical,
  Phone,
  ImageIcon,
  MessageCircle,
  X,
  CheckCheck,
  Info,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ChatDetailScreenProps {
  chatId?: string;
  isActive?: boolean;
  isCancelled?: boolean;
  onBack: () => void;
}

const quickReplies = [
  "On the way po! 🏃",
  "Nandito na po ako 📍",
  "Sandali lang po",
  "Salamat po! 🙏",
  "Ok po, ingat!",
  "Malapit na po",
  "Nasa 7/11 po malapit",
  "Sa McDo tayo magkita?",
  "Nasa terminal po ako",
  "30 mins pa po",
];

const locationTemplates = [
  "Nasa 7/11 po ako sa Katipunan",
  "Sa McDo Quezon Ave",
  "Nasa MRT Cubao station",
  "Sa Jollibee Kamuning",
  "Nasa SM North EDSA",
];

type Message = {
  id: string;
  sender: "me" | "other";
  text: string;
  time: string;
  type: "text" | "location" | "image" | "system";
  read?: boolean;
};

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "other",
    text: "Kumusta! Naka-confirm na yung booking mo para sa Power Drill Set 🔧",
    time: "10:30 AM",
    type: "text",
    read: true,
  },
  {
    id: "2",
    sender: "me",
    text: "Salamat po! Kailan po pwedeng mag-pick up?",
    time: "10:31 AM",
    type: "text",
    read: true,
  },
  {
    id: "3",
    sender: "other",
    text: "Bukas po, anytime from 8 AM to 5 PM. Nandito lang po kami sa bahay.",
    time: "10:32 AM",
    type: "text",
    read: true,
  },
  {
    id: "4",
    sender: "other",
    text: "📍 Location",
    time: "10:32 AM",
    type: "location",
    read: true,
  },
  {
    id: "5",
    sender: "me",
    text: "Ok po! Mag-go na po ako around 9 AM bukas. Thank you!",
    time: "10:35 AM",
    type: "text",
    read: true,
  },
  {
    id: "6",
    sender: "other",
    text: "Sige po! Ingat sa pagdating. Kailangan po ibalik bago mag 6 PM ng Oct 29.",
    time: "10:36 AM",
    type: "text",
    read: true,
  },
  {
    id: "7",
    sender: "me",
    text: "On the way po! 🏃",
    time: "9:15 AM",
    type: "text",
    read: false,
  },
  {
    id: "sys-1",
    sender: "other",
    text: "🔔 Return reminder: Item must be back by Oct 29, 6:00 PM (2 hours left)",
    time: "4:00 PM",
    type: "system",
    read: false,
  },
];

export function ChatDetailScreen({
  chatId,
  isActive = true,
  isCancelled = false,
  onBack,
}: ChatDetailScreenProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showLocationTemplates, setShowLocationTemplates] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || isCancelled) return;

    // Block phone numbers, links, payment info
    const blocked =
      /(\d{4}[\s-]?\d{3}[\s-]?\d{4})|((https?:\/\/)|www\.)|(\bgcash\b|\bmaya\b|\bbpi\b.*account)/i.test(
        text
      );
    if (blocked) {
      toast.error("Sharing personal numbers, links, or payment details is not allowed for your safety.");
      return;
    }

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      text,
      time: new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setShowTemplates(false);
    setShowLocationTemplates(false);
  };

  const sendLocation = (locationText: string) => {
    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "me",
      text: `📍 ${locationText}`,
      time: new Date().toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" }),
      type: "location",
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setShowLocationTemplates(false);
    toast.success("Location shared!");
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-4 pt-12 pb-3 flex items-center gap-3 relative">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-white">MR</AvatarFallback>
          </Avatar>
          {isActive && !isCancelled && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="truncate">Maria Reyes</h4>
          <div className="flex items-center gap-1.5">
            <p className="text-primary truncate">Power Drill Set</p>
            {isCancelled ? (
              <Badge className="bg-destructive/10 text-destructive border-0 text-[10px]">Cancelled</Badge>
            ) : isActive ? (
              <Badge className="bg-primary/10 text-primary border-0 text-[10px]">Active</Badge>
            ) : (
              <Badge className="bg-muted text-muted-foreground border-0 text-[10px]">Completed</Badge>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {/* Dropdown menu */}
        {showMenu && (
          <div className="absolute top-full right-4 mt-1 bg-white border border-border rounded-xl shadow-lg z-50 w-52">
            <button
              onClick={() => {
                setShowMenu(false);
                toast.info("View Rental Details");
              }}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-secondary rounded-t-xl"
            >
              <Info className="w-4 h-4 text-muted-foreground" />
              <span>View Rental Details</span>
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                toast.info("Phone numbers are hidden for your safety.");
              }}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-secondary"
            >
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>Contact Info</span>
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                setShowReportModal(true);
              }}
              className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-secondary rounded-b-xl text-destructive"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report User</span>
            </button>
          </div>
        )}
      </div>

      {/* Active rental info bar */}
      {isActive && !isCancelled && (
        <div className="bg-primary/5 border-b border-primary/10 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-primary">Return by: Oct 29, 6:00 PM</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary">2h left</span>
          </div>
        </div>
      )}

      {/* Cancelled banner */}
      {isCancelled && (
        <div className="bg-destructive/10 px-4 py-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
          <p className="text-destructive">
            This rental was cancelled. Chat is now read-only.
          </p>
        </div>
      )}

      {/* Safety notice */}
      <Card className="mx-4 mt-3 p-3 bg-accent/5 border border-accent/15 rounded-xl">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-accent">
            For your safety, réntahán hides personal contact info. Never share phone numbers or pay outside the app.
          </p>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => {
          if (msg.type === "system") {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-full max-w-xs text-center">
                  {msg.text}
                </div>
              </div>
            );
          }

          const isMe = msg.sender === "me";
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              {!isMe && (
                <Avatar className="w-8 h-8 mr-2 flex-shrink-0 self-end">
                  <AvatarFallback className="bg-primary text-white text-xs">MR</AvatarFallback>
                </Avatar>
              )}
              <div className={`max-w-[75%] ${isMe ? "items-end" : "items-start"} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl ${
                    msg.type === "location"
                      ? isMe
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white border border-border text-foreground rounded-bl-sm"
                      : isMe
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white border border-border text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.type === "location" ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{msg.text.replace("📍 ", "")}</span>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.text}</p>
                  )}
                </div>
                <div className={`flex items-center gap-1 ${isMe ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {isMe && (
                    <CheckCheck className={`w-3 h-3 ${msg.read ? "text-accent" : "text-muted-foreground"}`} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies sheet */}
      {showTemplates && !isCancelled && (
        <div className="border-t border-border bg-white px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Quick Replies</span>
            <button onClick={() => setShowTemplates(false)}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location templates sheet */}
      {showLocationTemplates && !isCancelled && (
        <div className="border-t border-border bg-white px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Send Location</span>
            <button onClick={() => setShowLocationTemplates(false)}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="space-y-2">
            {locationTemplates.map((loc) => (
              <button
                key={loc}
                onClick={() => sendLocation(loc)}
                className="w-full text-left px-3 py-2 bg-secondary rounded-xl hover:bg-secondary/80 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">{loc}</span>
              </button>
            ))}
            <button
              onClick={() => {
                sendLocation("Aking lokasyon (Current location)");
              }}
              className="w-full text-left px-3 py-2 bg-primary/10 rounded-xl hover:bg-primary/20 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm text-primary">Share current location</span>
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className={`border-t border-border bg-white px-4 py-3 ${isCancelled ? "opacity-60 pointer-events-none" : ""}`}>
        {isCancelled && (
          <p className="text-center text-muted-foreground mb-2">
            Chat disabled for cancelled rentals
          </p>
        )}
        <div className="flex items-end gap-2">
          {/* Action buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => {
                setShowLocationTemplates(!showLocationTemplates);
                setShowTemplates(false);
              }}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 flex-shrink-0"
            >
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => toast.info("Camera / photo sharing coming soon!")}
              className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 flex-shrink-0"
            >
              <Camera className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Text input */}
          <div className="flex-1 flex items-end gap-2 bg-secondary rounded-2xl px-3 py-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputText);
                }
              }}
              placeholder={isCancelled ? "Chat disabled" : "Type a message..."}
              disabled={isCancelled}
              rows={1}
              className="flex-1 bg-transparent resize-none outline-none text-sm max-h-24 overflow-auto"
            />
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
            >
              <ChevronDown className="w-3 h-3 text-primary" />
            </button>
          </div>

          {/* Send button */}
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isCancelled}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:bg-primary/90 transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl p-6">
            <h3 className="mb-1">Report User</h3>
            <p className="text-muted-foreground mb-5">
              Please select a reason for reporting this user. Réntahán takes safety seriously.
            </p>
            <div className="space-y-2 mb-5">
              {[
                "Shared personal contact info",
                "Asked to pay outside the app",
                "Inappropriate behavior",
                "Spam messages",
                "Suspicious activity",
                "Other",
              ].map((reason) => (
                <button
                  key={reason}
                  onClick={() => {
                    setShowReportModal(false);
                    toast.success("Report submitted. Our team will review within 24 hours.");
                  }}
                  className="w-full text-left px-4 py-3 bg-secondary rounded-xl hover:bg-secondary/80 flex items-center gap-3"
                >
                  <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span>{reason}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={() => setShowReportModal(false)}
              variant="outline"
              className="w-full rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

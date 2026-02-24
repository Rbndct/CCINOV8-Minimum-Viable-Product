import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Search, MessageCircle, Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { BottomNav, type Tab } from "./BottomNav";

interface ChatListScreenProps {
  onBack: () => void;
  onChatClick: (chatId: string) => void;
  onTabPress: (tab: Tab) => void;
}

const chats = [
  {
    id: "chat-1",
    rentalId: "rental-1",
    otherParty: { name: "Maria Reyes", initials: "MR", role: "Owner" },
    item: "Power Drill Set",
    lastMessage: "Salamat! Makukuha mo mamaya pagdating mo. 😊",
    time: "2 mins ago",
    unread: 2,
    status: "active",
    returnTime: "Oct 29, 6:00 PM",
    isRenter: true,
  },
  {
    id: "chat-2",
    rentalId: "rental-2",
    otherParty: { name: "Carlo Santos", initials: "CS", role: "Renter" },
    item: "Extension Ladder",
    lastMessage: "On the way na po ako.",
    time: "1 hr ago",
    unread: 0,
    status: "active",
    returnTime: "Oct 30, 10:00 AM",
    isRenter: false,
  },
  {
    id: "chat-3",
    rentalId: "rental-3",
    otherParty: { name: "Ana Lim", initials: "AL", role: "Owner" },
    item: "Photography Studio (3 hrs)",
    lastMessage: "Nandito na po kami sa lobby.",
    time: "Yesterday",
    unread: 0,
    status: "completed",
    returnTime: null,
    isRenter: true,
  },
  {
    id: "chat-4",
    rentalId: "rental-4",
    otherParty: { name: "Rodel Cruz", initials: "RC", role: "Owner" },
    item: "Sound System",
    lastMessage: "Booking declined dahil walang available slot.",
    time: "2 days ago",
    unread: 0,
    status: "cancelled",
    returnTime: null,
    isRenter: true,
  },
  {
    id: "chat-5",
    rentalId: "rental-5",
    otherParty: { name: "Jenny Bautista", initials: "JB", role: "Renter" },
    item: "Modern Function Hall",
    lastMessage: "Magkano po ang deposit?",
    time: "3 days ago",
    unread: 1,
    status: "inquiry",
    returnTime: null,
    isRenter: false,
  },
];

const statusConfig = {
  active: { label: "Active", color: "bg-primary text-white" },
  completed: { label: "Completed", color: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive" },
  inquiry: { label: "Inquiry", color: "bg-accent/10 text-accent" },
};

export function ChatListScreen({ onBack, onChatClick, onTabPress }: ChatListScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = chats.filter(
    (c) =>
      c.otherParty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadTotal = chats.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Messages</h2>
            {unreadTotal > 0 && (
              <p className="text-white/80">{unreadTotal} unread message{unreadTotal > 1 ? "s" : ""}</p>
            )}
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="h-11 pl-12 bg-white rounded-xl border-0"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-3 bg-white border-b border-border flex items-center gap-2 overflow-x-auto">
        {["All", "Active", "Completed", "Inquiries"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-1.5 rounded-full text-sm border border-border whitespace-nowrap first:bg-primary first:text-white first:border-primary"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageCircle className="w-16 h-16 text-muted-foreground/40 mb-4" />
            <h3 className="mb-2 text-muted-foreground">No conversations yet</h3>
            <p className="text-muted-foreground">
              Messages will appear here once you book or get inquiries
            </p>
          </div>
        ) : (
          filtered.map((chat) => {
            const status = statusConfig[chat.status as keyof typeof statusConfig];
            const isCancelled = chat.status === "cancelled";
            return (
              <Card
                key={chat.id}
                onClick={() => onChatClick(chat.id)}
                className={`p-4 rounded-2xl border-border cursor-pointer transition-all ${
                  isCancelled ? "opacity-60" : "hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback
                        className={chat.isRenter ? "bg-primary text-white" : "bg-accent text-white"}
                      >
                        {chat.otherParty.initials}
                      </AvatarFallback>
                    </Avatar>
                    {chat.status === "active" && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{chat.otherParty.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.otherParty.role}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</span>
                    </div>

                    <p className="text-xs text-primary mb-1 truncate">{chat.item}</p>

                    <div className="flex items-center justify-between">
                      <p
                        className={`text-sm truncate max-w-[180px] ${
                          isCancelled ? "text-muted-foreground line-through" : "text-muted-foreground"
                        }`}
                      >
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center gap-2">
                        {chat.unread > 0 && (
                          <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            {chat.unread}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>

                    {chat.returnTime && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary">Return by {chat.returnTime}</span>
                      </div>
                    )}

                    <Badge
                      className={`mt-2 text-[10px] px-2 py-0.5 ${status.color} border-0`}
                    >
                      {status.label}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <BottomNav activeTab="home" onTabPress={onTabPress} />
    </div>
  );
}

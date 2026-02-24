import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Shield,
  Star,
  LogOut,
  Package,
  Home,
  User,
  ChevronRight,
  MapPin,
  Calendar,
  MessageSquare,
  Wallet,
  Settings,
  HelpCircle,
  Bell,
} from "lucide-react";
import { BottomNav, type Tab } from "./BottomNav";

interface ProfileScreenProps {
  onNavigateToListings: () => void;
  onNavigateToRentals: () => void;
  onNavigateToReviews: () => void;
  onNavigateToWallet?: () => void;
  onNavigateToChat?: () => void;
  onTabPress: (tab: Tab) => void;
  onLogout: () => void;
}

export function ProfileScreen({
  onNavigateToListings,
  onNavigateToRentals,
  onNavigateToReviews,
  onNavigateToWallet,
  onNavigateToChat,
  onTabPress,
  onLogout,
}: ProfileScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-8 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div />
          <button className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="flex items-center justify-center flex-col">
          <Avatar className="w-24 h-24 mb-3 border-4 border-white/30">
            <AvatarFallback className="bg-white text-primary">JD</AvatarFallback>
          </Avatar>
          <h2 className="text-white mb-1">Juan Dela Cruz</h2>
          <p className="text-white/80 mb-3">Member since Oct 2024</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-white text-white bg-white/10">
              <Shield className="w-3 h-3 mr-1" />
              Verified User
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Trust Score */}
        <Card className="p-5 mb-4 rounded-2xl border-border">
          <h4 className="mb-4">Trust Score</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-primary">4.9</span>
              </div>
              <p className="text-muted-foreground">Rating</p>
            </div>
            <div>
              <p className="text-primary mb-1">15</p>
              <p className="text-muted-foreground">Rentals</p>
            </div>
            <div>
              <p className="text-primary mb-1">8</p>
              <p className="text-muted-foreground">Listings</p>
            </div>
          </div>
        </Card>

        {/* Verification Status */}
        <Card className="p-5 mb-4 rounded-2xl border-border">
          <h4 className="mb-4">Verification Status</h4>
          <div className="space-y-3">
            {[
              { icon: Shield, label: "Identity Verified", sub: "Government ID confirmed" },
              { icon: MapPin, label: "Location Verified", sub: "Address confirmed" },
              { icon: Calendar, label: "Active Member", sub: "3 months on réntahán" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p>{label}</p>
                    <p className="text-muted-foreground">{sub}</p>
                  </div>
                </div>
                <Badge className="bg-primary text-white border-0">✓</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3 mb-4">
          {[
            {
              icon: Package,
              label: "My Listings",
              sub: "Items I rent out",
              color: "bg-primary/10",
              iconColor: "text-primary",
              action: onNavigateToListings,
            },
            {
              icon: Home,
              label: "My Rentals",
              sub: "Items I've rented",
              color: "bg-accent/10",
              iconColor: "text-accent",
              action: onNavigateToRentals,
            },
            {
              icon: MessageSquare,
              label: "My Reviews",
              sub: "Feedback from others",
              color: "bg-accent/10",
              iconColor: "text-accent",
              action: onNavigateToReviews,
            },
            ...(onNavigateToWallet
              ? [
                  {
                    icon: Wallet,
                    label: "My Wallet",
                    sub: "Manage your finances",
                    color: "bg-accent/10",
                    iconColor: "text-accent",
                    action: onNavigateToWallet,
                  },
                ]
              : []),
            ...(onNavigateToChat
              ? [
                  {
                    icon: MessageSquare,
                    label: "Messages",
                    sub: "Chat with owners & renters",
                    color: "bg-primary/10",
                    iconColor: "text-primary",
                    action: onNavigateToChat,
                  },
                ]
              : []),
          ].map(({ icon: Icon, label, sub, color, iconColor, action }) => (
            <Card
              key={label}
              onClick={action}
              className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h4>{label}</h4>
                    <p className="text-muted-foreground">{sub}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>

        {/* Help & Support */}
        <div className="space-y-3 mb-6">
          <Card className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Bell className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h4>Notifications</h4>
                  <p className="text-muted-foreground">Manage your alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h4>Help Center</h4>
                  <p className="text-muted-foreground">FAQs & support</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 rounded-xl border-border bg-white hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>

      <BottomNav activeTab="profile" onTabPress={onTabPress} />
    </div>
  );
}

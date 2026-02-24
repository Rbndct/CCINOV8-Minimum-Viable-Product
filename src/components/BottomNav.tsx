import { Home, Wrench, Building2, Wallet, User } from "lucide-react";

export type Tab = "home" | "tools" | "spaces" | "wallet" | "profile";

interface BottomNavProps {
  activeTab: Tab;
  onTabPress: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "tools", label: "Tools", Icon: Wrench },
  { id: "spaces", label: "Spaces", Icon: Building2 },
  { id: "wallet", label: "Wallet", Icon: Wallet },
  { id: "profile", label: "Profile", Icon: User },
];

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around px-1 py-2">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabPress(id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-xl transition-all ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              </div>
              <span className={`text-[10px] ${isActive ? "text-primary" : ""}`}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

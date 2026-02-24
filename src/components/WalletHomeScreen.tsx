import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Info,
  Clock,
  CreditCard,
  Smartphone,
  Building2,
  Send,
} from "lucide-react";
import { BottomNav, type Tab } from "./BottomNav";

interface WalletHomeScreenProps {
  onBack: () => void;
  onDeposit: () => void;
  onTransactionClick: (id: string) => void;
  onTabPress: (tab: Tab) => void;
}

const transactions = [
  {
    id: "1",
    type: "deposit",
    amount: 5000,
    date: "Oct 28, 2025",
    time: "2:30 PM",
    status: "completed",
    description: "GCash Top-Up",
    method: "GCash",
  },
  {
    id: "2",
    type: "payment",
    amount: -250,
    date: "Oct 27, 2025",
    time: "11:45 AM",
    status: "completed",
    description: "Rental Payment – Power Drill",
    commission: 25,
  },
  {
    id: "3",
    type: "refund",
    amount: 1000,
    date: "Oct 26, 2025",
    time: "4:20 PM",
    status: "completed",
    description: "Security Deposit Refund",
  },
  {
    id: "4",
    type: "payment",
    amount: -150,
    date: "Oct 25, 2025",
    time: "9:15 AM",
    status: "completed",
    description: "Rental Payment – Camera",
    commission: 15,
  },
  {
    id: "5",
    type: "deposit",
    amount: 1000,
    date: "Oct 24, 2025",
    time: "6:05 PM",
    status: "completed",
    description: "Maya Top-Up",
    method: "Maya",
  },
  {
    id: "6",
    type: "earning",
    amount: 375,
    date: "Oct 23, 2025",
    time: "3:00 PM",
    status: "completed",
    description: "Rental Earnings – Extension Ladder",
    commission: -37,
  },
];

const paymentMethods = [
  { id: "gcash", label: "GCash", icon: Smartphone, color: "bg-blue-50 text-blue-600" },
  { id: "maya", label: "Maya", icon: Smartphone, color: "bg-green-50 text-green-600" },
  { id: "bank", label: "Bank Transfer", icon: Building2, color: "bg-secondary text-foreground" },
  { id: "card", label: "Card", icon: CreditCard, color: "bg-secondary text-foreground" },
];

export function WalletHomeScreen({ onBack, onDeposit, onTransactionClick, onTabPress }: WalletHomeScreenProps) {
  const balance = 5625;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-8 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/80">Available Balance</p>
            <h2 className="text-white">réntahán Wallet</h2>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Balance Card */}
        <Card className="p-5 bg-white/95 rounded-2xl border-0">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground mb-1">Total Balance</p>
              <h1 className="text-primary">₱{balance.toLocaleString()}.00</h1>
            </div>
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Wallet className="w-7 h-7 text-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={onDeposit}
              className="h-10 bg-primary hover:bg-primary/90 rounded-xl"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Cash
            </Button>
            <Button
              variant="outline"
              className="h-10 rounded-xl border-border"
              onClick={() => {}}
            >
              <Send className="w-4 h-4 mr-1" />
              Send
            </Button>
          </div>
        </Card>
      </div>

      {/* Payment Methods */}
      <div className="px-6 py-4">
        <h4 className="mb-3">Top-Up Methods</h4>
        <div className="grid grid-cols-4 gap-2">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={onDeposit}
              className="flex flex-col items-center gap-1.5 p-3 bg-white border border-border rounded-xl hover:shadow-sm transition-shadow"
            >
              <div className={`w-9 h-9 rounded-xl ${method.color} flex items-center justify-center`}>
                <method.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{method.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 pb-3">
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-foreground/80">
              A 10% platform fee is charged per transaction. Your wallet can be used to pay for rentals instantly.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h3>Recent Activity</h3>
          <button className="text-primary">See All</button>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card
              key={transaction.id}
              onClick={() => onTransactionClick(transaction.id)}
              className="p-4 rounded-2xl border-border hover:bg-secondary/50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.type === "deposit"
                        ? "bg-accent/10"
                        : transaction.type === "refund"
                        ? "bg-primary/10"
                        : transaction.type === "earning"
                        ? "bg-green-50"
                        : "bg-secondary"
                    }`}
                  >
                    {(transaction.type === "deposit" || transaction.type === "refund") && (
                      <ArrowDownLeft
                        className={`w-5 h-5 ${
                          transaction.type === "deposit" ? "text-accent" : "text-primary"
                        }`}
                      />
                    )}
                    {transaction.type === "payment" && (
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    {transaction.type === "earning" && (
                      <ArrowDownLeft className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{transaction.description}</p>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{transaction.date} · {transaction.time}</span>
                    </div>
                    {transaction.commission && (
                      <p className="text-muted-foreground mt-0.5">
                        Platform fee: ₱{Math.abs(transaction.commission)}
                      </p>
                    )}
                    {(transaction as any).method && (
                      <Badge variant="outline" className="mt-1 border-border text-muted-foreground text-[10px] px-2 py-0">
                        {(transaction as any).method}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p
                    className={`${
                      transaction.amount > 0 ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}₱{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className="border-accent text-accent bg-accent/5 mt-1 text-[10px]"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav activeTab="wallet" onTabPress={onTabPress} />
    </div>
  );
}

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Wallet, Clock, Receipt } from "lucide-react";

interface DepositSuccessScreenProps {
  amount: number;
  onDone: () => void;
  onViewWallet: () => void;
}

export function DepositSuccessScreen({ amount, onDone, onViewWallet }: DepositSuccessScreenProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Success Icon & Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle className="w-14 h-14 text-accent" />
        </div>

        <h2 className="text-primary mb-2 text-center">Deposit Successful!</h2>
        <p className="text-muted-foreground text-center mb-8">
          Your réntahán wallet has been credited
        </p>

        {/* Receipt Card */}
        <Card className="w-full max-w-sm p-6 rounded-2xl border-border mb-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Receipt className="w-5 h-5 text-primary" />
            <h3 className="text-primary">Deposit Receipt</h3>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Amount Deposited</p>
              <p className="text-primary">₱{amount.toLocaleString()}.00</p>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Transaction Fee</p>
              <p className="text-accent">₱0.00</p>
            </div>

            <div className="flex justify-between items-center">
              <h4>New Wallet Balance</h4>
              <h3 className="text-primary">₱{(5625 + amount).toLocaleString()}.00</h3>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <p className="text-muted-foreground">{formattedDate} • {formattedTime}</p>
            </div>
            <p className="text-muted-foreground">Transaction ID: RTN{Math.random().toString(36).substring(2, 11).toUpperCase()}</p>
          </div>
        </Card>

        {/* Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 w-full max-w-sm">
          <div className="flex items-start gap-2">
            <Wallet className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="mb-1 text-primary">Ready to Rent!</h4>
              <p className="text-foreground/80">
                You can now use your wallet balance to book items and spaces seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="px-6 py-4 bg-white border-t border-border">
        <Button
          onClick={onViewWallet}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl mb-3"
        >
          <Wallet className="w-5 h-5 mr-2" />
          View Wallet
        </Button>
        <Button
          onClick={onDone}
          variant="outline"
          className="w-full h-12 rounded-xl border-border"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, CheckCircle, Download, Share2, Clock, Receipt } from "lucide-react";

interface TransactionDetailScreenProps {
  onBack: () => void;
}

export function TransactionDetailScreen({ onBack }: TransactionDetailScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">Transaction Details</h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-6">
        {/* Status */}
        <Card className="p-5 mb-6 rounded-2xl border-border bg-accent/10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-accent" />
            <h3 className="text-accent">Payment Completed</h3>
          </div>
          <p className="text-center text-muted-foreground">Oct 27, 2025 • 11:45 AM</p>
        </Card>

        {/* Transaction Info */}
        <Card className="p-5 mb-6 rounded-2xl border-border">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-primary" />
            <h3>Transaction Receipt</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Transaction ID</p>
              <p>RTN2025102701</p>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Type</p>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">
                Rental Payment
              </Badge>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Item</p>
              <p>Power Drill Set</p>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Rental Period</p>
              <p>2 days</p>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Item Price</p>
              <p>₱500</p>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-border">
              <p className="text-muted-foreground">Platform Fee (10%)</p>
              <p className="text-accent">₱50</p>
            </div>

            <div className="flex justify-between items-center">
              <h4>Total Amount</h4>
              <h3 className="text-primary">₱550</h3>
            </div>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-5 mb-6 rounded-2xl border-border">
          <h4 className="mb-4">Payment Method</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4>réntahán Wallet</h4>
              <p className="text-muted-foreground">New balance: ₱5,075</p>
            </div>
          </div>
        </Card>

        {/* Commission Breakdown */}
        <Card className="p-5 mb-6 rounded-2xl border-border bg-accent/5">
          <h4 className="mb-3">Platform Fee Breakdown</h4>
          <div className="space-y-2 text-foreground/90">
            <p>• Platform fee helps maintain réntahán</p>
            <p>• Covers payment processing & security</p>
            <p>• Supports customer service & dispute resolution</p>
            <p>• Standard 10% fee on all transactions</p>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-border">
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-border">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

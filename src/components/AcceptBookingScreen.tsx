import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Shield, Star, Calendar, CheckCircle } from "lucide-react";

interface AcceptBookingScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function AcceptBookingScreen({ onBack, onConfirm }: AcceptBookingScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Accept Booking</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Success Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mb-2">Ready to Accept?</h3>
          <p className="text-muted-foreground">
            By accepting this booking, you agree to rent your item to Maria Reyes
          </p>
        </div>

        {/* Renter Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-accent text-white">MR</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4>Maria Reyes</h4>
                <Badge variant="outline" className="border-accent text-accent">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>4.9 rating • 12 rentals</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Booking Summary */}
        <Card className="p-5 mb-6 rounded-2xl border-border">
          <h4 className="mb-4">Booking Summary</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-1">Item</p>
              <h4>Power Drill Set</h4>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Rental Period</p>
                <p>Oct 28 - Oct 29, 2025 (2 days)</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily rate</span>
                <span>₱250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">2 days × ₱250</span>
                <span>₱500</span>
              </div>
              <div className="flex justify-between text-accent">
                <span>Security deposit held</span>
                <span>₱1,000</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span>You'll earn</span>
                <span className="text-primary">₱450</span>
              </div>
              <p className="text-muted-foreground">After 10% réntahán fee</p>
            </div>
          </div>
        </Card>

        {/* Protection Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="mb-1">You're Protected</h4>
              <p className="text-foreground/80">
                The ₱1,000 security deposit covers any damage. Payment is held securely until the item is returned safely.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <Card className="p-4 mb-6 rounded-2xl border-border bg-primary/5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-1"
            />
            <label htmlFor="terms" className="cursor-pointer">
              <p className="text-foreground/90 mb-2">
                <span>I agree to the following terms as the item owner:</span>
              </p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• I will provide the item in good working condition</li>
                <li>• I understand the security deposit protects my item</li>
                <li>• I agree to confirm return within 24 hours of receiving the item back</li>
                <li>• I am liable for any misrepresentation of the item's condition</li>
              </ul>
            </label>
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onConfirm}
          disabled={!agreedToTerms}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Confirm & Accept Booking
        </Button>
      </div>
    </div>
  );
}

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Shield, Star, Calendar, MessageCircle } from "lucide-react";

interface BookingRequestScreenProps {
  onBack: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

export function BookingRequestScreen({ onBack, onAccept, onDecline }: BookingRequestScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Booking Request</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Renter Info */}
        <Card className="p-5 mb-6 rounded-2xl border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-accent text-white">MR</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4>Maria Reyes</h4>
                  <Badge variant="outline" className="border-accent text-accent">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>4.9 rating</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span>12 rentals</span>
                  <span>•</span>
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="w-5 h-5 text-primary" />
            </Button>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4">
            <p className="text-foreground/80">
              "Hi! I'm renovating my home and need a reliable drill for a couple of days. Will take good care of it!"
            </p>
          </div>
        </Card>

        {/* Booking Details */}
        <Card className="p-5 mb-6 rounded-2xl border-border">
          <h4 className="mb-4">Booking Details</h4>
          
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
                <span className="text-muted-foreground">Your daily rate</span>
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

        {/* Trust Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="mb-1">You're Protected</h4>
              <p className="text-foreground/80">
                The ₱1,000 security deposit covers any damage. Payment is held securely until the item is returned.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <div className="flex gap-3">
          <Button
            onClick={onDecline}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border"
          >
            Decline
          </Button>
          <Button
            onClick={onAccept}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Accept Booking
          </Button>
        </div>
      </div>
    </div>
  );
}

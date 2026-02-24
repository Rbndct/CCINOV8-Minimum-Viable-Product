import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Shield, Star, Calendar, X } from "lucide-react";

interface DeclineBookingScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function DeclineBookingScreen({ onBack, onConfirm }: DeclineBookingScreenProps) {
  const [reason, setReason] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const quickReasons = [
    "Item no longer available",
    "Dates don't work for me",
    "Renter's profile concerns",
    "Price negotiation needed",
    "Other reason"
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Decline Booking</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Warning Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <X className="w-10 h-10 text-destructive" />
          </div>
          <h3 className="mb-2">Decline Booking Request</h3>
          <p className="text-muted-foreground">
            Maria Reyes will be notified that you can't accommodate this booking
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
          <h4 className="mb-4">Booking Details</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-1">Item</p>
              <h4>Power Drill Set</h4>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-muted-foreground">Requested Period</p>
                <p>Oct 28 - Oct 29, 2025 (2 days)</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Potential earnings</span>
                <span>₱450</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Reason Selection */}
        <div className="mb-6">
          <h4 className="mb-3">Why are you declining? (optional)</h4>
          <div className="space-y-2 mb-4">
            {quickReasons.map((reasonOption) => (
              <button
                key={reasonOption}
                onClick={() => setSelectedReason(reasonOption)}
                className={`w-full text-left px-4 py-3 border rounded-xl transition-colors ${
                  selectedReason === reasonOption
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {reasonOption}
              </button>
            ))}
          </div>
          
          {selectedReason === "Other reason" && (
            <Textarea
              placeholder="Please share your reason (optional but helpful)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-24 bg-white rounded-xl resize-none"
            />
          )}
        </div>

        {/* Impact Notice */}
        <div className="bg-muted/50 border border-border rounded-xl p-4">
          <p className="text-foreground/80">
            <span className="text-primary">Note:</span> Declining bookings may affect your response rate and listing visibility. Consider accepting when possible to build trust in the community.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-border"
          >
            Go Back
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 h-12 bg-destructive hover:bg-destructive/90 rounded-xl"
          >
            Confirm Decline
          </Button>
        </div>
      </div>
    </div>
  );
}

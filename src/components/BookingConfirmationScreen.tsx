import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, MessageCircle, Calendar, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface BookingConfirmationScreenProps {
  onDone: () => void;
  onMessage: () => void;
}

export function BookingConfirmationScreen({ onDone, onMessage }: BookingConfirmationScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-primary" />
        </div>
        <h2 className="mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground mb-8">
          Your rental has been successfully booked
        </p>

        {/* Booking Summary */}
        <Card className="w-full p-5 rounded-2xl border-border mb-5">
          <div className="text-left space-y-4">
            <div>
              <h4 className="mb-2">Power Drill Set</h4>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                <span>Oct 28 – Oct 29, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Quezon City</span>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-muted-foreground mb-3">Owner</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h4>Juan Dela Cruz</h4>
                  <p className="text-muted-foreground">Verified owner • 4.9 ⭐</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rental cost</span>
                <span>₱500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform fee (10%)</span>
                <span>₱50</span>
              </div>
              <div className="flex justify-between text-accent">
                <span className="text-muted-foreground">Deposit held</span>
                <span className="text-accent">₱1,000</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <span>Total charged</span>
                <span className="text-primary">₱1,550</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Next step notice */}
        <div className="w-full bg-accent/10 border border-accent/20 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-2">
            <MessageCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-foreground/80 text-left">
              <span className="text-accent">Next Step:</span> A chat has been opened with Juan. Coordinate pickup time and location through the app.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="w-full space-y-3">
          <Button
            onClick={onMessage}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Open Chat with Owner
          </Button>
          <Button
            onClick={onDone}
            variant="outline"
            className="w-full h-12 rounded-xl border-border"
          >
            View My Bookings
          </Button>
        </div>
      </div>
    </div>
  );
}

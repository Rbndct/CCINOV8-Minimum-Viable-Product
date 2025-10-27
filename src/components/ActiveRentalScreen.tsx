import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Calendar, Shield, MessageCircle, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ActiveRentalScreenProps {
  onBack: () => void;
  onConfirmReturn: () => void;
  isOwner?: boolean;
}

export function ActiveRentalScreen({ onBack, onConfirmReturn, isOwner = false }: ActiveRentalScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h3>Active Rental</h3>
          <p className="text-muted-foreground">In Progress</p>
        </div>
        <Badge className="bg-accent text-white border-0">Active</Badge>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Item Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <div className="flex gap-4 mb-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Power Drill Set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Power Drill Set</h4>
              <p className="text-primary mb-2">₱250/day</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Oct 28 - Oct 29, 2025</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
            <div className="flex items-center gap-2 text-accent">
              <Shield className="w-4 h-4" />
              <p>₱1,000 deposit held securely by réntahán</p>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <h4 className="mb-3">{isOwner ? "Renter" : "Owner"}</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={isOwner ? "bg-accent text-white" : "bg-primary text-white"}>
                  {isOwner ? "MR" : "JD"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4>{isOwner ? "Maria Reyes" : "Juan Dela Cruz"}</h4>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <span>4.9 rating</span>
                  <span>•</span>
                  <Badge variant="outline" className="border-accent text-accent px-1.5 py-0">
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <h4 className="mb-4">Rental Timeline</h4>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="w-0.5 flex-1 bg-primary mt-1 mb-1 min-h-8"></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="mb-1">Booking Confirmed</h4>
                <p className="text-muted-foreground">Oct 27, 2025 at 3:45 PM</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="w-0.5 flex-1 bg-border mt-1 mb-1 min-h-8"></div>
              </div>
              <div className="flex-1 pb-4">
                <h4 className="mb-1">Item Picked Up</h4>
                <p className="text-muted-foreground">Oct 28, 2025 at 9:00 AM</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-secondary border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="mb-1">Return Scheduled</h4>
                <p className="text-muted-foreground">Oct 29, 2025 at 6:00 PM</p>
              </div>
            </div>
          </div>
        </Card>

        {isOwner ? (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <p className="text-foreground/80">
              <span className="text-primary">Reminder:</span> Once the item is returned safely, confirm the return to release the deposit back to the renter.
            </p>
          </div>
        ) : (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <p className="text-foreground/80">
              <span className="text-primary">Reminder:</span> Please return the item in the same condition. Your deposit will be refunded within 24 hours.
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      {isOwner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={onConfirmReturn}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm Item Returned Safely
          </Button>
        </div>
      )}
    </div>
  );
}

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Star, MapPin, Shield, Calendar, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ItemDetailsScreenProps {
  onBack: () => void;
  onBookNow: () => void;
}

export function ItemDetailsScreen({ onBack, onBookNow }: ItemDetailsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background overflow-y-auto">
      {/* Header Image */}
      <div className="relative h-80 bg-secondary">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Power Drill Set"
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Badge className="absolute top-6 right-4 bg-white/95 text-foreground border-0 shadow-lg">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          4.8 (24 reviews)
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 pb-28">
        <div className="mb-6">
          <h2 className="mb-2">Power Drill Set</h2>
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <MapPin className="w-4 h-4" />
            <span>Quezon City - 2.3 km away</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-2xl">₱250</span>
            <span className="text-muted-foreground">/day</span>
          </div>
        </div>

        {/* Owner Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h4>Juan Dela Cruz</h4>
                  <Badge variant="outline" className="border-accent text-accent">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>4.9 rating · 47 rentals</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageCircle className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </Card>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2">Description</h3>
          <p className="text-foreground/80 leading-relaxed">
            Professional-grade cordless power drill set with multiple bits and accessories. Perfect for home repairs, DIY projects, and construction work. Includes carrying case, battery, and charger.
          </p>
        </div>

        {/* Price Breakdown */}
        <Card className="p-4 mb-6 rounded-2xl bg-secondary/50 border-border">
          <h4 className="mb-3">Price Breakdown</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-foreground/80">Daily rate</span>
              <span>₱250</span>
            </div>
            <div className="flex justify-between text-accent">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Security Deposit (Refundable)
              </span>
              <span>₱1,000</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-3">
            The security deposit is held safely by réntahán and fully refunded after the item is returned in good condition.
          </p>
        </Card>

        {/* What's Included */}
        <div className="mb-6">
          <h3 className="mb-2">What's Included</h3>
          <div className="space-y-2">
            {["Cordless drill unit", "2 rechargeable batteries", "Charger", "10-piece drill bit set", "Carrying case"].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBookNow}
            className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl shadow-sm"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Now
          </Button>
          <Button variant="outline" className="h-12 rounded-xl border-border">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Star, Shield, MapPin, Users, Clock, Wifi, Car, Utensils, Wind, Calendar, Info } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface VenueDetailsScreenProps {
  onBack: () => void;
  onBookNow: () => void;
}

const venueAddOns = [
  { id: "1", name: "Projector & Screen", price: 500, icon: "📽️" },
  { id: "2", name: "Sound System", price: 300, icon: "🔊" },
  { id: "3", name: "Tables & Chairs (10 sets)", price: 200, icon: "🪑" },
  { id: "4", name: "Catering Service", price: 1500, icon: "🍽️" }
];

export function VenueDetailsScreen({ onBack, onBookNow }: VenueDetailsScreenProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const basePrice = 2500;
  
  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const addOnsTotal = venueAddOns
    .filter(addon => selectedAddOns.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);

  const totalPrice = basePrice + addOnsTotal;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Venue Details</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Image Gallery */}
        <div className="relative h-64 bg-secondary">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
            alt="Function Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-white">+8 photos</p>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* Title & Rating */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h2>Modern Function Hall</h2>
              <Badge variant="outline" className="border-accent text-accent px-2 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">23 reviews</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4" />
              <span>Makati City, Metro Manila</span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-primary">₱{basePrice.toLocaleString()}</h2>
              <span className="text-muted-foreground">/day</span>
            </div>
          </div>

          {/* Quick Info */}
          <Card className="p-4 mb-6 rounded-2xl border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex justify-center mb-1">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground">50-100</p>
                <p className="text-muted-foreground">people</p>
              </div>
              <div>
                <div className="flex justify-center mb-1">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground">8 hours</p>
                <p className="text-muted-foreground">included</p>
              </div>
              <div>
                <div className="flex justify-center mb-1">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-muted-foreground">500 sqm</p>
                <p className="text-muted-foreground">floor area</p>
              </div>
            </div>
          </Card>

          {/* Owner Info */}
          <Card className="p-4 mb-6 rounded-2xl border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  MV
                </div>
                <div>
                  <h4>Maria Valdez</h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-muted-foreground">4.9 rating</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-accent text-accent">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          </Card>

          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-3">About this Venue</h3>
            <p className="text-foreground/90 leading-relaxed">
              Perfect for corporate events, birthdays, and celebrations. Our modern function hall features air-conditioning, 
              stage with lighting, clean restrooms, and a spacious parking area. Located in the heart of Makati, 
              easily accessible via public transportation.
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h3 className="mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-primary" />
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-primary" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                <span>Parking Space</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-primary" />
                <span>Kitchen Access</span>
              </div>
            </div>
          </div>

          {/* Add-Ons */}
          <div className="mb-6">
            <h3 className="mb-3">Available Add-Ons</h3>
            <div className="space-y-3">
              {venueAddOns.map((addon) => (
                <Card
                  key={addon.id}
                  className={`p-4 rounded-2xl border-border cursor-pointer transition-colors ${
                    selectedAddOns.includes(addon.id) ? "bg-primary/5 border-primary" : ""
                  }`}
                  onClick={() => toggleAddOn(addon.id)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`addon-${addon.id}`}
                      checked={selectedAddOns.includes(addon.id)}
                      onCheckedChange={() => toggleAddOn(addon.id)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-2xl">{addon.icon}</span>
                      <div>
                        <h4>{addon.name}</h4>
                        <p className="text-primary">+₱{addon.price}/day</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="mb-6">
            <h3 className="mb-3">Venue Rules</h3>
            <Card className="p-4 rounded-2xl border-border bg-secondary/30">
              <ul className="space-y-2 text-foreground/90">
                <li>• Maximum capacity: 100 persons</li>
                <li>• No smoking inside the venue</li>
                <li>• Clean as you go policy</li>
                <li>• Rental includes 8 hours use</li>
                <li>• Security deposit: ₱5,000 (refundable)</li>
              </ul>
            </Card>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h3 className="mb-3">Availability</h3>
            <Card className="p-4 rounded-2xl border-border">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Calendar className="w-5 h-5" />
                <h4>Usually booked 2 weeks in advance</h4>
              </div>
              <p className="text-muted-foreground">
                Check calendar for available dates when booking
              </p>
            </Card>
          </div>

          {/* Policy */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="mb-1 text-primary">Downpayment Return Policy</h4>
                <p className="text-foreground/80">
                  Your downpayment will be refunded within 1 hour after venue inspection and confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-muted-foreground">Total Price</p>
            <div className="flex items-center gap-2">
              <h3 className="text-primary">₱{totalPrice.toLocaleString()}</h3>
              <span className="text-muted-foreground">/day</span>
            </div>
            {addOnsTotal > 0 && (
              <p className="text-muted-foreground">
                Base: ₱{basePrice.toLocaleString()} + Add-ons: ₱{addOnsTotal.toLocaleString()}
              </p>
            )}
          </div>
          <Button
            onClick={onBookNow}
            className="h-12 px-8 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}

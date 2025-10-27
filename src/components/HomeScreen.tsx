import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, Wrench, Home, Star, MapPin, User, List } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomeScreenProps {
  onItemClick: (itemId: string) => void;
  onCategoryClick: (category: string) => void;
  onNavigate: (screen: string) => void;
}

const listings = [
  {
    id: "1",
    title: "Power Drill Set",
    price: 250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Quezon City"
  },
  {
    id: "2",
    title: "Extension Ladder",
    price: 350,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1549030782-4935f80baeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRkZXIlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYxNTYwMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Makati"
  },
  {
    id: "3",
    title: "Party Tent (10x10)",
    price: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMHRlbnQlMjBvdXRkb29yfGVufDF8fHx8MTc2MTU2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Pasig"
  },
  {
    id: "4",
    title: "Workshop Space",
    price: 500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549636367-13c144c47063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJhZ2UlMjB3b3Jrc2hvcCUyMHNwYWNlfGVufDF8fHx8MTc2MTU2MDA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Mandaluyong"
  },
  {
    id: "5",
    title: "Professional Camera",
    price: 800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1565548058664-033014b26a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE0OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "BGC"
  },
  {
    id: "6",
    title: "Sound System",
    price: 1500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1702746708573-9a9a8ab86679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMHN5c3RlbSUyMHNwZWFrZXJzfGVufDF8fHx8MTc2MTU2MDA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Taguig"
  }
];

export function HomeScreen({ onItemClick, onCategoryClick, onNavigate }: HomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <h2 className="text-white mb-4">The Garage</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search tools, spaces, equipment..."
            className="pl-10 h-12 bg-white border-0 rounded-xl shadow-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Categories */}
        <div className="mb-6">
          <h3 className="mb-3">Browse Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card
              onClick={() => onCategoryClick("tools")}
              className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            >
              <Wrench className="w-8 h-8 text-primary mb-2" />
              <h4>Tools & Equipment</h4>
              <p className="text-muted-foreground">Power tools, ladders, more</p>
            </Card>
            <Card
              onClick={() => onCategoryClick("spaces")}
              className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
            >
              <Home className="w-8 h-8 text-accent mb-2" />
              <h4>Spaces & Workshops</h4>
              <p className="text-muted-foreground">Studios, garages, venues</p>
            </Card>
          </div>
        </div>

        {/* Nearby Listings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3>Nearby Listings</h3>
            <button className="text-primary">See All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {listings.map((listing) => (
              <Card
                key={listing.id}
                onClick={() => onItemClick(listing.id)}
                className="overflow-hidden rounded-2xl cursor-pointer hover:shadow-lg transition-all border-border"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-white/95 text-foreground border-0 shadow-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {listing.rating}
                  </Badge>
                </div>
                <div className="p-3">
                  <h4 className="mb-1 line-clamp-1">{listing.title}</h4>
                  <p className="text-primary mb-1">₱{listing.price}/day</p>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-3 flex items-center justify-around shadow-lg">
        <button className="flex flex-col items-center gap-1 text-primary">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => onNavigate("search")} className="flex flex-col items-center gap-1 text-muted-foreground">
          <Search className="w-6 h-6" />
          <span className="text-xs">Search</span>
        </button>
        <button onClick={() => onNavigate("listings")} className="flex flex-col items-center gap-1 text-muted-foreground">
          <List className="w-6 h-6" />
          <span className="text-xs">My Listings</span>
        </button>
        <button onClick={() => onNavigate("profile")} className="flex flex-col items-center gap-1 text-muted-foreground">
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}

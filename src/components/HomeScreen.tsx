import { useState } from "react";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Search, Wrench, Building2, Star, MapPin, Bell } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNav, type Tab } from "./BottomNav";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface HomeScreenProps {
  onItemClick: (itemId: string) => void;
  onCategoryClick: (category: string) => void;
  onTabPress: (tab: Tab) => void;
  filterCategory?: string;
}

const listings = [
  {
    id: "1",
    title: "Power Drill Set",
    price: 250,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Quezon City",
    category: "tools",
    unit: "day",
  },
  {
    id: "2",
    title: "Extension Ladder",
    price: 350,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1549030782-4935f80baeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRkZXIlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYxNTYwMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Makati",
    category: "tools",
    unit: "day",
  },
  {
    id: "3",
    title: "Party Tent (10x10)",
    price: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1503542149301-75886cd3030c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMHRlbnQlMjBvdXRkb29yfGVufDF8fHx8MTc2MTU2MDA5Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Pasig",
    category: "spaces",
    unit: "day",
  },
  {
    id: "4",
    title: "Workshop Space",
    price: 500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549636367-13c144c47063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJhZ2UlMjB3b3Jrc2hvcCUyMHNwYWNlfGVufDF8fHx8MTc2MTU2MDA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Mandaluyong",
    category: "spaces",
    unit: "hr",
  },
  {
    id: "5",
    title: "Professional Camera",
    price: 800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1565548058664-033014b26a80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBlcXVpcG1lbnQlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjE0OTYyMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    location: "BGC",
    category: "tools",
    unit: "day",
  },
  {
    id: "6",
    title: "Sound System",
    price: 1500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1702746708573-9a9a8ab86679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMHN5c3RlbSUyMHNwZWFrZXJzfGVufDF8fHx8MTc2MTU2MDA5M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    location: "Taguig",
    category: "tools",
    unit: "day",
  },
];

export function HomeScreen({ onItemClick, onCategoryClick, onTabPress, filterCategory }: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = listings.filter((listing) => {
    const matchCat = filterCategory ? listing.category === filterCategory : true;
    const matchSearch = searchQuery
      ? listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const activeTab: Tab = filterCategory === "tools" ? "tools" : filterCategory === "spaces" ? "spaces" : "home";

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80">Magandang araw! 👋</p>
            <h2 className="text-white">réntahán</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full border-2 border-primary" />
            </button>
            <Avatar className="w-10 h-10 border-2 border-white/30">
              <AvatarFallback className="bg-white text-primary">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, spaces, equipment..."
            className="pl-10 h-12 bg-white border-0 rounded-xl shadow-sm"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Categories */}
        {!filterCategory && (
          <div className="mb-6">
            <h3 className="mb-3">Browse Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card
                onClick={() => onCategoryClick("tools")}
                className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
              >
                <Wrench className="w-8 h-8 text-primary mb-2" />
                <h4>réntahán Tools</h4>
                <p className="text-muted-foreground">Power tools, ladders, more</p>
              </Card>
              <Card
                onClick={() => onTabPress("spaces")}
                className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 rounded-2xl cursor-pointer hover:shadow-md transition-shadow"
              >
                <Building2 className="w-8 h-8 text-accent mb-2" />
                <h4>réntahán Space</h4>
                <p className="text-muted-foreground">Studios, garages, venues</p>
              </Card>
            </div>
          </div>
        )}

        {/* Featured / Nearby Listings */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3>
              {filterCategory === "tools"
                ? "réntahán Tools"
                : filterCategory === "spaces"
                ? "réntahán Spaces"
                : "Nearby Listings"}
            </h3>
            {filterCategory ? (
              <button className="text-primary" onClick={() => onCategoryClick("")}>
                Clear Filter
              </button>
            ) : (
              <button className="text-primary" onClick={() => onCategoryClick("")}>
                See All
              </button>
            )}
          </div>

          {filteredListings.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <Search className="w-14 h-14 text-muted-foreground/40 mb-3" />
              <h3 className="mb-1 text-muted-foreground">No listings found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredListings.map((listing) => (
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
                    <p className="text-primary mb-1">
                      ₱{listing.price.toLocaleString()}/{listing.unit}
                    </p>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabPress={onTabPress} />
    </div>
  );
}

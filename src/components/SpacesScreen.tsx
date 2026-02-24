import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Search, MapPin, Users, Star, Shield, Map, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNav, type Tab } from "./BottomNav";

interface SpacesScreenProps {
  onBack: () => void;
  onSpaceClick: (id: string) => void;
  onTabPress: (tab: Tab) => void;
}

const spaces = [
  {
    id: "1",
    name: "Modern Function Hall",
    location: "Makati City",
    price: 2500,
    priceUnit: "day",
    capacity: "50-100",
    rating: 4.9,
    reviews: 23,
    verified: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Event Halls",
  },
  {
    id: "2",
    name: "Basketball Court",
    location: "Quezon City",
    price: 800,
    priceUnit: "hr",
    capacity: "10-20",
    rating: 4.8,
    reviews: 45,
    verified: true,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Sports",
  },
  {
    id: "3",
    name: "Photography Studio",
    location: "Pasig City",
    price: 1200,
    priceUnit: "hr",
    capacity: "5-15",
    rating: 5.0,
    reviews: 18,
    verified: true,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Studios",
  },
  {
    id: "4",
    name: "Rooftop Event Space",
    location: "BGC, Taguig",
    price: 3500,
    priceUnit: "day",
    capacity: "30-80",
    rating: 4.9,
    reviews: 31,
    verified: true,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Outdoor",
  },
  {
    id: "5",
    name: "Recording Studio",
    location: "Manila",
    price: 1500,
    priceUnit: "hr",
    capacity: "2-10",
    rating: 4.7,
    reviews: 12,
    verified: false,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Studios",
  },
  {
    id: "6",
    name: "Party Venue with Pool",
    location: "Laguna",
    price: 5000,
    priceUnit: "day",
    capacity: "50-150",
    rating: 4.8,
    reviews: 28,
    verified: true,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    category: "Event Halls",
  },
];

const categories = ["All", "Event Halls", "Sports", "Studios", "Outdoor"];

export function SpacesScreen({ onBack, onSpaceClick, onTabPress }: SpacesScreenProps) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = spaces.filter((s) => {
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchSearch = searchQuery
      ? s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="mb-4">
          <h2 className="text-white mb-1">réntahán Spaces</h2>
          <p className="text-white/80">Find venues, studios & event spaces</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spaces..."
            className="h-12 pl-12 pr-4 bg-white rounded-xl border-0"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border px-6 py-3">
        <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`rounded-full whitespace-nowrap h-8 px-4 ${
                selectedCategory === category
                  ? "bg-primary text-white border-primary"
                  : "border-border"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-lg flex-1 h-9">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
            className="rounded-lg px-4 h-9"
          >
            {viewMode === "grid" ? <Map className="w-5 h-5" /> : <ListIcon className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted-foreground">{filtered.length} spaces available</p>
        </div>

        {viewMode === "grid" ? (
          <>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <Search className="w-14 h-14 text-muted-foreground/40 mb-3" />
                <h3 className="mb-1 text-muted-foreground">No spaces found</h3>
                <p className="text-muted-foreground">Try different keywords or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((space) => (
                  <Card
                    key={space.id}
                    onClick={() => onSpaceClick(space.id)}
                    className="overflow-hidden rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-44">
                      <ImageWithFallback
                        src={space.image}
                        alt={space.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {space.verified && (
                        <Badge className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-accent border-0">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-foreground border-0">
                        {space.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="flex-1 pr-2">{space.name}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{space.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{space.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <Users className="w-4 h-4" />
                        <span>{space.capacity} people</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                          <h3 className="text-primary">₱{space.price.toLocaleString()}</h3>
                          <span className="text-muted-foreground">/{space.priceUnit}</span>
                        </div>
                        <p className="text-muted-foreground">{space.reviews} reviews</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <Card className="h-80 rounded-2xl border-border flex items-center justify-center bg-secondary/30">
            <div className="text-center">
              <Map className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">Map View</h3>
              <p className="text-muted-foreground">Interactive map coming soon!</p>
            </div>
          </Card>
        )}
      </div>

      <BottomNav activeTab="spaces" onTabPress={onTabPress} />
    </div>
  );
}

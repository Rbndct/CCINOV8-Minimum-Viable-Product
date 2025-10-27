import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Plus, ArrowLeft, MoreVertical, Eye, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MyListingsScreenProps {
  onBack: () => void;
  onCreateListing: () => void;
  onEditListing: (id: string) => void;
}

const myListings = [
  {
    id: "1",
    title: "Power Drill Set",
    price: 250,
    status: "active",
    views: 48,
    bookings: 5,
    image: "https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "2",
    title: "Extension Ladder",
    price: 350,
    status: "active",
    views: 32,
    bookings: 3,
    image: "https://images.unsplash.com/photo-1549030782-4935f80baeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRkZXIlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYxNTYwMDkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  }
];

export function MyListingsScreen({ onBack, onCreateListing, onEditListing }: MyListingsScreenProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3>My Listings</h3>
        </div>
        <Badge variant="outline" className="border-primary text-primary">
          {myListings.length} active
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 rounded-2xl border-border bg-gradient-to-br from-primary/5 to-primary/10">
            <p className="text-muted-foreground mb-1">Total Earnings</p>
            <h3 className="text-primary">₱4,250</h3>
          </Card>
          <Card className="p-4 rounded-2xl border-border bg-gradient-to-br from-accent/5 to-accent/10">
            <p className="text-muted-foreground mb-1">Total Bookings</p>
            <h3 className="text-accent">8</h3>
          </Card>
        </div>

        {/* Listings */}
        <div className="space-y-3">
          {myListings.map((listing) => (
            <Card
              key={listing.id}
              className="p-4 rounded-2xl border-border cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onEditListing(listing.id)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                  <ImageWithFallback
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="line-clamp-1">{listing.title}</h4>
                    <button className="p-1 hover:bg-secondary rounded-lg">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-primary mb-2">₱{listing.price}/day</p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{listing.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{listing.bookings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={onCreateListing}
        className="fixed bottom-20 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

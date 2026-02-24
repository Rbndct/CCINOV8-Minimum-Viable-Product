import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Star, Home, User, Search, List } from "lucide-react";

interface ReviewSummaryScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

const reviews = [
  {
    id: "1",
    reviewerName: "Maria Reyes",
    reviewerInitials: "MR",
    rating: 5,
    date: "Oct 15, 2025",
    text: "Great experience! Juan was very responsive and the drill was in excellent condition. Highly recommend!",
    tags: ["As Described", "Clean", "Easy Pickup"],
    itemName: "Power Drill Set",
    type: "received" // review I received
  },
  {
    id: "2",
    reviewerName: "Carlos Santos",
    reviewerInitials: "CS",
    rating: 5,
    date: "Oct 10, 2025",
    text: "Perfect tool for my renovation project. Owner was friendly and accommodating. Will rent again!",
    tags: ["Great Condition", "Easy Pickup"],
    itemName: "Extension Ladder",
    type: "received"
  },
  {
    id: "3",
    reviewerName: "Ana Garcia",
    reviewerInitials: "AG",
    rating: 4,
    date: "Oct 5, 2025",
    text: "Good quality camera. Pickup was smooth. Would have been 5 stars if it came with extra batteries.",
    tags: ["As Described", "Clean"],
    itemName: "Professional Camera",
    type: "received"
  },
  {
    id: "4",
    reviewerName: "Juan Dela Cruz",
    reviewerInitials: "JD",
    rating: 5,
    date: "Oct 12, 2025",
    text: "Maria was an excellent renter. Returned the drill in perfect condition and on time. Very respectful!",
    tags: ["Respectful", "On Time", "Took Care of Item"],
    renterName: "Maria Reyes",
    type: "given" // review I gave
  },
  {
    id: "5",
    reviewerName: "Juan Dela Cruz",
    reviewerInitials: "JD",
    rating: 5,
    date: "Oct 8, 2025",
    text: "Carlos was great! Good communication and returned everything in pristine condition.",
    tags: ["Good Communication", "On Time", "Took Care of Item"],
    renterName: "Carlos Santos",
    type: "given"
  }
];

export function ReviewSummaryScreen({ onBack, onNavigate }: ReviewSummaryScreenProps) {
  const receivedReviews = reviews.filter(r => r.type === "received");
  const givenReviews = reviews.filter(r => r.type === "given");
  const averageRating = (receivedReviews.reduce((acc, r) => acc + r.rating, 0) / receivedReviews.length).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">My Reviews</h2>
        </div>
        
        <Card className="p-4 bg-white/95 rounded-2xl border-0">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                <span className="text-primary">{averageRating}</span>
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-primary mb-1">{receivedReviews.length}</p>
              <p className="text-muted-foreground">Reviews Received</p>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-primary mb-1">{givenReviews.length}</p>
              <p className="text-muted-foreground">Reviews Given</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        {/* Reviews Received */}
        <div className="mb-8">
          <h3 className="mb-4">Reviews I've Received</h3>
          <div className="space-y-3">
            {receivedReviews.map((review) => (
              <Card key={review.id} className="p-4 rounded-2xl border-border">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-accent text-white">
                      {review.reviewerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4>{review.reviewerName}</h4>
                      <p className="text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-2">For: {review.itemName}</p>
                  </div>
                </div>
                <p className="text-foreground/90 mb-3">{review.text}</p>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-primary/30 text-primary bg-primary/5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Given */}
        <div>
          <h3 className="mb-4">Reviews I've Given</h3>
          <div className="space-y-3">
            {givenReviews.map((review) => (
              <Card key={review.id} className="p-4 rounded-2xl border-border bg-secondary/30">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white">
                      {review.reviewerInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4>You reviewed {review.renterName}</h4>
                      <p className="text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-foreground/90 mb-3">{review.text}</p>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-accent/30 text-accent bg-accent/5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-3 flex items-center justify-around shadow-lg">
        <button onClick={onBack} className="flex flex-col items-center gap-1 text-muted-foreground">
          <Home className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-muted-foreground">
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

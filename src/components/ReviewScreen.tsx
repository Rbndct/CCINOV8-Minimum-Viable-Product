import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Star, CheckCircle } from "lucide-react";

interface ReviewScreenProps {
  onBack: () => void;
  onSubmit: () => void;
  isOwner?: boolean;
}

export function ReviewScreen({ onBack, onSubmit, isOwner = false }: ReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Rate Your Experience</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Success Message */}
        <Card className="p-5 mb-6 rounded-2xl bg-primary/10 border-primary/20">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-primary mt-0.5" />
            <div>
              <h4 className="mb-1 text-primary">Rental Complete!</h4>
              <p className="text-foreground/80">
                {isOwner 
                  ? "₱1,000 deposit refunded to Maria Reyes" 
                  : "₱1,000 deposit refunded to your account"
                }
              </p>
            </div>
          </div>
        </Card>

        {/* User Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-3">
            {isOwner ? "Rate your renter" : "Rate your experience"}
          </p>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className={isOwner ? "bg-accent text-white" : "bg-primary text-white"}>
                {isOwner ? "MR" : "JD"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4>{isOwner ? "Maria Reyes" : "Juan Dela Cruz"}</h4>
              <p className="text-muted-foreground">
                {isOwner ? "Rented your Power Drill Set" : "Owner of Power Drill Set"}
              </p>
            </div>
          </div>
        </Card>

        {/* Rating */}
        <Card className="p-6 mb-6 rounded-2xl border-border">
          <h4 className="mb-4 text-center">How was your experience?</h4>
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-2 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            {rating === 0 && "Tap to rate"}
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        </Card>

        {/* Review Text */}
        <div className="mb-6">
          <h4 className="mb-3">Share your experience (optional)</h4>
          <Textarea
            placeholder={
              isOwner
                ? "How was the renter? Were they responsible and timely?"
                : "How was the item? Was it as described?"
            }
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-32 bg-white rounded-xl resize-none"
          />
        </div>

        {/* Quick Tags */}
        <div>
          <h4 className="mb-3">Quick tags</h4>
          <div className="flex flex-wrap gap-2">
            {isOwner ? (
              <>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Respectful
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  On Time
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Good Communication
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Took Care of Item
                </button>
              </>
            ) : (
              <>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  As Described
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Clean
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Great Condition
                </button>
                <button className="px-4 py-2 border border-border bg-white rounded-full hover:border-primary hover:bg-primary/5 transition-colors">
                  Easy Pickup
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onSubmit}
          disabled={rating === 0}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}

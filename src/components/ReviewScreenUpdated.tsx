import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Star, CheckCircle, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ReviewScreenUpdatedProps {
  onBack: () => void;
  onPreviewReview: (data: ReviewData) => void;
  isOwner?: boolean;
}

export interface ReviewData {
  ownerRating: number;
  ownerReview: string;
  ownerTags: string[];
  itemRating: number;
  itemReview: string;
  itemTags: string[];
}

const ownerTagOptions = ["Friendly", "Responsive", "Easy to coordinate with", "Respectful", "Helpful"];
const itemTagOptions = ["Good Condition", "As Described", "Useful", "Clean", "Well-maintained"];

export function ReviewScreenUpdated({ onBack, onPreviewReview, isOwner = false }: ReviewScreenUpdatedProps) {
  // Owner Rating
  const [ownerRating, setOwnerRating] = useState(0);
  const [hoveredOwnerRating, setHoveredOwnerRating] = useState(0);
  const [ownerReview, setOwnerReview] = useState("");
  const [ownerTags, setOwnerTags] = useState<string[]>([]);

  // Item Rating
  const [itemRating, setItemRating] = useState(0);
  const [hoveredItemRating, setHoveredItemRating] = useState(0);
  const [itemReview, setItemReview] = useState("");
  const [itemTags, setItemTags] = useState<string[]>([]);

  const maxChars = 500;
  const canSubmit = ownerRating > 0 && itemRating > 0;

  const toggleOwnerTag = (tag: string) => {
    setOwnerTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const toggleItemTag = (tag: string) => {
    setItemTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleContinue = () => {
    onPreviewReview({
      ownerRating,
      ownerReview,
      ownerTags,
      itemRating,
      itemReview,
      itemTags
    });
  };

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
                ₱1,000 deposit refunded to your account
              </p>
            </div>
          </div>
        </Card>

        {/* OWNER RATING SECTION */}
        <div className="mb-8">
          <h3 className="mb-4">Rate the Owner</h3>
          
          {/* Owner Info */}
          <Card className="p-4 mb-4 rounded-2xl border-border">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <div>
                <h4>Juan Dela Cruz</h4>
                <p className="text-muted-foreground">Item Owner</p>
              </div>
            </div>
          </Card>

          {/* Owner Star Rating */}
          <Card className="p-6 mb-4 rounded-2xl border-border">
            <h4 className="mb-4 text-center">How was the owner?</h4>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setOwnerRating(star)}
                  onMouseEnter={() => setHoveredOwnerRating(star)}
                  onMouseLeave={() => setHoveredOwnerRating(0)}
                  className="p-2 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoveredOwnerRating || ownerRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              {ownerRating === 0 && "Tap to rate"}
              {ownerRating === 1 && "Poor"}
              {ownerRating === 2 && "Fair"}
              {ownerRating === 3 && "Good"}
              {ownerRating === 4 && "Very Good"}
              {ownerRating === 5 && "Excellent"}
            </p>
          </Card>

          {/* Owner Review Text */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4>Tell us more (optional)</h4>
              <p className="text-muted-foreground">
                {ownerReview.length}/{maxChars}
              </p>
            </div>
            <Textarea
              placeholder="How was your experience with the owner? Were they responsive and helpful?"
              value={ownerReview}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) {
                  setOwnerReview(e.target.value);
                }
              }}
              className="min-h-24 bg-white rounded-xl resize-none"
            />
          </div>

          {/* Owner Tags */}
          <div>
            <h4 className="mb-3">Quick tags for owner</h4>
            <div className="flex flex-wrap gap-2">
              {ownerTagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleOwnerTag(tag)}
                  className={`px-4 py-2 border rounded-full transition-colors ${
                    ownerTags.includes(tag)
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8"></div>

        {/* ITEM RATING SECTION */}
        <div>
          <h3 className="mb-4">Rate the Item</h3>
          
          {/* Item Info */}
          <Card className="p-4 mb-4 rounded-2xl border-border">
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Power Drill Set"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4>Power Drill Set</h4>
                <p className="text-muted-foreground">Rental completed</p>
              </div>
            </div>
          </Card>

          {/* Item Star Rating */}
          <Card className="p-6 mb-4 rounded-2xl border-border">
            <h4 className="mb-4 text-center">How was the item?</h4>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setItemRating(star)}
                  onMouseEnter={() => setHoveredItemRating(star)}
                  onMouseLeave={() => setHoveredItemRating(0)}
                  className="p-2 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      star <= (hoveredItemRating || itemRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-muted-foreground">
              {itemRating === 0 && "Tap to rate"}
              {itemRating === 1 && "Poor"}
              {itemRating === 2 && "Fair"}
              {itemRating === 3 && "Good"}
              {itemRating === 4 && "Very Good"}
              {itemRating === 5 && "Excellent"}
            </p>
          </Card>

          {/* Item Review Text */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4>Tell us more (optional)</h4>
              <p className="text-muted-foreground">
                {itemReview.length}/{maxChars}
              </p>
            </div>
            <Textarea
              placeholder="How was the item? Was it as described and in good condition?"
              value={itemReview}
              onChange={(e) => {
                if (e.target.value.length <= maxChars) {
                  setItemReview(e.target.value);
                }
              }}
              className="min-h-24 bg-white rounded-xl resize-none"
            />
          </div>

          {/* Item Tags */}
          <div>
            <h4 className="mb-3">Quick tags for item</h4>
            <div className="flex flex-wrap gap-2">
              {itemTagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleItemTag(tag)}
                  className={`px-4 py-2 border rounded-full transition-colors ${
                    itemTags.includes(tag)
                      ? "border-accent bg-accent text-white"
                      : "border-border bg-white hover:border-accent hover:bg-accent/5"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={handleContinue}
          disabled={!canSubmit}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
        >
          Continue to Review Summary
        </Button>
      </div>
    </div>
  );
}

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Star, Edit } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { ReviewData } from "./ReviewScreenUpdated";

interface ReviewSummaryBeforeSubmitProps {
  onBack: () => void;
  onSubmit: () => void;
  reviewData: ReviewData;
}

export function ReviewSummaryBeforeSubmit({ onBack, onSubmit, reviewData }: ReviewSummaryBeforeSubmitProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-white">Review Summary</h2>
        </div>
        <p className="text-white/90">Review your feedback before submitting</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
        {/* Owner Review */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3>Your Review for Owner</h3>
            <button onClick={onBack} className="flex items-center gap-1 text-primary">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <Card className="p-5 rounded-2xl border-border">
            {/* Owner Info */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4>Juan Dela Cruz</h4>
                <p className="text-muted-foreground">Item Owner</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-primary">{reviewData.ownerRating}.0</span>
              </div>
            </div>

            {/* Owner Rating Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= reviewData.ownerRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-border"
                  }`}
                />
              ))}
            </div>

            {/* Owner Review Text */}
            {reviewData.ownerReview && (
              <p className="text-foreground/90 mb-3">{reviewData.ownerReview}</p>
            )}

            {/* Owner Tags */}
            {reviewData.ownerTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {reviewData.ownerTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-primary/30 text-primary bg-primary/5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Item Review */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3>Your Review for Item</h3>
            <button onClick={onBack} className="flex items-center gap-1 text-primary">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          <Card className="p-5 rounded-2xl border-border">
            {/* Item Info */}
            <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Power Drill Set"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4>Power Drill Set</h4>
                <p className="text-muted-foreground">Rented Oct 28-29</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-accent">{reviewData.itemRating}.0</span>
              </div>
            </div>

            {/* Item Rating Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= reviewData.itemRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-border"
                  }`}
                />
              ))}
            </div>

            {/* Item Review Text */}
            {reviewData.itemReview && (
              <p className="text-foreground/90 mb-3">{reviewData.itemReview}</p>
            )}

            {/* Item Tags */}
            {reviewData.itemTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {reviewData.itemTags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-accent/30 text-accent bg-accent/5">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
          <p className="text-foreground/80">
            Your reviews will be visible to other users and help build trust in the réntahán community.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onSubmit}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
        >
          Submit Reviews
        </Button>
      </div>
    </div>
  );
}

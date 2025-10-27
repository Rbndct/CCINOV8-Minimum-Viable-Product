import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Upload, DollarSign, Shield, CheckCircle } from "lucide-react";

interface CreateListingScreenProps {
  onBack: () => void;
  onPublish: () => void;
}

export function CreateListingScreen({ onBack, onPublish }: CreateListingScreenProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [deposit, setDeposit] = useState("1000");
  const [agreedToLiability, setAgreedToLiability] = useState(false);

  if (step === 1) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h3>Add Photos & Details</h3>
            <p className="text-muted-foreground">Step 1 of 3</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
          {/* Photo Upload */}
          <div className="mb-6">
            <h4 className="mb-3">Photos</h4>
            <Card className="p-8 rounded-2xl border-dashed border-2 border-border bg-secondary/20 cursor-pointer hover:bg-secondary/40 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h4 className="mb-1">Upload Photos</h4>
                <p className="text-muted-foreground">Add at least 3 clear photos of your item</p>
              </div>
            </Card>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h4 className="mb-3">Title</h4>
            <Input
              placeholder="e.g., Power Drill Set with Accessories"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 bg-white rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="mb-3">Description</h4>
            <Textarea
              placeholder="Describe your item, its condition, and what's included..."
              className="min-h-32 bg-white rounded-xl resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <h4 className="mb-3">Category</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-primary bg-primary/5 rounded-xl text-left">
                <p>Tools & Equipment</p>
              </button>
              <button className="p-4 border border-border bg-white rounded-xl text-left">
                <p className="text-muted-foreground">Spaces & Workshops</p>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={() => setStep(2)}
            disabled={!title}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
          <button onClick={() => setStep(1)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h3>Set Your Price</h3>
            <p className="text-muted-foreground">Step 2 of 3</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
          {/* Daily Rate */}
          <div className="mb-6">
            <h4 className="mb-3">Daily Rental Rate</h4>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
              <Input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-14 pl-8 bg-white rounded-xl"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">/day</span>
            </div>
            <p className="text-muted-foreground mt-2">
              Competitive rates in your area: ₱150 - ₱350/day
            </p>
          </div>

          {/* Security Deposit */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Security Deposit
            </h4>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₱</span>
              <Input
                type="number"
                placeholder="1000"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="h-14 pl-8 bg-white rounded-xl"
              />
            </div>
            <Card className="mt-3 p-4 rounded-xl bg-accent/10 border-accent/20">
              <p className="text-foreground/80">
                Recommended: ₱1,000. This protects you from damage and is fully refundable to renters when they return the item safely.
              </p>
            </Card>
          </div>

          {/* Pricing Breakdown */}
          <Card className="p-4 rounded-2xl bg-secondary/50 border-border">
            <h4 className="mb-3">What you'll earn</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your daily rate</span>
                <span>₱{price || 0}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>réntahán fee (10%)</span>
                <span>- ₱{Math.round(Number(price || 0) * 0.1)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span>You earn per day</span>
                <span className="text-primary">₱{Math.round(Number(price || 0) * 0.9)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={() => setStep(3)}
            disabled={!price}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
          <button onClick={() => setStep(2)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h3>Review & Publish</h3>
            <p className="text-muted-foreground">Step 3 of 3</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
          <Card className="p-4 mb-6 rounded-2xl border-border">
            <h4 className="mb-4">Listing Preview</h4>
            <div className="aspect-square rounded-xl bg-secondary mb-4 flex items-center justify-center">
              <Upload className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2">{title || "Your Item Title"}</h3>
            <p className="text-primary mb-2">₱{price || 0}/day</p>
            <p className="text-muted-foreground">
              Your item description will appear here...
            </p>
          </Card>

          <Card className="p-4 mb-6 rounded-2xl bg-secondary/50 border-border">
            <h4 className="mb-3">Pricing Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily rate</span>
                <span>₱{price || 0}</span>
              </div>
              <div className="flex justify-between text-accent">
                <span>Security deposit</span>
                <span>₱{deposit}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span>You earn per rental</span>
                <span className="text-primary">₱{Math.round(Number(price || 0) * 0.9)}/day</span>
              </div>
            </div>
          </Card>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-foreground/80">
                Once published, your listing will be visible to renters in your area. You'll receive notifications when someone wants to book.
              </p>
            </div>
          </div>

          <Card className="p-4 rounded-2xl bg-secondary/50 border-border">
            <div className="flex items-start gap-3">
              <Checkbox
                id="liability"
                checked={agreedToLiability}
                onCheckedChange={(checked) => setAgreedToLiability(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="liability" className="cursor-pointer flex-1">
                <p className="text-foreground/80 leading-relaxed">
                  <span className="text-destructive">*REQUIRED:</span> I have read and agree to the <span className="text-primary">Clear Damage & Liability Clause</span> and the <span className="text-primary">Exculpatory Clause</span>.
                </p>
              </label>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={onPublish}
            disabled={!agreedToLiability}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Publish Listing
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
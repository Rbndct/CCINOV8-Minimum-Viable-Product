import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, CheckCircle, Shield, Calendar, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ConfirmPickupScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  isOwner?: boolean;
}

export function ConfirmPickupScreen({ onBack, onConfirm, isOwner = false }: ConfirmPickupScreenProps) {
  const [itemConditionChecked, setItemConditionChecked] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canConfirm = itemConditionChecked && agreedToTerms;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Confirm Item {isOwner ? "Handoff" : "Pickup"}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mb-2">{isOwner ? "Ready to Hand Over?" : "Ready to Pick Up?"}</h3>
          <p className="text-muted-foreground">
            {isOwner 
              ? "Confirm that you're handing over the item to the renter" 
              : "Confirm that you've received the item from the owner"
            }
          </p>
        </div>

        {/* Item Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <div className="flex gap-4 mb-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689935421853-cb23a0bc92e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGRyaWxsJTIwdG9vbHN8ZW58MXx8fHwxNzYxNTI2MzAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Power Drill Set"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-1">Power Drill Set</h4>
              <p className="text-primary mb-2">₱250/day</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Oct 28 - Oct 29, 2025</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Other Party Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-3">{isOwner ? "Renter" : "Owner"}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className={isOwner ? "bg-accent text-white" : "bg-primary text-white"}>
                  {isOwner ? "MR" : "JD"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4>{isOwner ? "Maria Reyes" : "Juan Dela Cruz"}</h4>
                  <Badge variant="outline" className="border-accent text-accent px-1.5 py-0">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <p className="text-muted-foreground">4.9 rating</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Deposit Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="mb-1 text-accent">Security Deposit: ₱1,000</h4>
              <p className="text-foreground/80">
                {isOwner 
                  ? "The deposit is held securely by réntahán and will protect your item during the rental period."
                  : "Your deposit of ₱1,000 is held securely and will be refunded within 24 hours after the item is returned safely."
                }
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Checkboxes */}
        <Card className="p-4 mb-6 rounded-2xl border-border bg-primary/5">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="condition"
                checked={itemConditionChecked}
                onCheckedChange={(checked) => setItemConditionChecked(checked === true)}
                className="mt-1"
              />
              <label htmlFor="condition" className="cursor-pointer">
                <p className="text-foreground/90">
                  {isOwner 
                    ? "I confirm the item is in good working condition and matches the listing description"
                    : "I confirm I've inspected the item and it's in good condition as described"
                  }
                </p>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-1"
              />
              <label htmlFor="terms" className="cursor-pointer">
                <p className="text-foreground/90 mb-2">
                  {isOwner 
                    ? "I agree to the following as the item owner:"
                    : "I agree to the following as the renter:"
                  }
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  {isOwner ? (
                    <>
                      <li>• The item is in proper working condition</li>
                      <li>• I've provided all necessary instructions for use</li>
                      <li>• I understand the security deposit protects my item</li>
                      <li>• The renter has received the complete item set</li>
                    </>
                  ) : (
                    <>
                      <li>• I will take good care of the item</li>
                      <li>• I will return it in the same condition</li>
                      <li>• I'm liable for any damage during rental period</li>
                      <li>• I've received the complete item as described</li>
                    </>
                  )}
                </ul>
              </label>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="mb-1 text-primary">Important</h4>
              <p className="text-foreground/80">
                {isOwner 
                  ? "By confirming, the rental period officially begins. The renter will be able to use the item until the return date."
                  : "By confirming, you acknowledge receipt of the item. Make sure to inspect it carefully before confirming."
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {isOwner ? "Confirm Item Handed Over" : "Confirm Item Received"}
        </Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, CheckCircle, Shield, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ReturnConfirmationScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  isOwner?: boolean;
}

export function ReturnConfirmationScreen({ onBack, onConfirm, isOwner = false }: ReturnConfirmationScreenProps) {
  const [itemInGoodCondition, setItemInGoodCondition] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const canConfirm = itemInGoodCondition && agreedToTerms;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h3>Confirm Return</h3>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mb-2">Confirm Item Return</h3>
          <p className="text-muted-foreground">
            {isOwner 
              ? "Verify that the item was returned in good condition" 
              : "Confirm that you've returned the item to the owner"
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
              <p className="text-muted-foreground mb-2">2-day rental completed</p>
              <p className="text-primary">Oct 28 - Oct 29, 2025</p>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <Card className="p-4 mb-6 rounded-2xl border-border">
          <p className="text-muted-foreground mb-3">{isOwner ? "Renter" : "Owner"}</p>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className={isOwner ? "bg-accent text-white" : "bg-primary text-white"}>
                {isOwner ? "MR" : "JD"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4>{isOwner ? "Maria Reyes" : "Juan Dela Cruz"}</h4>
              <p className="text-muted-foreground">Verified member</p>
            </div>
          </div>
        </Card>

        {/* Deposit Info */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-2 mb-3">
            <Shield className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h4 className="mb-1 text-accent">Security Deposit: ₱1,000</h4>
              <p className="text-foreground/80">
                {isOwner 
                  ? "The deposit will be automatically released to the renter within 24 hours after you confirm the return."
                  : "Your deposit will be released back to you within 24 hours after the owner confirms the return."
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
                checked={itemInGoodCondition}
                onCheckedChange={(checked) => setItemInGoodCondition(checked === true)}
                className="mt-1"
              />
              <label htmlFor="condition" className="cursor-pointer">
                <p className="text-foreground/90">
                  {isOwner 
                    ? "I confirm the item was returned in good condition with no damage"
                    : "I confirm I returned the item in the same condition I received it"
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
                <p className="text-foreground/90">
                  {isOwner 
                    ? "I understand that confirming this return will release the deposit to the renter and complete the transaction"
                    : "I understand that this confirmation is required for the owner to release my deposit"
                  }
                </p>
              </label>
            </div>
          </div>
        </Card>

        {/* Warning for Damage */}
        {isOwner && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
              <div>
                <h4 className="mb-1 text-destructive">Item Damaged?</h4>
                <p className="text-foreground/80 mb-2">
                  If the item was returned damaged, don't confirm the return. Contact réntahán support to file a damage claim using the security deposit.
                </p>
                <Button
                  variant="outline"
                  className="h-10 border-destructive text-destructive hover:bg-destructive/10 rounded-xl"
                >
                  Report Damage
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
        <Button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          {isOwner ? "Confirm Return & Release Deposit" : "Confirm Item Returned"}
        </Button>
      </div>
    </div>
  );
}

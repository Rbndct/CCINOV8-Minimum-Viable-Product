import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { ArrowLeft, Calendar as CalendarIcon, Wallet, Shield, CheckCircle } from "lucide-react";

interface BookingCheckoutScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function BookingCheckoutScreen({ onBack, onConfirm }: BookingCheckoutScreenProps) {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(2025, 9, 28));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date(2025, 9, 29));
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToLiability, setAgreedToLiability] = useState(false);

  const days = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const dailyRate = 250;
  const deposit = 1000;
  const total = (days * dailyRate) + deposit;

  if (step === 1) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center gap-3">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h3>Select Dates</h3>
        </div>

        {/* Calendar */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-28">
          <Card className="p-4 rounded-2xl border-border">
            <Calendar
              mode="range"
              selected={{ from: startDate, to: endDate }}
              onSelect={(range) => {
                if (range?.from) setStartDate(range.from);
                if (range?.to) setEndDate(range.to);
              }}
              className="w-full"
            />
          </Card>

          <Card className="mt-4 p-4 rounded-2xl bg-secondary/50 border-border">
            <h4 className="mb-3">Your Rental Period</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-out</span>
                <span>Oct 28, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-in</span>
                <span>Oct 29, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span>{days} day{days !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={() => setStep(2)}
            disabled={!startDate || !endDate}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Continue to Payment
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
          <h3>Review & Pay</h3>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
          {/* Booking Summary */}
          <Card className="p-4 mb-4 rounded-2xl border-border">
            <h4 className="mb-3">Booking Summary</h4>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-foreground/80">
                <span>Power Drill Set</span>
                <span></span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Oct 28 - Oct 29, 2025</span>
                <span></span>
              </div>
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{days} day{days !== 1 ? 's' : ''} × ₱{dailyRate}</span>
                <span>₱{days * dailyRate}</span>
              </div>
              <div className="flex justify-between text-accent">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Security Deposit
                </span>
                <span>₱{deposit}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span>Total</span>
                <span className="text-primary">₱{total}</span>
              </div>
            </div>
          </Card>

          {/* Payment Options */}
          <Card className="p-4 mb-4 rounded-2xl border-border">
            <h4 className="mb-3 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              Payment Method
            </h4>
            <div className="space-y-2">
              <button className="w-full p-3 border border-primary bg-primary/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">G</span>
                  </div>
                  <span>GCash</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </button>
              <button className="w-full p-3 border border-border bg-white rounded-xl flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white">M</span>
                  </div>
                  <span>Maya</span>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-border"></div>
              </button>
            </div>
          </Card>

          {/* Terms */}
          <Card className="p-4 mb-4 rounded-2xl bg-secondary/50 border-border">
            <div className="flex items-start gap-3 mb-4">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="mt-1"
              />
              <label htmlFor="terms" className="cursor-pointer flex-1">
                <p className="text-foreground/80 leading-relaxed">
                  I agree to the <span className="text-primary">Damage & Liability Clause</span> and understand that I'm responsible for the item during the rental period.
                </p>
              </label>
            </div>
            
            <div className="flex items-start gap-3 pt-4 border-t border-border">
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

          <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-accent mt-0.5" />
              <p className="text-foreground/80">
                Your ₱{deposit} deposit is held securely by réntahán and will be fully refunded within 24 hours of safe return.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
          <Button
            onClick={onConfirm}
            disabled={!agreedToTerms || !agreedToLiability}
            className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl"
          >
            Confirm & Pay ₱{total}
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Upload, Shield, CheckCircle } from "lucide-react";

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: () => void;
}

export function VerificationModal({ open, onClose, onVerify }: VerificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center">Get Verified to Build Trust</DialogTitle>
          <DialogDescription className="text-center">
            Verification helps the community feel safe renting with you
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="border border-border rounded-xl p-4 bg-secondary/50">
            <div className="flex items-start gap-3 mb-3">
              <Upload className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="mb-1">Upload Valid ID</h4>
                <p className="text-muted-foreground">Philippine ID, Driver's License, or Passport</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-lg">
              Choose File
            </Button>
          </div>

          <div className="border border-border rounded-xl p-4 bg-accent/5">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent mt-1" />
              <div>
                <h4 className="mb-1">Your Trust Score</h4>
                <p className="text-muted-foreground">
                  Earn points through rentals, reviews, and timely returns
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-accent rounded-full transition-all"></div>
                  </div>
                  <span className="text-muted-foreground">0/100</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Button onClick={onVerify} className="w-full h-11 bg-primary hover:bg-primary/90 rounded-xl">
              Submit for Verification
            </Button>
            <Button onClick={onClose} variant="ghost" className="w-full h-11 rounded-xl">
              Skip for Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

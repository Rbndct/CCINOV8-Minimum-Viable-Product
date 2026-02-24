import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  ArrowLeft,
  Wallet,
  AlertCircle,
  Smartphone,
  Building2,
  CreditCard,
  ChevronRight,
  Shield,
  Check,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface DepositCashScreenProps {
  onBack: () => void;
  onConfirm: (amount: number) => void;
}

type Step = "select-method" | "enter-amount" | "otp" | "processing";

const quickAmounts = [100, 300, 500, 1000];

const paymentMethods = [
  {
    id: "gcash",
    name: "GCash",
    description: "Instant transfer from GCash wallet",
    icon: Smartphone,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    id: "maya",
    name: "Maya",
    description: "Pay via Maya (formerly PayMaya)",
    icon: Smartphone,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "BDO, BPI, UnionBank, Metrobank",
    icon: Building2,
    color: "text-foreground",
    bg: "bg-secondary",
    border: "border-border",
  },
  {
    id: "card",
    name: "Debit / Credit Card",
    description: "Visa, Mastercard accepted",
    icon: CreditCard,
    color: "text-foreground",
    bg: "bg-secondary",
    border: "border-border",
  },
  {
    id: "cash",
    name: "Cash Deposit",
    description: "7-Eleven, Palawan, SM Business Center",
    icon: Wallet,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
];

export function DepositCashScreen({ onBack, onConfirm }: DepositCashScreenProps) {
  const [step, setStep] = useState<Step>("select-method");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);

  const isValidAmount = amount && parseFloat(amount) >= 100;
  const requiresOtp = parseFloat(amount) >= 500;

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep("enter-amount");
  };

  const handleAmountContinue = () => {
    const val = parseFloat(amount);
    if (!isValidAmount) return;
    if (requiresOtp) {
      setStep("otp");
      // Start timer
      let t = 60;
      const interval = setInterval(() => {
        t--;
        setOtpTimer(t);
        if (t <= 0) clearInterval(interval);
      }, 1000);
    } else {
      setStep("processing");
      setTimeout(() => onConfirm(val), 1800);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length < 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }
    setStep("processing");
    setTimeout(() => onConfirm(parseFloat(amount)), 1800);
  };

  const selectedMethodData = paymentMethods.find((m) => m.id === selectedMethod);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={step === "select-method" ? onBack : () => setStep("select-method")}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary/80"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-white">Add Cash</h2>
            <p className="text-white/80">
              {step === "select-method"
                ? "Choose payment method"
                : step === "enter-amount"
                ? `via ${selectedMethodData?.name}`
                : step === "otp"
                ? "Verify transaction"
                : "Processing..."}
            </p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {["select-method", "enter-amount", "otp"].map((s, i) => (
            <div
              key={s}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                step === s || (step === "processing" && i < 3)
                  ? "bg-white"
                  : ["select-method", "enter-amount", "otp"].indexOf(step) > i
                  ? "bg-white/60"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Step 1: Select Method ── */}
      {step === "select-method" && (
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-10">
          <h3 className="mb-4">Select Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                className={`w-full p-4 rounded-2xl border ${method.border} bg-white flex items-center gap-4 hover:shadow-md transition-shadow text-left`}
              >
                <div className={`w-12 h-12 rounded-xl ${method.bg} flex items-center justify-center flex-shrink-0`}>
                  <method.icon className={`w-6 h-6 ${method.color}`} />
                </div>
                <div className="flex-1">
                  <h4>{method.name}</h4>
                  <p className="text-muted-foreground">{method.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Security note */}
          <div className="mt-6 flex items-start gap-2 text-muted-foreground">
            <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>All transactions are encrypted and secured. réntahán never stores your banking credentials.</p>
          </div>
        </div>
      )}

      {/* ── Step 2: Enter Amount ── */}
      {step === "enter-amount" && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
            {/* Amount input */}
            <Card className="p-6 mb-5 rounded-2xl border-border">
              <p className="text-muted-foreground mb-3">Enter Amount</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary">₱</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 text-primary outline-none bg-transparent text-xl"
                  autoFocus
                />
              </div>
              <div className="h-px bg-border mb-3" />
              <p className="text-muted-foreground">Minimum: ₱100 • No top-up fee</p>
            </Card>

            {/* Quick amounts */}
            <div className="mb-5">
              <p className="text-muted-foreground mb-3">Quick Select</p>
              <div className="grid grid-cols-4 gap-2">
                {quickAmounts.map((q) => (
                  <Button
                    key={q}
                    onClick={() => setAmount(q.toString())}
                    variant="outline"
                    className={`h-12 rounded-xl ${
                      amount === q.toString()
                        ? "bg-primary text-white border-primary"
                        : "border-border"
                    }`}
                  >
                    ₱{q}
                  </Button>
                ))}
              </div>
            </div>

            {/* OTP notice for large amounts */}
            {requiresOtp && (
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 flex items-start gap-2">
                <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-foreground/80">
                  <span className="text-accent">OTP required</span> for top-ups of ₱500 and above for your security.
                </p>
              </div>
            )}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="text-muted-foreground">Amount</p>
                <p className="text-primary">₱{amount || "0"}</p>
              </div>
              <Button
                onClick={handleAmountContinue}
                disabled={!isValidAmount}
                className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
              >
                {requiresOtp ? "Continue to OTP Verification" : "Confirm Top-Up"}
              </Button>
            </div>
          </div>
        </>
      )}

      {/* ── Step 3: OTP ── */}
      {step === "otp" && (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="mb-2">OTP Verification</h3>
              <p className="text-muted-foreground">
                We sent a 6-digit code to your registered mobile number ending in{" "}
                <span className="text-foreground">•••• 4782</span>
              </p>
            </div>

            {/* OTP input */}
            <Card className="p-6 mb-5 rounded-2xl border-border">
              <p className="text-muted-foreground mb-3 text-center">Enter 6-digit OTP</p>
              <div className="flex justify-center gap-2 mb-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-11 h-14 border-2 rounded-xl flex items-center justify-center ${
                      otp.length > i
                        ? "border-primary bg-primary/5"
                        : "border-border bg-secondary"
                    }`}
                  >
                    <span className="text-primary">
                      {otp[i] ? "•" : ""}
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="tel"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="sr-only"
                autoFocus
              />
              {/* Fake numpad for demo */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1,2,3,4,5,6,7,8,9,"","0","⌫"].map((key, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (key === "⌫") setOtp((o) => o.slice(0, -1));
                      else if (key !== "" && otp.length < 6) setOtp((o) => o + key);
                    }}
                    className={`h-12 rounded-xl flex items-center justify-center transition-colors ${
                      key === "" ? "" : "bg-secondary hover:bg-border active:bg-primary/10"
                    }`}
                  >
                    {key !== "" && <span className={key === "⌫" ? "text-destructive" : ""}>{key}</span>}
                  </button>
                ))}
              </div>
            </Card>

            {/* Resend */}
            <div className="flex items-center justify-center gap-2">
              {otpTimer > 0 ? (
                <p className="text-muted-foreground">
                  Resend in{" "}
                  <span className="text-primary">{otpTimer}s</span>
                </p>
              ) : (
                <button
                  onClick={() => {
                    setOtpTimer(60);
                    toast.success("New OTP sent!");
                  }}
                  className="flex items-center gap-2 text-primary"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resend OTP
                </button>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-6 py-4 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <p className="text-muted-foreground">Depositing via {selectedMethodData?.name}</p>
                <p className="text-primary">₱{parseFloat(amount).toLocaleString()}</p>
              </div>
              <Button
                onClick={handleOtpSubmit}
                disabled={otp.length < 6}
                className="w-full h-12 bg-primary hover:bg-primary/90 rounded-xl disabled:opacity-50"
              >
                <Check className="w-5 h-5 mr-2" />
                Verify & Deposit
              </Button>
            </div>
          </div>
        </>
      )}

      {/* ── Step 4: Processing ── */}
      {step === "processing" && (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Wallet className="w-10 h-10 text-primary" />
          </div>
          <h3 className="mb-2">Processing...</h3>
          <p className="text-muted-foreground">
            Your ₱{parseFloat(amount).toLocaleString()} top-up is being processed. Please wait.
          </p>
        </div>
      )}
    </div>
  );
}

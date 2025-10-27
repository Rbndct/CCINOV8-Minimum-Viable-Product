import { useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { VerificationModal } from "./components/VerificationModal";
import { HomeScreen } from "./components/HomeScreen";
import { ItemDetailsScreen } from "./components/ItemDetailsScreen";
import { BookingCheckoutScreen } from "./components/BookingCheckoutScreen";
import { BookingConfirmationScreen } from "./components/BookingConfirmationScreen";
import { MyListingsScreen } from "./components/MyListingsScreen";
import { CreateListingScreen } from "./components/CreateListingScreen";
import { BookingRequestScreen } from "./components/BookingRequestScreen";
import { ActiveRentalScreen } from "./components/ActiveRentalScreen";
import { ReviewScreen } from "./components/ReviewScreen";
import { MyRentalsScreen } from "./components/MyRentalsScreen";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

type Screen =
  | "login"
  | "home"
  | "item-details"
  | "booking-checkout"
  | "booking-confirmation"
  | "my-listings"
  | "create-listing"
  | "booking-request"
  | "active-rental-owner"
  | "active-rental-renter"
  | "review-owner"
  | "review-renter"
  | "my-rentals";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("");

  const handleLogin = () => {
    setCurrentScreen("home");
    setTimeout(() => {
      setShowVerificationModal(true);
    }, 500);
  };

  const handleVerify = () => {
    setShowVerificationModal(false);
    toast.success("Verification submitted! We'll review it within 24 hours.");
  };

  const handleCategoryClick = (category: string) => {
    setFilterCategory(category);
  };

  const handleBookingConfirm = () => {
    setCurrentScreen("booking-confirmation");
    toast.success("Payment successful!");
  };

  const handleListingPublish = () => {
    setCurrentScreen("my-listings");
    toast.success("Your listing is now live!");
  };

  const handleBookingAccept = () => {
    setCurrentScreen("my-listings");
    toast.success("Booking accepted! The renter has been notified.");
  };

  const handleConfirmReturn = () => {
    setCurrentScreen("review-owner");
    toast.success("Return confirmed! Deposit released to renter.");
  };

  const handleReviewSubmit = () => {
    setCurrentScreen("home");
    toast.success("Thank you for your feedback!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="mx-auto max-w-md h-screen bg-background shadow-2xl relative overflow-hidden">
        {/* Screens */}
        {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}

        {currentScreen === "home" && (
          <HomeScreen
            onItemClick={() => setCurrentScreen("item-details")}
            onCategoryClick={handleCategoryClick}
            onNavigate={(screen) => {
              if (screen === "listings") setCurrentScreen("my-listings");
              if (screen === "search") toast.info("Advanced search coming soon!");
            }}
            filterCategory={filterCategory}
          />
        )}

        {currentScreen === "item-details" && (
          <ItemDetailsScreen
            onBack={() => setCurrentScreen("home")}
            onBookNow={() => setCurrentScreen("booking-checkout")}
          />
        )}

        {currentScreen === "booking-checkout" && (
          <BookingCheckoutScreen
            onBack={() => setCurrentScreen("item-details")}
            onConfirm={handleBookingConfirm}
          />
        )}

        {currentScreen === "booking-confirmation" && (
          <BookingConfirmationScreen
            onDone={() => setCurrentScreen("my-rentals")}
            onMessage={() => toast.info("Chat feature coming soon!")}
          />
        )}

        {currentScreen === "my-listings" && (
          <MyListingsScreen
            onBack={() => setCurrentScreen("home")}
            onCreateListing={() => setCurrentScreen("create-listing")}
            onEditListing={() => setCurrentScreen("booking-request")}
          />
        )}

        {currentScreen === "create-listing" && (
          <CreateListingScreen
            onBack={() => setCurrentScreen("my-listings")}
            onPublish={handleListingPublish}
          />
        )}

        {currentScreen === "booking-request" && (
          <BookingRequestScreen
            onBack={() => setCurrentScreen("my-listings")}
            onAccept={handleBookingAccept}
            onDecline={() => {
              setCurrentScreen("my-listings");
              toast.info("Booking request declined");
            }}
          />
        )}

        {currentScreen === "active-rental-owner" && (
          <ActiveRentalScreen
            onBack={() => setCurrentScreen("my-listings")}
            onConfirmReturn={handleConfirmReturn}
            isOwner={true}
          />
        )}

        {currentScreen === "active-rental-renter" && (
          <ActiveRentalScreen
            onBack={() => setCurrentScreen("my-rentals")}
            onConfirmReturn={() => {}}
            isOwner={false}
          />
        )}

        {currentScreen === "review-owner" && (
          <ReviewScreen
            onBack={() => setCurrentScreen("my-listings")}
            onSubmit={handleReviewSubmit}
            isOwner={true}
          />
        )}

        {currentScreen === "review-renter" && (
          <ReviewScreen
            onBack={() => setCurrentScreen("my-rentals")}
            onSubmit={handleReviewSubmit}
            isOwner={false}
          />
        )}

        {currentScreen === "my-rentals" && (
          <MyRentalsScreen
            onBack={() => setCurrentScreen("home")}
            onRentalClick={() => setCurrentScreen("active-rental-renter")}
          />
        )}

        {/* Verification Modal */}
        <VerificationModal
          open={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          onVerify={handleVerify}
        />

        {/* Demo Navigation Helper */}
        <div className="fixed bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs opacity-0 hover:opacity-100 transition-opacity">
          <p className="mb-1">
            <strong>Demo Navigation:</strong>
          </p>
          <div className="grid grid-cols-2 gap-1">
            <button onClick={() => setCurrentScreen("login")} className="text-left hover:text-primary">
              • Login
            </button>
            <button onClick={() => setCurrentScreen("home")} className="text-left hover:text-primary">
              • Home
            </button>
            <button onClick={() => setCurrentScreen("item-details")} className="text-left hover:text-primary">
              • Item Details
            </button>
            <button onClick={() => setCurrentScreen("booking-checkout")} className="text-left hover:text-primary">
              • Checkout
            </button>
            <button onClick={() => setCurrentScreen("my-listings")} className="text-left hover:text-primary">
              • My Listings
            </button>
            <button onClick={() => setCurrentScreen("create-listing")} className="text-left hover:text-primary">
              • Create Listing
            </button>
            <button onClick={() => setCurrentScreen("booking-request")} className="text-left hover:text-primary">
              • Booking Request
            </button>
            <button onClick={() => setCurrentScreen("active-rental-owner")} className="text-left hover:text-primary">
              • Active Rental (Owner)
            </button>
            <button onClick={() => setCurrentScreen("my-rentals")} className="text-left hover:text-primary">
              • My Rentals
            </button>
            <button onClick={() => setCurrentScreen("review-owner")} className="text-left hover:text-primary">
              • Review
            </button>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
import { useState } from "react";
import { StartScreen } from "./components/StartScreen";
import { LoginScreen } from "./components/LoginScreen";
import { VerificationModal } from "./components/VerificationModal";
import { HomeScreen } from "./components/HomeScreen";
import { ItemDetailsScreen } from "./components/ItemDetailsScreen";
import { BookingCheckoutScreen } from "./components/BookingCheckoutScreen";
import { BookingConfirmationScreen } from "./components/BookingConfirmationScreen";
import { MyListingsScreen } from "./components/MyListingsScreen";
import { CreateListingScreen } from "./components/CreateListingScreen";
import { BookingRequestScreen } from "./components/BookingRequestScreen";
import { AcceptBookingScreen } from "./components/AcceptBookingScreen";
import { DeclineBookingScreen } from "./components/DeclineBookingScreen";
import { ConfirmPickupScreen } from "./components/ConfirmPickupScreen";
import { ActiveRentalScreen } from "./components/ActiveRentalScreen";
import { ReturnConfirmationScreen } from "./components/ReturnConfirmationScreen";
import { ReviewScreenUpdated } from "./components/ReviewScreenUpdated";
import { ReviewSummaryBeforeSubmit } from "./components/ReviewSummaryBeforeSubmit";
import { ReviewSummaryScreen } from "./components/ReviewSummaryScreen";
import { MyRentalsScreen } from "./components/MyRentalsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { WalletHomeScreen } from "./components/WalletHomeScreen";
import { DepositCashScreen } from "./components/DepositCashScreen";
import { DepositSuccessScreen } from "./components/DepositSuccessScreen";
import { TransactionDetailScreen } from "./components/TransactionDetailScreen";
import { SpacesScreen } from "./components/SpacesScreen";
import { VenueDetailsScreen } from "./components/VenueDetailsScreen";
import { AddOnManagementScreen } from "./components/AddOnManagementScreen";
import { ChatListScreen } from "./components/ChatListScreen";
import { ChatDetailScreen } from "./components/ChatDetailScreen";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import type { ReviewData } from "./components/ReviewScreenUpdated";
import type { Tab } from "./components/BottomNav";

type Screen =
  | "start"
  | "login"
  | "home"
  | "item-details"
  | "booking-checkout"
  | "booking-confirmation"
  | "confirm-pickup-renter"
  | "my-listings"
  | "create-listing"
  | "booking-request"
  | "accept-booking"
  | "decline-booking"
  | "confirm-pickup-owner"
  | "active-rental-owner"
  | "active-rental-renter"
  | "return-confirmation-owner"
  | "return-confirmation-renter"
  | "review-owner"
  | "review-renter"
  | "review-summary-before-submit"
  | "review-summary"
  | "my-rentals"
  | "profile"
  | "wallet"
  | "deposit-cash"
  | "deposit-success"
  | "transaction-detail"
  | "spaces"
  | "venue-details"
  | "addon-management"
  | "chat-list"
  | "chat-detail";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("start");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>("chat-1");

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const handleStartComplete = () => setCurrentScreen("login");

  const handleLogin = () => {
    setCurrentScreen("home");
    setTimeout(() => setShowVerificationModal(true), 500);
  };

  const handleLogout = () => {
    setCurrentScreen("start");
    toast.success("You've been logged out successfully");
  };

  const handleVerify = () => {
    setShowVerificationModal(false);
    toast.success("Verification submitted! We'll review it within 24 hours.");
  };

  // Unified bottom-nav tab handler
  const handleTabPress = (tab: Tab) => {
    switch (tab) {
      case "home":
        setFilterCategory("");
        setCurrentScreen("home");
        break;
      case "tools":
        setFilterCategory("tools");
        setCurrentScreen("home");
        break;
      case "spaces":
        setCurrentScreen("spaces");
        break;
      case "wallet":
        setCurrentScreen("wallet");
        break;
      case "profile":
        setCurrentScreen("profile");
        break;
    }
  };

  const handleCategoryClick = (category: string) => {
    if (category === "réntahán Spaces") {
      setCurrentScreen("spaces");
    } else {
      setFilterCategory(category);
    }
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

  const handleBookingDecline = () => {
    setCurrentScreen("my-listings");
    toast.info("Booking request declined");
  };

  const handleConfirmReturn = () => {
    setCurrentScreen("review-owner");
    toast.success("Return confirmed! Downpayment will be refunded within 1 hour.");
  };

  const handleDepositConfirm = (amount: number) => {
    setDepositAmount(amount);
    setCurrentScreen("deposit-success");
    toast.success(`₱${amount} deposited successfully!`);
  };

  const handleReviewPreview = (data: ReviewData) => {
    setReviewData(data);
    setCurrentScreen("review-summary-before-submit");
  };

  const handleReviewSubmit = () => {
    setCurrentScreen("home");
    toast.success("Thank you for your feedback!");
  };

  const openChat = (chatId?: string) => {
    if (chatId) setActiveChatId(chatId);
    setCurrentScreen("chat-detail");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Container */}
      <div className="mx-auto max-w-md h-screen bg-background shadow-2xl relative overflow-hidden">

        {currentScreen === "start" && <StartScreen onComplete={handleStartComplete} />}

        {currentScreen === "login" && <LoginScreen onLogin={handleLogin} />}

        {currentScreen === "home" && (
          <HomeScreen
            onItemClick={() => setCurrentScreen("item-details")}
            onCategoryClick={handleCategoryClick}
            onTabPress={handleTabPress}
            filterCategory={filterCategory}
          />
        )}

        {currentScreen === "profile" && (
          <ProfileScreen
            onNavigateToListings={() => setCurrentScreen("my-listings")}
            onNavigateToRentals={() => setCurrentScreen("my-rentals")}
            onNavigateToReviews={() => setCurrentScreen("review-summary")}
            onNavigateToWallet={() => setCurrentScreen("wallet")}
            onNavigateToChat={() => setCurrentScreen("chat-list")}
            onTabPress={handleTabPress}
            onLogout={handleLogout}
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
            onMessage={() => openChat("chat-1")}
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
            onAccept={() => setCurrentScreen("accept-booking")}
            onDecline={() => setCurrentScreen("decline-booking")}
          />
        )}

        {currentScreen === "accept-booking" && (
          <AcceptBookingScreen
            onBack={() => setCurrentScreen("booking-request")}
            onConfirm={handleBookingAccept}
          />
        )}

        {currentScreen === "decline-booking" && (
          <DeclineBookingScreen
            onBack={() => setCurrentScreen("booking-request")}
            onConfirm={handleBookingDecline}
          />
        )}

        {currentScreen === "confirm-pickup-owner" && (
          <ConfirmPickupScreen
            onBack={() => setCurrentScreen("active-rental-owner")}
            onConfirm={() => {
              setCurrentScreen("active-rental-owner");
              toast.success("Pickup confirmed!");
            }}
            isOwner={true}
          />
        )}

        {currentScreen === "confirm-pickup-renter" && (
          <ConfirmPickupScreen
            onBack={() => setCurrentScreen("active-rental-renter")}
            onConfirm={() => {
              setCurrentScreen("active-rental-renter");
              toast.success("Pickup confirmed!");
            }}
            isOwner={false}
          />
        )}

        {currentScreen === "active-rental-owner" && (
          <ActiveRentalScreen
            onBack={() => setCurrentScreen("my-listings")}
            onConfirmReturn={() => setCurrentScreen("return-confirmation-owner")}
            onOpenChat={() => openChat("chat-2")}
            isOwner={true}
          />
        )}

        {currentScreen === "active-rental-renter" && (
          <ActiveRentalScreen
            onBack={() => setCurrentScreen("my-rentals")}
            onConfirmReturn={() => setCurrentScreen("return-confirmation-renter")}
            onOpenChat={() => openChat("chat-1")}
            isOwner={false}
          />
        )}

        {currentScreen === "return-confirmation-owner" && (
          <ReturnConfirmationScreen
            onBack={() => setCurrentScreen("active-rental-owner")}
            onConfirm={handleConfirmReturn}
            isOwner={true}
          />
        )}

        {currentScreen === "return-confirmation-renter" && (
          <ReturnConfirmationScreen
            onBack={() => setCurrentScreen("active-rental-renter")}
            onConfirm={() => {
              setCurrentScreen("review-renter");
              toast.success("Return confirmed! Waiting for owner verification.");
            }}
            isOwner={false}
          />
        )}

        {currentScreen === "review-owner" && (
          <ReviewScreenUpdated
            onBack={() => setCurrentScreen("my-listings")}
            onPreviewReview={handleReviewPreview}
            isOwner={true}
          />
        )}

        {currentScreen === "review-renter" && (
          <ReviewScreenUpdated
            onBack={() => setCurrentScreen("my-rentals")}
            onPreviewReview={handleReviewPreview}
            isOwner={false}
          />
        )}

        {currentScreen === "review-summary-before-submit" && (
          <ReviewSummaryBeforeSubmit
            onBack={() => setCurrentScreen("review-owner")}
            onSubmit={handleReviewSubmit}
            reviewData={reviewData}
          />
        )}

        {currentScreen === "review-summary" && (
          <ReviewSummaryScreen
            onBack={() => setCurrentScreen("profile")}
            onNavigate={(screen) => {
              if (screen === "listings") setCurrentScreen("my-listings");
              if (screen === "profile") setCurrentScreen("profile");
            }}
          />
        )}

        {currentScreen === "my-rentals" && (
          <MyRentalsScreen
            onBack={() => setCurrentScreen("home")}
            onRentalClick={() => setCurrentScreen("active-rental-renter")}
          />
        )}

        {currentScreen === "wallet" && (
          <WalletHomeScreen
            onBack={() => setCurrentScreen("profile")}
            onDeposit={() => setCurrentScreen("deposit-cash")}
            onTransactionClick={(id) => setCurrentScreen("transaction-detail")}
            onTabPress={handleTabPress}
          />
        )}

        {currentScreen === "deposit-cash" && (
          <DepositCashScreen
            onBack={() => setCurrentScreen("wallet")}
            onConfirm={handleDepositConfirm}
          />
        )}

        {currentScreen === "deposit-success" && (
          <DepositSuccessScreen
            amount={depositAmount}
            onDone={() => setCurrentScreen("home")}
            onViewWallet={() => setCurrentScreen("wallet")}
          />
        )}

        {currentScreen === "transaction-detail" && (
          <TransactionDetailScreen
            onBack={() => setCurrentScreen("wallet")}
          />
        )}

        {currentScreen === "spaces" && (
          <SpacesScreen
            onBack={() => setCurrentScreen("home")}
            onSpaceClick={(id) => setCurrentScreen("venue-details")}
            onTabPress={handleTabPress}
          />
        )}

        {currentScreen === "venue-details" && (
          <VenueDetailsScreen
            onBack={() => setCurrentScreen("spaces")}
            onBookNow={() => setCurrentScreen("booking-checkout")}
          />
        )}

        {currentScreen === "addon-management" && (
          <AddOnManagementScreen
            onBack={() => setCurrentScreen("my-listings")}
            onSave={() => {
              setCurrentScreen("my-listings");
              toast.success("Add-ons updated successfully!");
            }}
          />
        )}

        {currentScreen === "chat-list" && (
          <ChatListScreen
            onBack={() => setCurrentScreen("home")}
            onChatClick={(chatId) => {
              setActiveChatId(chatId);
              setCurrentScreen("chat-detail");
            }}
            onTabPress={handleTabPress}
          />
        )}

        {currentScreen === "chat-detail" && (
          <ChatDetailScreen
            chatId={activeChatId}
            isActive={activeChatId !== "chat-4"}
            isCancelled={activeChatId === "chat-4"}
            onBack={() => setCurrentScreen("chat-list")}
          />
        )}

        {/* Verification Modal */}
        <VerificationModal
          open={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          onVerify={handleVerify}
        />
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

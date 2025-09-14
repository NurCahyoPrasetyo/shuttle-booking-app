"use client";

import { BookingConfirmation } from "@/components/booking-confirmation";
import { BookingSummary } from "@/components/booking-summary";
import { SearchForm } from "@/components/search-form";
import { ShuttleList } from "@/components/shuttle-list";
import type {
  BookingState,
  SearchFormData,
  SelectedTrip,
  ShuttleSchedule,
} from "@/lib/types";
import { useState } from "react";

export default function HomePage() {
  const [bookingState, setBookingState] = useState<BookingState>({
    searchData: null,
    availableSchedules: [],
    selectedTrip: null,
    isLoading: false,
    error: null,
  });

  const [currentStep, setCurrentStep] = useState<
    "search" | "results" | "summary" | "confirmation"
  >("search");

  const handleSearch = async (searchData: SearchFormData) => {
    setBookingState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/data/shuttles.json");
      if (!response.ok) throw new Error("Gagal memuat data shuttle");

      const data = await response.json();
      const filteredSchedules = data.schedules.filter(
        (schedule: ShuttleSchedule) =>
          schedule.origin === searchData.origin &&
          schedule.destination === searchData.destination
      );

      setBookingState((prev) => ({
        ...prev,
        searchData,
        availableSchedules: filteredSchedules,
        isLoading: false,
      }));
      setCurrentStep("results");
    } catch (error) {
      setBookingState((prev) => ({
        ...prev,
        error: "Terjadi kesalahan saat memuat data. Silakan coba lagi.",
        isLoading: false,
      }));
    }
  };

  const handleSelectTrip = (
    schedule: ShuttleSchedule,
    departureTime: string
  ) => {
    if (!bookingState.searchData) return;

    const selectedTrip: SelectedTrip = {
      schedule,
      departureTime,
      passengerName: bookingState.searchData.passengerName,
      departureDate: bookingState.searchData.departureDate,
    };

    setBookingState((prev) => ({ ...prev, selectedTrip }));
    setCurrentStep("summary");
  };

  const handleConfirmBooking = () => {
    setCurrentStep("confirmation");
  };

  const handleNewSearch = () => {
    setBookingState({
      searchData: null,
      availableSchedules: [],
      selectedTrip: null,
      isLoading: false,
      error: null,
    });
    setCurrentStep("search");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Shuttle Booking Online
          </h1>
          <p className="text-center mt-2 text-primary-foreground/90">
            Pesan shuttle Jakarta • Bandung • Surabaya
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {currentStep === "search" && "Halaman pencarian shuttle"}
          {currentStep === "results" && "Menampilkan hasil pencarian shuttle"}
          {currentStep === "summary" && "Menampilkan ringkasan pemesanan"}
          {currentStep === "confirmation" && "Booking berhasil dikonfirmasi"}
        </div>

        {currentStep === "search" && (
          <SearchForm
            onSearch={handleSearch}
            isLoading={bookingState.isLoading}
            error={bookingState.error}
          />
        )}

        {currentStep === "results" && (
          <ShuttleList
            schedules={bookingState.availableSchedules}
            searchData={bookingState.searchData!}
            onSelectTrip={handleSelectTrip}
            onBackToSearch={handleNewSearch}
          />
        )}

        {currentStep === "summary" && bookingState.selectedTrip && (
          <BookingSummary
            selectedTrip={bookingState.selectedTrip}
            onConfirm={handleConfirmBooking}
            onBack={() => setCurrentStep("results")}
          />
        )}

        {currentStep === "confirmation" && bookingState.selectedTrip && (
          <BookingConfirmation
            selectedTrip={bookingState.selectedTrip}
            onNewSearch={handleNewSearch}
          />
        )}
      </main>

      <footer className="bg-muted mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Shuttle Booking Online.</p>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SelectedTrip } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import {
  Building2,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  MapPin,
  Share2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";

interface BookingConfirmationProps {
  selectedTrip: SelectedTrip;
  onNewSearch: () => void;
}

export function BookingConfirmation({
  selectedTrip,
  onNewSearch,
}: BookingConfirmationProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId] = useState(() => `SB${Date.now().toString().slice(-8)}`);

  const { schedule, departureTime, passengerName, departureDate } =
    selectedTrip;

  // Simulate loading state for 800-1200ms as per requirements
  useEffect(() => {
    const loadingTime = Math.random() * 400 + 800; // 800-1200ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  // Clear localStorage on successful booking
  useEffect(() => {
    if (!isLoading) {
      localStorage.removeItem("shuttleSearchData");
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardContent className="py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Memproses Booking...</h3>
                <p className="text-muted-foreground mt-2">
                  Mohon tunggu sebentar, kami sedang mengkonfirmasi pemesanan
                  Anda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Message */}
      <Card className="shadow-lg border-green-200 bg-green-50/50">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Booking Berhasil!
          </CardTitle>
          <p className="text-green-700">
            Terima kasih, pemesanan shuttle Anda telah dikonfirmasi
          </p>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 border">
              <span className="text-sm text-muted-foreground">Booking ID:</span>
              <span className="font-mono font-bold text-primary">
                {bookingId}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Passenger Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informasi Penumpang
              </h3>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Nama Penumpang:</span>
                  <span className="font-medium">{passengerName}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Trip Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Detail Perjalanan
              </h3>
              <div className="bg-white rounded-lg p-4 border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rute:</span>
                  <span className="font-medium">
                    {schedule.origin} → {schedule.destination}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tanggal:</span>
                  <span className="font-medium">
                    {formatDate(departureDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Jam Keberangkatan:
                  </span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {departureTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Operator:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {schedule.operator}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Total Pembayaran</h3>
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    {formatCurrency(schedule.price)}
                  </span>
                </div>
                <div className="text-sm text-green-600 mt-1">
                  ✓ Pembayaran berhasil dikonfirmasi
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">
                Instruksi Penting:
              </h4>
              <ul className="text-sm text-blue-700 space-y-1 list-disc mx-8">
                <li>Simpan Booking ID ini sebagai bukti pemesanan</li>
                <li>Tiba di lokasi keberangkatan 15 menit sebelum jadwal</li>
                <li>Bawa identitas diri yang valid (KTP/SIM/Paspor)</li>
                <li>Tunjukkan Booking ID kepada petugas saat check-in</li>
                <li>Hubungi customer service jika ada pertanyaan</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-white cursor-pointer"
                onClick={() => window.print()}
              >
                <Download className="w-4 h-4 mr-2" />
                Cetak Tiket
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-white cursor-pointer"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Booking Shuttle Berhasil",
                      text: `Booking ID: ${bookingId} - ${schedule.origin} ke ${schedule.destination}`,
                    });
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
              <Button onClick={onNewSearch} className="flex-1 cursor-pointer">
                Booking Lagi
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="mt-6 bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium mb-2">Butuh Bantuan?</p>
            <p>
              Customer Service 24/7:{" "}
              <span className="font-medium text-primary">0800-1234-5678</span>
            </p>
            <p>
              Email:{" "}
              <span className="font-medium text-primary">
                support@shuttlebooking.com
              </span>
            </p>
            <p className="mt-2 text-xs">
              Booking ID:{" "}
              <span className="font-mono font-medium">{bookingId}</span> -
              Simpan untuk referensi
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

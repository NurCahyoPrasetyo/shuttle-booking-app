"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SelectedTrip } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import {
  ArrowLeft,
  Building2,
  Clock,
  CreditCard,
  MapPin,
  User,
} from "lucide-react";

interface BookingSummaryProps {
  selectedTrip: SelectedTrip;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingSummary({
  selectedTrip,
  onConfirm,
  onBack,
}: BookingSummaryProps) {
  const { schedule, departureTime, passengerName, departureDate } =
    selectedTrip;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header with back button */}
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Shuttle
        </Button>
      </div>

      {/* Main summary card */}
      <Card className="shadow-lg">
        <CardHeader className="text-center bg-primary/5">
          <CardTitle className="text-2xl font-bold text-primary">
            Ringkasan Pemesanan
          </CardTitle>
          <p className="text-muted-foreground">
            Periksa kembali detail perjalanan Anda
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Passenger Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informasi Penumpang
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
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
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rute:</span>
                  <span className="font-medium">
                    {schedule.origin} → {schedule.destination}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Tanggal Keberangkatan:
                  </span>
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
              </div>
            </div>

            <Separator />

            {/* Operator Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Operator Shuttle
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-lg">
                      {schedule.operator}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Operator Shuttle Terpercaya
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Price Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Rincian Harga
              </h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Harga Tiket (1 penumpang):
                  </span>
                  <span className="font-medium">
                    {formatCurrency(schedule.price)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Biaya Admin:</span>
                  <span className="font-medium">Gratis</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total Pembayaran:</span>
                  <span className="text-primary">
                    {formatCurrency(schedule.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-800 mb-2">
                Catatan Penting:
              </h4>
              <ul className="text-sm text-amber-700 space-y-1 list-disc mx-8">
                <li>
                  Harap tiba di lokasi keberangkatan 15 menit sebelum jadwal
                </li>
                <li>Bawa identitas diri yang valid (KTP/SIM/Paspor)</li>
                <li>Tiket yang sudah dikonfirmasi tidak dapat dibatalkan</li>
                <li>Bagasi maksimal 20kg per penumpang</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="flex-1 bg-transparent py-6 text-lg font-semibold cursor-pointer"
              >
                Ubah Pilihan
              </Button>
              <Button
                onClick={onConfirm}
                className="flex-1 py-6 text-lg font-semibold cursor-pointer"
              >
                Konfirmasi Booking
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card className="mt-6 bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium mb-2">Butuh Bantuan?</p>
            <p>
              Hubungi customer service kami di{" "}
              <span className="font-medium text-primary">0800-1234-5678</span>{" "}
              atau email{" "}
              <span className="font-medium text-primary">
                support@shuttlebooking.com
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

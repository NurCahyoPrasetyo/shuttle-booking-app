"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SearchFormData } from "@/lib/types";
import { getTodayISO } from "@/lib/utils/date";
import { Calendar, Loader2, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading: boolean;
  error: string | null;
}

const cities = ["Jakarta", "Bandung", "Surabaya"];

export function SearchForm({ onSearch, isLoading, error }: SearchFormProps) {
  const [formData, setFormData] = useState<SearchFormData>({
    passengerName: "",
    origin: "",
    destination: "",
    departureDate: "",
  });

  const [errors, setErrors] = useState<Partial<SearchFormData>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("shuttleSearchData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error("Failed to parse saved search data:", error);
      }
    }
  }, []);

  // Save to localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem("shuttleSearchData", JSON.stringify(formData));
  }, [formData]);

  // Validate form whenever data changes
  useEffect(() => {
    const newErrors: Partial<SearchFormData> = {};

    if (!formData.passengerName.trim()) {
      newErrors.passengerName = "Nama penumpang wajib diisi";
    }

    if (!formData.origin) {
      newErrors.origin = "Kota asal wajib dipilih";
    }

    if (!formData.destination) {
      newErrors.destination = "Kota tujuan wajib dipilih";
    } else if (formData.origin === formData.destination) {
      newErrors.destination = "Kota tujuan harus berbeda dengan kota asal";
    }

    if (!formData.departureDate) {
      newErrors.departureDate = "Tanggal keberangkatan wajib dipilih";
    } else if (formData.departureDate < getTodayISO()) {
      newErrors.departureDate =
        "Tanggal keberangkatan tidak boleh di masa lalu";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleInputChange = (field: keyof SearchFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOriginChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      origin: value,
      // Reset destination if it's the same as new origin
      destination: prev.destination === value ? "" : prev.destination,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && !isLoading) {
      onSearch(formData);
    }
  };

  const getAvailableDestinations = () => {
    return cities.filter((city) => city !== formData.origin);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Cari Shuttle
          </CardTitle>
          <CardDescription>
            Isi form di bawah untuk mencari jadwal shuttle yang tersedia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passenger Name */}
            <div className="space-y-2">
              <Label
                htmlFor="passengerName"
                className="flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Nama Penumpang
              </Label>
              <Input
                id="passengerName"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.passengerName}
                onChange={(e) =>
                  handleInputChange("passengerName", e.target.value)
                }
                className={errors.passengerName ? "border-destructive" : ""}
                aria-describedby={
                  errors.passengerName ? "passengerName-error" : undefined
                }
              />
              {errors.passengerName && (
                <p
                  id="passengerName-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.passengerName}
                </p>
              )}
            </div>

            {/* Origin and Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Kota Asal
                </Label>
                <Select
                  value={formData.origin}
                  onValueChange={handleOriginChange}
                >
                  <SelectTrigger
                    id="origin"
                    className={errors.origin ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Pilih kota asal" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.origin && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.origin}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="destination"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Kota Tujuan
                </Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) =>
                    handleInputChange("destination", value)
                  }
                  disabled={!formData.origin}
                >
                  <SelectTrigger
                    id="destination"
                    className={errors.destination ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Pilih kota tujuan" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDestinations().map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.destination}
                  </p>
                )}
              </div>
            </div>

            {/* Departure Date */}
            <div className="space-y-2">
              <Label
                htmlFor="departureDate"
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Tanggal Keberangkatan
              </Label>
              <Input
                id="departureDate"
                type="date"
                min={getTodayISO()}
                value={formData.departureDate}
                onChange={(e) =>
                  handleInputChange("departureDate", e.target.value)
                }
                className={errors.departureDate ? "border-destructive" : ""}
                aria-describedby={
                  errors.departureDate ? "departureDate-error" : undefined
                }
              />
              {errors.departureDate && (
                <p
                  id="departureDate-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.departureDate}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-6 text-lg font-semibold"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Mencari Shuttle...
                </>
              ) : (
                "Cari Shuttle"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

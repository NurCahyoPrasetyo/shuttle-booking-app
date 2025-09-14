"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Building2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils/currency"
import { formatDate } from "@/lib/utils/date"
import type { ShuttleSchedule, SearchFormData } from "@/lib/types"

interface ShuttleListProps {
  schedules: ShuttleSchedule[]
  searchData: SearchFormData
  onSelectTrip: (schedule: ShuttleSchedule, departureTime: string) => void
  onBackToSearch: () => void
}

export function ShuttleList({ schedules, searchData, onSelectTrip, onBackToSearch }: ShuttleListProps) {
  if (schedules.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={onBackToSearch} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Pencarian
          </Button>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Tidak Ada Shuttle Tersedia</h3>
                <p className="text-muted-foreground mt-2">
                  Maaf, tidak ada shuttle yang tersedia untuk rute{" "}
                  <span className="font-medium">{searchData.origin}</span> →{" "}
                  <span className="font-medium">{searchData.destination}</span> pada tanggal yang dipilih.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Silakan coba dengan tanggal lain atau rute yang berbeda.
                </p>
              </div>
              <Button onClick={onBackToSearch} className="mt-4">
                Coba Pencarian Lain
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with search info and back button */}
      <div className="mb-6">
        <Button variant="outline" onClick={onBackToSearch} className="flex items-center gap-2 mb-4 bg-transparent">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pencarian
        </Button>

        <Card className="bg-card">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{searchData.origin}</span>
                  <span className="text-muted-foreground">→</span>
                  <span>{searchData.destination}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatDate(searchData.departureDate)}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Penumpang: <span className="font-medium">{searchData.passengerName}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results header */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground">Shuttle Tersedia ({schedules.length} operator)</h2>
        <p className="text-muted-foreground">Pilih jadwal keberangkatan yang sesuai</p>
      </div>

      {/* Shuttle list */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{schedule.operator}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {schedule.origin} → {schedule.destination}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{formatCurrency(schedule.price)}</div>
                  <div className="text-sm text-muted-foreground">per penumpang</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Jadwal Keberangkatan:</h4>
                  <div className="flex flex-wrap gap-2">
                    {schedule.departures.map((time) => (
                      <Badge
                        key={time}
                        variant="outline"
                        className="px-3 py-1 text-sm font-medium cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => onSelectTrip(schedule, time)}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex flex-wrap gap-2">
                    {schedule.departures.map((time) => (
                      <Button
                        key={time}
                        onClick={() => onSelectTrip(schedule, time)}
                        className="flex-1 min-w-[120px]"
                        size="sm"
                      >
                        Pilih {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer info */}
      <Card className="mt-8 bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="font-medium mb-2">Informasi Penting:</p>
            <ul className="space-y-1 text-left max-w-2xl mx-auto">
              <li>• Harap tiba di lokasi keberangkatan 15 menit sebelum jadwal</li>
              <li>• Tiket yang sudah dibeli tidak dapat dibatalkan atau diubah</li>
              <li>• Pastikan membawa identitas diri yang valid</li>
              <li>• Bagasi maksimal 20kg per penumpang</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

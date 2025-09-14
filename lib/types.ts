export interface ShuttleSchedule {
  id: string
  operator: string
  origin: string
  destination: string
  departures: string[]
  price: number
}

export interface SearchFormData {
  passengerName: string
  origin: string
  destination: string
  departureDate: string
}

export interface SelectedTrip {
  schedule: ShuttleSchedule
  departureTime: string
  passengerName: string
  departureDate: string
}

export interface BookingState {
  searchData: SearchFormData | null
  availableSchedules: ShuttleSchedule[]
  selectedTrip: SelectedTrip | null
  isLoading: boolean
  error: string | null
}

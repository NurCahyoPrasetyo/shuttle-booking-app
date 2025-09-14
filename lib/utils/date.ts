export function getTodayISO(): string {
  const today = new Date()
  const jakartaTime = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
  return jakartaTime.toISOString().split("T")[0]
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

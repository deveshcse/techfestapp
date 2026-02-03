export type TechFestStatus = "upcoming" | "ongoing" | "ended"

export function getTechFestStatus(
  startDate: Date,
  endDate: Date,
  now: Date = new Date()
): TechFestStatus {
  if (now < startDate) return "upcoming"
  if (now > endDate) return "ended"
  return "ongoing"
}

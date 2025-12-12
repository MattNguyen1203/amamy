import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get tomorrow's date as default
export const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}

// Format weekday as "Thứ X" (e.g., "Thứ 5" instead of "Thứ Năm")
export const formatWeekday = (date: Date) => {
  const dayOfWeek = date.getDay()
  // getDay() returns: 0 = Sunday, 1 = Monday, 2 = Tuesday, ..., 6 = Saturday
  // Convert to Vietnamese format: Chủ nhật = Thứ 8, Thứ 2 = Thứ 2, ..., Thứ 7 = Thứ 7
  if (dayOfWeek === 0) {
    return 'Chủ nhật'
  }
  return `Thứ ${dayOfWeek + 1}`
}

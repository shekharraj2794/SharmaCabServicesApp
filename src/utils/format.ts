export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export interface DayOption {
  iso: string;
  dayName: string;
  dayNum: number;
  month: string;
  label: string;
}

export function nextDays(count: number): DayOption[] {
  const out: DayOption[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    out.push({
      iso,
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : DAY_NAMES[d.getDay()],
      dayNum: d.getDate(),
      month: MONTH_NAMES[d.getMonth()],
      label: `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
    });
  }
  return out;
}

export const timeSlots = [
  '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM',
  '10:00 PM', 'Late night',
];

export function formatDateISO(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) {
    return iso;
  }
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

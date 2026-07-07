import { estimateFare, promoDiscount } from '../src/services/bookings';
import { formatINR, nextDays } from '../src/utils/format';
import { vehicles } from '../src/data/vehicles';

jest.mock('react-native-mmkv', () => ({
  createMMKV: jest.fn(() => ({
    getString: jest.fn(),
    set: jest.fn(),
    getBoolean: jest.fn(),
    remove: jest.fn(),
    clearAll: jest.fn(),
  })),
}));

jest.mock('react-native', () => ({
  Alert: { alert: jest.fn() },
  Linking: { openURL: jest.fn() },
}));

describe('fare estimation', () => {
  const dzire = vehicles[0];

  it('respects the minimum trip distance', () => {
    expect(estimateFare(dzire, 5, 'oneWay')).toBe(
      Math.round((dzire.minKm * dzire.perKmRate) / 10) * 10,
    );
  });

  it('discounts round trips against double fare', () => {
    const oneWay = estimateFare(dzire, 100, 'oneWay');
    const round = estimateFare(dzire, 100, 'roundTrip');
    expect(round).toBeLessThan(oneWay * 2);
    expect(round).toBeGreaterThan(oneWay);
  });

  it('applies valid promo codes only', () => {
    const base = estimateFare(dzire, 100, 'oneWay');
    expect(estimateFare(dzire, 100, 'oneWay', 'SHARMA10')).toBeLessThan(base);
    expect(estimateFare(dzire, 100, 'oneWay', 'NOPE')).toBe(base);
  });
});

describe('promo codes', () => {
  it('recognises known codes case-insensitively', () => {
    expect(promoDiscount('sharma10')).toBe(0.1);
    expect(promoDiscount('UNKNOWN')).toBeUndefined();
  });
});

describe('formatting', () => {
  it('formats INR with locale separators', () => {
    expect(formatINR(1234)).toBe('₹1,234');
  });

  it('produces sequential day options starting today', () => {
    const days = nextDays(3);
    expect(days).toHaveLength(3);
    expect(days[0].dayName).toBe('Today');
  });
});

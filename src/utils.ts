import type { PhoneSeries } from './types';

export const PHONE_SERIES: readonly PhoneSeries[] = ['Jaguar', 'Leopard', 'Lion'] as const;

export function pickRandomPhoneSeries(rng: () => number = Math.random): PhoneSeries {
  const idx = Math.floor(rng() * PHONE_SERIES.length);
  return PHONE_SERIES[idx] ?? 'Jaguar';
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

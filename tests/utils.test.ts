import { PHONE_SERIES, pickRandomPhoneSeries } from '../src/utils';

describe('pickRandomPhoneSeries', () => {
  test('returns a valid series', () => {
    const v = pickRandomPhoneSeries(() => 0.1);
    expect(PHONE_SERIES).toContain(v);
  });

  test('is deterministic with custom rng', () => {
    expect(pickRandomPhoneSeries(() => 0)).toBe('Jaguar');
    expect(pickRandomPhoneSeries(() => 0.51)).toBe('Leopard');
    expect(pickRandomPhoneSeries(() => 0.99)).toBe('Lion');
  });
});

import { Customer } from '../src/customer';
import { ServiceCenter } from '../src/serviceCenter';
import { Technician } from '../src/technician';
import type { PhoneSeries } from '../src/types';

describe('ServiceCenter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'table').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
    (console.log as unknown as jest.Mock).mockRestore();
    (console.table as unknown as jest.Mock).mockRestore();
  });

  test('processes all customers and records who repaired what', async () => {
    const series: PhoneSeries[] = ['Leopard', 'Lion', 'Jaguar', 'Jaguar', 'Leopard', 'Lion', 'Jaguar', 'Leopard', 'Lion', 'Jaguar'];
    const customers = series.map((s, i) => new Customer(`Customer ${i}`, s));

    const dalton = new Technician('Dalton', 1); // 1s
    const wapol = new Technician('Wapol', 2); // 2s

    const sc = new ServiceCenter('First Service Center', 'Long Ring Long Land Street', [dalton, wapol], customers);

    const promise = sc.startOperating();

    // Run all scheduled timers (repairs) to completion
    await jest.runAllTimersAsync();

    const log = await promise;

    expect(log).toHaveLength(10);

    const byCustomer = new Map(log.map((e) => [e.customerName, e]));

    // First queue assignment must always be: Customer 0 -> Dalton, Customer 1 -> Wapol
    expect(byCustomer.get('Customer 0')?.phoneRepairedBy).toBe('Dalton');
    expect(byCustomer.get('Customer 1')?.phoneRepairedBy).toBe('Wapol');

    // Every customer must appear exactly once
    for (let i = 0; i < 10; i++) {
      expect(byCustomer.has(`Customer ${i}`)).toBe(true);
    }

    // Technicians in log should be only Dalton or Wapol
    const techs = new Set(log.map((e) => e.phoneRepairedBy));
    expect(techs).toEqual(new Set(['Dalton', 'Wapol']));
  });
});

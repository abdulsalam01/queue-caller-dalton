"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customer_1 = require("../src/customer");
const serviceCenter_1 = require("../src/serviceCenter");
const technician_1 = require("../src/technician");
describe('ServiceCenter', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(console, 'log').mockImplementation(() => undefined);
        jest.spyOn(console, 'table').mockImplementation(() => undefined);
    });
    afterEach(() => {
        jest.useRealTimers();
        console.log.mockRestore();
        console.table.mockRestore();
    });
    test('processes all customers and records who repaired what', async () => {
        const series = ['Leopard', 'Lion', 'Jaguar', 'Jaguar', 'Leopard', 'Lion', 'Jaguar', 'Leopard', 'Lion', 'Jaguar'];
        const customers = series.map((s, i) => new customer_1.Customer(`Customer ${i}`, s));
        const dalton = new technician_1.Technician('Dalton', 1); // 1s
        const wapol = new technician_1.Technician('Wapol', 2); // 2s
        const sc = new serviceCenter_1.ServiceCenter('First Service Center', 'Long Ring Long Land Street', [dalton, wapol], customers);
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
describe('pickRandomPhoneSeries', () => {
    test('returns a valid series', () => {
        const v = (0, utils_1.pickRandomPhoneSeries)(() => 0.1);
        expect(utils_1.PHONE_SERIES).toContain(v);
    });
    test('is deterministic with custom rng', () => {
        expect((0, utils_1.pickRandomPhoneSeries)(() => 0)).toBe('Jaguar');
        expect((0, utils_1.pickRandomPhoneSeries)(() => 0.51)).toBe('Leopard');
        expect((0, utils_1.pickRandomPhoneSeries)(() => 0.99)).toBe('Lion');
    });
});

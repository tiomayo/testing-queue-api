const db = require('./../db')
const service = require('../../src/services/queue.service')

beforeAll(async () => await db.open())
afterEach(async () => await db.clear())
afterAll(async () => await db.close())

describe('Queue Services test', () => {
    describe('getQueue', () => {
        it('Should get new queue number', () => {
            service.get().then(result => {
                expect(result).toHaveProperty('antrian');
                expect(result).toHaveProperty('tanggal');
                expect(result.antrian).toBe('A001');
                expect(new Date(result.tanggal).toISOString().slice(0,10)).toBe(new Date().toISOString().slice(0,10));
            });
        });
    });
});
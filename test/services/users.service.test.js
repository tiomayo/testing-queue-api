const db = require('./../db')
const service = require('../../src/services/users.service')

beforeAll(async () => await db.open())
afterAll(async () => await db.close())

describe('Users Services test', () => {
    describe('getUserList', () => {
        it('Should get empty user list', () => {
            service.getMultiple().then(result => {
                expect(result).toHaveProperty('data');
                expect(result).toHaveProperty('meta');
                expect(result.data).toStrictEqual([]);
                expect(result.meta).toStrictEqual({page: 1});
            });
        });
    });

    describe('createUser', () => {
        it('Should create user', () => {
            var userData = {
                nik: '123',
                name: 'test',
                email: 'email.test@test.test',
                age: 30,
                address: 'address'
            }
            service.create(userData).then(result => {
                expect(result.success).toEqual(true);
                expect(result.user.nik).toEqual(userData.nik);
            });
        });
    });
});
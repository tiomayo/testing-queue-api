const helper = require('../../src/utils/helper.util')

describe('Helper Utils test', () => {
    describe('getOffset', () => {
        it('Should get the offset without params will return 0', () => {
            expect(helper.getOffset()).toBe(0);

        });
        it('Should get the offset 0 for page 1 with 10 items per page', () => {
            expect(helper.getOffset(1, 10)).toBe(0);

        });
        it('Should get the offset 11 for page 2 with 10 items per page', () => {
            expect(helper.getOffset(2, 10)).toBe(10);
        });
    });

    describe('emptyOrRows', () => {
        it('Should get empty array if rows is empty', () => {
            expect(helper.emptyOrRows()).toEqual([]);

        });
        it('Should get arrary if rows is filled', () => {
            expect(helper.emptyOrRows([1])).toEqual([1]);

        });
    });

    describe('addLeadingZeros', () => {
        it('Should get three digit number without params', () => {
            expect(helper.addLeadingZeros(1)).toBe('001');
        });
        it('Should get three digit number if the input is two digit', () => {
            expect(helper.addLeadingZeros(23)).toBe('023');
        });
        it('Should get same digit number as the length input', () => {
            expect(helper.addLeadingZeros(2, 4)).toBe('0002');
            expect(helper.addLeadingZeros(2, 5)).toBe('00002');
        });
    })
});
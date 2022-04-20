import { Boleto } from '../../src/domain/models';

describe('Boleto', () => {

  let barCode: string;

  beforeAll(() => {
    barCode = '00193373700000001000500940144816060680935031';
  });
  it('should Boleto.expirationDate returns a date', () => {
    const dateReturned = new Date('2017-12-11T02:00:00.000Z');
    const result = Boleto.expirationDate(barCode);
    expect(result).toEqual(dateReturned);
  });

  it('should Boleto.value returns a number', () => {
    const result = Boleto.value(barCode);
    expect(result).toEqual(1);

  });
});

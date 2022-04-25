import { Boleto } from '../../src/domain/models';

describe('Boleto', () => {

  let barCode: string;

  beforeAll(() => {
    barCode = '00193373700000001000500940144816060680935031';
  });

  it('should value returns a number', () => {
    const result = Boleto.value(barCode);
    expect(result).toEqual(1);

  });
});

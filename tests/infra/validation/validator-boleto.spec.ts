import { ValidatorBoleto } from '../../../src/infra/validation/validator-boleto';

describe('ValidationBoleto', () => {
  let sut: ValidatorBoleto;
  let digitalLine: string;

  beforeAll(() => {
    digitalLine = '00190500954014481606906809350314337370000000100';
  });

  beforeEach(() => {
    sut = new ValidatorBoleto();
  });


  it('should ValidationBarcodeContainsOnlyNumber returns true', async () => {
    const result = await sut.validatorBarcodeOnlyNumber({ digitalLine });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeContainsOnlyNumber returns false', async () => {
    const result = await sut.validatorBarcodeOnlyNumber({ digitalLine: `${digitalLine}A` });
    expect(result).toBe(false);
  });


  it('should ValidationBarcodeSize returns true', async () => {
    const result = await sut.validatorBarcodeSize({ digitalLine });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeContainsOnlyNumber returns false', async () => {
    const barCodeFormat = digitalLine.slice(0, 40);
    const result = await sut.validatorBarcodeSize({ digitalLine: barCodeFormat });
    expect(result).toBe(false);
  });


  it('should ValidationBarcodeDigitVerifier returns true', async () => {
    const result = await sut.validateDigitVerifier({ barCode: '00193373700000001000500940144816060680935031' });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeDigitVerifier returns false', async () => {
    const barCodeFormat = digitalLine.split(' ');
    barCodeFormat[4] = '1';
    const result = await sut.validateDigitVerifier({ barCode: barCodeFormat.join('') });
    expect(result).toBe(false);
  });

});

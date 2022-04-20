import { ValidatorBoleto } from '../../../src/infra/validation/validator-boleto';

describe('ValidationBoleto', () => {
  let sut: ValidatorBoleto;
  let barCode: string;

  beforeAll(() => {
    barCode = '00193373700000001000500940144816060680935031';
  });

  beforeEach(() => {
    sut = new ValidatorBoleto();
  });


  it('should ValidationBarcodeContainsOnlyNumber returns true', async () => {
    const result = await sut.validatorBarcodeOnlyNumber({ barCode });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeContainsOnlyNumber returns false', async () => {
    const result = await sut.validatorBarcodeOnlyNumber({ barCode: `${barCode}A` });
    expect(result).toBe(false);
  });


  it('should ValidationBarcodeSize returns true', async () => {
    const result = await sut.validatorBarcodeSize({ barCode });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeContainsOnlyNumber returns false', async () => {
    const barCodeFormat = barCode.slice(0, 40);
    const result = await sut.validatorBarcodeSize({ barCode: barCodeFormat });
    expect(result).toBe(false);
  });


  it('should ValidationBarcodeDigitVerifier returns true', async () => {
    const result = await sut.validateDigitVerifier({ barCode });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeDigitVerifier returns false', async () => {
    const barCodeFormat = barCode.split(' ');
    barCodeFormat[4] = '1';
    const result = await sut.validateDigitVerifier({ barCode: barCodeFormat.join('') });
    expect(result).toBe(false);
  });

});

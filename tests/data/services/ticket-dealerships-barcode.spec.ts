import { TickerDealershipsBarcodeService } from '../../../src/data/services';
import { MockProxy, mock } from 'jest-mock-extended';

import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeDigitVerifierTicketsDealerships, ValidationBarcodeSize } from '../../../src/data/contracts/validation';
import { ValidationError } from '../../../src/domain/errors/validation';

describe('TicketDealershipsBarcode', () => {
  let sut: TickerDealershipsBarcodeService;
  let validation: MockProxy<ValidationBarcodeContainsOnlyNumber & ValidationBarcodeSize>;
  let calculationModule: MockProxy<ValidationBarcodeDigitVerifierTicketsDealerships>;

  let digitalLine: string;

  beforeAll(() => {
    digitalLine = '856900000584030100649158110347945609001374691358';
    validation = mock();
    calculationModule = mock();


    validation.validatorBarcodeSize.mockResolvedValue(true);
    validation.validatorBarcodeOnlyNumber.mockResolvedValue(true);
    calculationModule.validateDigitVerifier.mockResolvedValue(true);

  });
  beforeEach(() => {
    sut = new TickerDealershipsBarcodeService(validation, calculationModule);
  });
  it('should call TicketDealershipsBarcode with correct parameters', async () => {
    const spy = jest.spyOn(sut, 'execute');
    await sut.execute({ digitalLine });
    expect(spy).toHaveBeenCalledWith({ digitalLine });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call ValidationBarcodeContainsOnlyNumber with correct parameters', async () => {
    const spy = jest.spyOn(validation, 'validatorBarcodeOnlyNumber');
    await sut.execute({ digitalLine });
    expect(spy).toHaveBeenCalledWith({ digitalLine });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return ValidationError when ValidationBarcodeContainsOnlyNumber returns false', async () => {
    validation.validatorBarcodeOnlyNumber.mockResolvedValueOnce(false);
    const authResult = sut.execute({ digitalLine });
    await expect(authResult).rejects.toThrow(new ValidationError('Barcode not contains only number'));
  });


  it('should call ValidationBarcodeSize with correct parameters', async () => {
    const spy = jest.spyOn(validation, 'validatorBarcodeSize');
    await sut.execute({ digitalLine });
    expect(spy).toHaveBeenCalledWith({ digitalLine });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return ValidationError when ValidationBarcodeSize returns false', async () => {
    validation.validatorBarcodeSize.mockResolvedValueOnce(false);
    const authResult = sut.execute({ digitalLine });
    await expect(authResult).rejects.toThrow(new ValidationError('Barcode size is invalid. Size must be 47'));
  });
});

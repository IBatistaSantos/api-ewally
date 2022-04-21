import { MockProxy, mock } from 'jest-mock-extended';

import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeDigitVerifier, ValidationBarcodeSize } from '../../../src/data/contracts/validation';
import { BankBondsBarcodeService } from '../../../src/data/services';
import { ValidationError } from '../../../src/domain/errors/validation';
import { Boleto } from '../../../src/domain/models';

describe('BankBondsBarcode', () => {
  let sut: BankBondsBarcodeService;
  let validation: MockProxy<ValidationBarcodeContainsOnlyNumber & ValidationBarcodeSize & ValidationBarcodeDigitVerifier >;

  let digitalLine: string;

  beforeAll(() => {
    digitalLine = '00190500954014481606906809350314337370000000100';
    validation = mock();


    validation.validatorBarcodeSize.mockResolvedValue(true);
    validation.validatorBarcodeOnlyNumber.mockResolvedValue(true);
    validation.validateDigitVerifier.mockResolvedValue(true);
  });
  beforeEach(() => {
    sut = new BankBondsBarcodeService(validation);
  });
  it('should call InformationBoletoService with correct parameters', async () => {
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

  it('should call ValidationBarcodeDigitVerifier with correct parameters', async () => {
    const spy = jest.spyOn(validation, 'validateDigitVerifier');
    await sut.execute({ digitalLine });
    expect(spy).toHaveBeenCalledWith({ barCode: '00193373700000001000500940144816060680935031' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return ValidationError when ValidationBarcodeDigitVerifier returns false', async () => {
    validation.validateDigitVerifier.mockResolvedValueOnce(false);
    const authResult =  sut.execute({ digitalLine });
    await expect(authResult).rejects.toThrow(new ValidationError('Barcode digit verifier is invalid'));
  });

  it('should return ValidationError when Boleto value is less than zero', async () => {
    jest.spyOn(Boleto, 'value').mockReturnValueOnce(-1);
    const authResult =  sut.execute({ digitalLine });
    await expect(authResult).rejects.toThrow(new ValidationError('Barcode value is invalid'));

  });

  it('should return an AccessToken on success', async () => {
    const authResult = await sut.execute({ digitalLine });
    const result = {
      expirationDate: new Date('2017-12-11T02:00:00.000Z'),
      value: 1,
      barCode:'00193373700000001000500940144816060680935031',
    };

    expect(authResult).toEqual(result);
  });


});

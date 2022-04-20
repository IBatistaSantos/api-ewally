import { ValidationError } from '../../domain/errors/validation';
import { InformationBoleto } from '../../domain/features';
import { Boleto } from '../../domain/models/boleto';
import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeSize, ValidationBarcodeDigitVerifier } from '../contracts/validation';


export  class InformationBoletoService implements InformationBoleto {

  constructor(
    private readonly validation: ValidationBarcodeContainsOnlyNumber & ValidationBarcodeSize & ValidationBarcodeDigitVerifier,
  ) { }


  async execute(params: InformationBoleto.Params): Promise<InformationBoleto.Result> {
    const { barCode } = params;

    const isBarcodeContainsOnlyNumber = await this.validation.validatorBarcodeOnlyNumber({ barCode });

    if (!isBarcodeContainsOnlyNumber) {
      throw new ValidationError('Barcode not contains only number');
    }

    const isValidSizeBarcode = await this.validation.validatorBarcodeSize({ barCode });

    if (!isValidSizeBarcode) {
      throw new ValidationError('Barcode size is invalid. Size must be 44');
    }

    const validDigigVerifierBarcode = await this.validation.validateDigitVerifier({ barCode });

    if (!validDigigVerifierBarcode) {
      throw new ValidationError('Barcode digit verifier is invalid');
    }

    const valueValid = Boleto.value(barCode) < 1;

    if (valueValid) {
      throw new ValidationError('Barcode value is invalid');
    }

    return {
      expirationDate: Boleto.expirationDate(barCode),
      value: Boleto.value(barCode),
      barCode,
    };
  }
}

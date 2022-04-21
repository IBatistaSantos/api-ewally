import { ValidationError } from '../../domain/errors/validation';
import { BankBondsBarcode } from '../../domain/features';
import { Barcode } from '../../domain/models/barcode';
import { Boleto } from '../../domain/models/boleto';
import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeSize, ValidationBarcodeDigitVerifier } from '../contracts/validation';


export  class BankBondsBarcodeService implements BankBondsBarcode {

  constructor(
    private readonly validation: ValidationBarcodeContainsOnlyNumber & ValidationBarcodeSize & ValidationBarcodeDigitVerifier,
  ) { }

  async execute(params: BankBondsBarcode.Params): Promise<BankBondsBarcode.Result> {
    const { digitalLine } = params;

    const isBarcodeContainsOnlyNumber = await this.validation.validatorBarcodeOnlyNumber({ digitalLine });

    if (!isBarcodeContainsOnlyNumber) {
      throw new ValidationError('Barcode not contains only number');
    }

    const isValidSizeBarcode = await this.validation.validatorBarcodeSize({ digitalLine });

    if (!isValidSizeBarcode) {
      throw new ValidationError('Barcode size is invalid. Size must be 47');
    }

    const generateBarcode = Barcode.generateBarcode(digitalLine);

    const validDigigVerifierBarcode = await this.validation.validateDigitVerifier({ barCode: generateBarcode });

    if (!validDigigVerifierBarcode) {
      throw new ValidationError('Barcode digit verifier is invalid');
    }

    const valueValid = Boleto.value(generateBarcode) < 1;

    if (valueValid) {
      throw new ValidationError('Barcode value is invalid');
    }

    return {
      expirationDate: Boleto.expirationDate(generateBarcode),
      value: Boleto.value(generateBarcode),
      barCode: generateBarcode,
    };
  }
}

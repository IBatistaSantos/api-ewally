import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeSize, ValidationBarcodeDigitVerifier } from '../../data/contracts/validation';


export class ValidatorBoleto implements
ValidationBarcodeContainsOnlyNumber,
ValidationBarcodeSize,
ValidationBarcodeDigitVerifier {
  async validateDigitVerifier(params: ValidationBarcodeDigitVerifier.Params): Promise<ValidationBarcodeDigitVerifier.Result> {
    const { barCode } = params;
    const array = barCode.split('');
    const digitVerifierRequest = Number(array[4]);

    array.splice(4, 1);
    array.reverse();

    let multiplier = 2;
    let result = 0;
    for (let i = 0; i < array.length; i++) {
      if (multiplier > 9) {
        multiplier = 2;
      }
      result += parseInt(array[i]) * multiplier;
      multiplier++;
    }

    const restOfDivision = result % 11;
    const digitVerifier = 11 - restOfDivision;

    return digitVerifierRequest === digitVerifier;


  }

  async validatorBarcodeSize(params: ValidationBarcodeSize.Params): Promise<ValidationBarcodeSize.Result> {
    const { barCode } = params;
    return barCode.length === 44;
  }

  async validatorBarcodeOnlyNumber(params: ValidationBarcodeContainsOnlyNumber.Params):
  Promise<ValidationBarcodeContainsOnlyNumber.Result> {
    const { barCode } = params;
    return !!barCode.match(/^[0-9]*$/);
  }
}

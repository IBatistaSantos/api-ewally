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

    const result = array.reduce((acc, current) => {
      const soma = Number(current) * multiplier;
      multiplier = multiplier === 9 ? 2 : multiplier + 1;
      return acc + soma;
    }, 0);

    const restOfDivision = result % 11;
    const digitVerifier = 11 - restOfDivision;

    return digitVerifierRequest === digitVerifier;

  }

  async validatorBarcodeSize(params: ValidationBarcodeSize.Params): Promise<ValidationBarcodeSize.Result> {
    const { digitalLine } = params;
    return digitalLine.length >= 47;
  }

  async validatorBarcodeOnlyNumber(params: ValidationBarcodeContainsOnlyNumber.Params):
  Promise<ValidationBarcodeContainsOnlyNumber.Result> {
    const { digitalLine } = params;
    return !!digitalLine.match(/^[0-9]*$/);
  }
}

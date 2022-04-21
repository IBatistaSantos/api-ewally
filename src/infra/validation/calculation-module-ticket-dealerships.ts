import { ValidationBarcodeDigitVerifierTicketsDealerships } from '../../data/contracts/validation';

export class  CalculationModuleDigitVerifierDealerships implements  ValidationBarcodeDigitVerifierTicketsDealerships {
  async validateDigitVerifier(params: ValidationBarcodeDigitVerifierTicketsDealerships.Params): Promise<boolean> {
    const { barCode, module } = params;

    if (module === 'modulo10') {
      return this.calculationModulo10(barCode);
    } else if (module === 'modulo11') {
      return this.calculationModulo11(barCode);
    }

    return false;
  }

  private async calculationModulo10(barCode: string): Promise<boolean> {
    const barCodeArray = this.formatBarCodeModulo10(barCode);


    const groupOneBarcode = barCodeArray[0];
    const digitVerifierGroupOne = Number(barCodeArray[1]);
    const groupTwoBarcode = barCodeArray[2];
    const digitVerifierGroupTwo = Number(barCodeArray[3]);
    const groupThreeBarcode = barCodeArray[4];
    const digitVerifierGroupThree = Number(barCodeArray[5]);
    const groupFourBarcode = barCodeArray[6];
    const digitVerifierGroupFour = Number(barCodeArray[7]);


    const validationAllGroupsBarcode = await Promise.all([
      this.calculationFieldModulo10Barcode(groupOneBarcode, digitVerifierGroupOne),
      this.calculationFieldModulo10Barcode(groupTwoBarcode, digitVerifierGroupTwo),
      this.calculationFieldModulo10Barcode(groupThreeBarcode, digitVerifierGroupThree),
      this.calculationFieldModulo10Barcode(groupFourBarcode, digitVerifierGroupFour),
    ]);


    return validationAllGroupsBarcode.every(item => item === true);

  }

  private async calculationModulo11(barCode: string): Promise<boolean> {
    const barCodeArray = this.formatBarCodeModulo11(barCode);


    const groupOneBarcode = barCodeArray[0];
    const digitVerifierGroupOne = Number(barCodeArray[1]);
    const groupTwoBarcode = barCodeArray[2];
    const digitVerifierGroupTwo = Number(barCodeArray[3]);
    const groupThreeBarcode = barCodeArray[4];
    const digitVerifierGroupThree = Number(barCodeArray[5]);
    const groupFourBarcode = barCodeArray[6];
    const digitVerifierGroupFour = Number(barCodeArray[7]);

    const validations = await Promise.all([
      this.calculationFieldModulo11Barcode(groupOneBarcode, digitVerifierGroupOne),
      this.calculationFieldModulo11Barcode(groupTwoBarcode, digitVerifierGroupTwo),
      this.calculationFieldModulo11Barcode(groupThreeBarcode, digitVerifierGroupThree),
      this.calculationFieldModulo11Barcode(groupFourBarcode, digitVerifierGroupFour),
    ]);

    return validations.every(item => item === true);

  }

  private calculationFieldModulo10Barcode(group: string, digit: number): boolean {
    let multiplier = 2;
    const validatorDigit = group.split('').reduce((acc, current) => {
      let soma = Number(current) * multiplier;
      soma = soma > 9 ? soma -= 9 : soma;
      multiplier = multiplier === 2 ? 1 : 2;
      return acc + soma;
    }, 0);


    const result = (Math.ceil(validatorDigit / 10) * 10) - validatorDigit;

    return digit === result;
  }

  private calculationFieldModulo11Barcode(group: string, digit: number): boolean {
    let multiplier = 2;
    const validatorDigit = group.split('').reduce((acc, current) => {
      let soma = Number(current) * multiplier;
      soma = soma % 11 === 1 ? 0 : 1;
      multiplier = multiplier === 9 ? 2 : multiplier++;
      return acc + soma;
    }, 0);

    return digit === validatorDigit;

  }


  private  formatBarCodeModulo10(barCode: string) {
    return barCode
      .replace(/(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})/, '$1.$2.$3.$4.$5.$6.$7.$8')
      .split('.');

  }

  private formatBarCodeModulo11(barCode: string) {
    return barCode
      .replace(/(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})/, '$1.$2.$3.$4.$5.$6.$7.$8')
      .split('.');
  }
}




import { TickerDealershipsBarcode as ModelTickerDealershipsBarcode } from '../../domain/models';
import { ValidationError } from '../../domain/errors/validation';
import { TickerDealershipsBarcode } from '../../domain/features';
import { ValidationBarcodeContainsOnlyNumber, ValidationBarcodeDigitVerifierTicketsDealerships } from '../contracts/validation';
import { ValidationBarcodeTicketDealershipsSize } from '../contracts/validation/validation-barcode-dealerships-size';


export class TickerDealershipsBarcodeService implements TickerDealershipsBarcode  {
  constructor(
    private readonly validation: ValidationBarcodeContainsOnlyNumber & ValidationBarcodeTicketDealershipsSize,
    private readonly calculationModule: ValidationBarcodeDigitVerifierTicketsDealerships,
  ) { }


  async execute(params: TickerDealershipsBarcode.Params): Promise<TickerDealershipsBarcode.Result> {
    const { digitalLine } = params;

    const isBarcodeContainsOnlyNumber = await this.validation.validatorBarcodeOnlyNumber({ digitalLine });

    if (!isBarcodeContainsOnlyNumber) {
      throw new ValidationError('Barcode not contains only number');
    }

    const isValidSizeBarcode = await this.validation.validatorBarcodeSize({ digitalLine });

    if (!isValidSizeBarcode) {
      throw new ValidationError('Barcode size is invalid. Size must be 47');
    }

    const typeModuleCalculation = Number(digitalLine.charAt(2));
    const  typeModuleValid = [6, 7, 8, 9];

    const isValidTypeModule = typeModuleValid.includes(typeModuleCalculation);

    if (!isValidTypeModule) {
      throw new ValidationError('Barcode type module is invalid');
    }

    let selectModule;
    if (typeModuleCalculation === 6 || typeModuleCalculation === 7) {
      selectModule = 'modulo10';
    } else {
      selectModule = 'modulo11';
    }

    const modulo10 = await this.calculationModule.validateDigitVerifier({
      barCode: digitalLine,
      module: selectModule as 'modulo10' | 'modulo11',
    });

    if (!modulo10) {
      throw new ValidationError('Modulo10 is invalid');
    }


    const barCode =  ModelTickerDealershipsBarcode.generateBarcode(digitalLine);
    const value = ModelTickerDealershipsBarcode.getValue(barCode);

    return {
      barCode,
      value,
    };
  }
}

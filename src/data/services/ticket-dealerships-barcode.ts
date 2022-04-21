
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

    const typeModuleCalculation = digitalLine
      .charAt(2)
      .includes('6' || '7') ? 'modulo10' :  'modulo11';

    /*     const modulesCalculation = {
      6: 'modulo10',
      7: 'modulo10',
      8: 'modulo11',
      9: 'modulo11',
    };

    let moduleCalculation: string;

    if (typeModuleCalculation === '6' || typeModuleCalculation === '7') {
      moduleCalculation = 'modulo10';
    } else if (typeModuleCalculation === '8' || typeModuleCalculation === '9') {
      moduleCalculation = 'modulo11';
    } else {
      throw new ValidationError('Module calculation not found');
    }
 */
    /*    const moduleCalculation = modulesCalculation[typeModuleCalculation];


    if (!moduleCalculation) {
      throw new ValidationError('Module calculation not found');
    } */

    const modulo10 = await this.calculationModule.validateDigitVerifier({
      barCode: digitalLine,
      module: typeModuleCalculation,
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

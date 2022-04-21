import { ValidationError } from '../errors/validation';

export interface BankBondsBarcode {
  execute: (params: BankBondsBarcode.Params) => Promise<BankBondsBarcode.Result>
}

export namespace BankBondsBarcode {
  export type Params = {
    digitalLine: string
  };

  export type Result = object | ValidationError;
}

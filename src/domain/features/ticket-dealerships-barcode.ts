import { ValidationError } from '../errors/validation';

export interface TickerDealershipsBarcode {
  execute: (params: TickerDealershipsBarcode.Params) => Promise<TickerDealershipsBarcode.Result>
}

export namespace TickerDealershipsBarcode {
  export type Params = {
    digitalLine: string
  };

  export type Result = object | ValidationError;
}

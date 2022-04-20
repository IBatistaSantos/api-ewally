import { ValidationError } from '../errors/validation';

export interface InformationBoleto {
  execute: (params: InformationBoleto.Params) => Promise<InformationBoleto.Result>
}

export namespace InformationBoleto {
  export type Params = {
    barCode: string
  };

  export type Result = object | ValidationError;
}

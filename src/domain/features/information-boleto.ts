import { ValidationError } from '../errors/validation';

export interface InformationBoleto {
  execute: (params: InformationBoleto.Params) => Promise<InformationBoleto.Result>
}

export namespace InformationBoleto {
  export type Params = {
    digitalLine: string
  };

  export type Result = object | ValidationError;
}

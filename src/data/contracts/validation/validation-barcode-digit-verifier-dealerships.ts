export interface ValidationBarcodeDigitVerifierTicketsDealerships {
  validateDigitVerifier: (params: ValidationBarcodeDigitVerifierTicketsDealerships.Params) => Promise<ValidationBarcodeDigitVerifierTicketsDealerships.Result>
}

export namespace ValidationBarcodeDigitVerifierTicketsDealerships {
  export type Params = {
    barCode: string,
    module: 'modulo10' | 'modulo11'
  };
  export type Result = boolean;
}



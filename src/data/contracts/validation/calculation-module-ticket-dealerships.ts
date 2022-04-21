export interface ValidationBarcodeDigitVerifierDealerships {
  validateDigitVerifier: (params: ValidationBarcodeDigitVerifierDealerships.Params)
  => Promise<ValidationBarcodeDigitVerifierDealerships.Result>
}

export namespace ValidationBarcodeDigitVerifierDealerships {
  export type Params = {
    barCode: string
  };
  export type Result = boolean;
}

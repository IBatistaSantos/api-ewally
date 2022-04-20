export interface ValidationBarcodeDigitVerifier {
  validateDigitVerifier: (params: ValidationBarcodeDigitVerifier.Params) => Promise<ValidationBarcodeDigitVerifier.Result>
}

export namespace ValidationBarcodeDigitVerifier {
  export type Params = {
    barCode: string
  };
  export type Result = boolean;
}


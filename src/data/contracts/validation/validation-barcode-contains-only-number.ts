export interface ValidationBarcodeContainsOnlyNumber {
  validatorBarcodeOnlyNumber: (params: ValidationBarcodeContainsOnlyNumber.Params) => Promise<ValidationBarcodeContainsOnlyNumber.Result>
}

export namespace ValidationBarcodeContainsOnlyNumber {
  export type Params = {
    digitalLine: string
  };
  export type Result = boolean;
}

export interface ValidationBarcodeContainsOnlyNumber {
  validatorBarcodeOnlyNumber: (params: ValidationBarcodeContainsOnlyNumber.Params) => Promise<ValidationBarcodeContainsOnlyNumber.Result>
}

export namespace ValidationBarcodeContainsOnlyNumber {
  export type Params = {
    barCode: string
  };
  export type Result = boolean;
}

export interface ValidationBarcodeSize {
  validatorBarcodeSize: (params: ValidationBarcodeSize.Params) => Promise<ValidationBarcodeSize.Result>
}

export namespace ValidationBarcodeSize {
  export type Params = {
    digitalLine: string
  };
  export type Result = boolean;
}

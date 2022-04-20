export interface ValidationBarcodeSize {
  validatorBarcodeSize: (params: ValidationBarcodeSize.Params) => Promise<ValidationBarcodeSize.Result>
}

export namespace ValidationBarcodeSize {
  export type Params = {
    barCode: string
  };
  export type Result = boolean;
}

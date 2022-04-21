export interface ValidationBarcodeTicketDealershipsSize {
  validatorBarcodeSize: (params: ValidationBarcodeTicketDealershipsSize.Params) => Promise<ValidationBarcodeTicketDealershipsSize.Result>
}

export namespace ValidationBarcodeTicketDealershipsSize {
  export type Params = {
    digitalLine: string
  };
  export type Result = boolean;
}

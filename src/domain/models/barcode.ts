
export class Barcode {
  static  generateBarcode(barCode: string): string {
    const array = this.formatBarCode(barCode);

    let bankAndCurrent = barCode.substring(0, 4);
    const dvCodBanck = array[6];
    const expirationDateAndValue = array[7];
    const position4a9 = barCode.substring(4, 9);
    const position10a19 = barCode.substring(10, 20);
    const position20a24 = barCode.substring(21, 31);

    return (bankAndCurrent + dvCodBanck + expirationDateAndValue + position4a9 + position10a19 + position20a24 );

  }


  static formatBarCode(barCode: string): string[] {
    return barCode
      .replace(/(\d{5})(\d{5})(\d{5})(\d{6})(\d{5})(\d{6})(\d{1})(\d{14})/, '$1.$2.$3.$4.$5.$6.$7.$8')
      .split('.');
  }
}

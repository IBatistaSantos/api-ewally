

export class TickerDealershipsBarcode {
  static  generateBarcode(barCode: string): string {
    const barCodeArray = this.formatBarCode(barCode);

    const groupOneBarcode = barCodeArray[0];
    const groupTwoBarcode = barCodeArray[2];
    const groupThreeBarcode = barCodeArray[4];
    const groupFourBarcode = barCodeArray[6];

    return groupOneBarcode + groupTwoBarcode + groupThreeBarcode + groupFourBarcode;

  }

  static getValue(barCode: string): number {
    return Number(barCode.substring(4, 15)) / 100;
  }

  private static formatBarCode(barCode: string): string[] {
    return barCode
      .replace(/(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})(\d{11})(\d{1})/, '$1.$2.$3.$4.$5.$6.$7.$8')
      .split('.');
  }
}

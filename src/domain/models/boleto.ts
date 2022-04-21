export class Boleto {
  static  expirationDate(barCode: string): Date {
    const array = barCode.slice(6, 10);

    const dataInicial = this.dateInitialBarcode;

    let dataFinal = new Date(dataInicial);

    dataFinal.setDate(dataFinal.getDate() + Number(array));

    return dataFinal;
  }

  static value(barCode: string): number {
    const array = barCode.slice(10, 19);
    return Number(array) / 100;
  }

  static get dateInitialBarcode(): Date {
    return new Date('10/07/1997');
  }
}

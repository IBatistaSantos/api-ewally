import { CalculationModuleDigitVerifierDealerships } from '../../../src/infra/validation/calculation-module-ticket-dealerships';

describe('Calculation', () => {
  let sut: CalculationModuleDigitVerifierDealerships;
  let digitalLine: string;

  beforeAll(() => {
    digitalLine = '856900000584030100649158110347945609001374691358';
  });

  beforeEach(() => {
    sut = new CalculationModuleDigitVerifierDealerships();
  });


  it('should ValidationBarcodeContainsOnlyNumber returns true', async () => {
    const result = await sut.validateDigitVerifier({ barCode: digitalLine, module: 'modulo10' });
    expect(result).toBe(true);
  });

  it('should ValidationBarcodeContainsOnlyNumber returns false', async () => {
    const digitalLineAlter = digitalLine.replace('0', '1');
    const result = await sut.validateDigitVerifier({ barCode: digitalLineAlter, module: 'modulo10' });
    expect(result).toBe(false);
  });
});

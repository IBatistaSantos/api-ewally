import { TickerDealershipsBarcodeService } from '../../../../data/services';
import { makeCalculationModuleDealerships } from '../../infra/validation/calculation-modulo';
import { makeValidator } from '../../infra/validation/validator-boleto';

export const makeTickerDealershipsService = (): TickerDealershipsBarcodeService => {
  return new TickerDealershipsBarcodeService(
    makeValidator(),
    makeCalculationModuleDealerships(),

  );
};


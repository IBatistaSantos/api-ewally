import { BankBondsBarcodeService } from '../../../../data/services';
import { makeValidator } from '../../infra/validation/validator-boleto';

export const makeInformationBoletoService = (): BankBondsBarcodeService => {
  return new BankBondsBarcodeService(
    makeValidator(),
  );
};

import { InformationBoletoService } from '../../../../data/services';
import { makeValidator } from '../../infra/validation/validator-boleto';

export const makeInformationBoletoService = (): InformationBoletoService => {
  return new InformationBoletoService(
    makeValidator(),
  );
};

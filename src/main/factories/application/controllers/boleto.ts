import { makeInformationBoletoService } from '../../../../main/factories/domain/use-cases';
import { BoletoController } from '../../../../application/controllers';

export const makeInformatiobBoletoController = (): BoletoController => {
  return new BoletoController(makeInformationBoletoService());
};

import { ValidatorBoleto } from '../../../../infra/validation/validator-boleto';

export const makeValidator = (): ValidatorBoleto => {
  return new ValidatorBoleto();
};


import { makeInformatiobBoletoController } from '../factories/application/controllers';
import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-router';

export default (router: Router): void => {
  router.get('/boleto/:barCode', adaptExpressRoute(makeInformatiobBoletoController()));
};

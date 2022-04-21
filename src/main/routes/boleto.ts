
import { makeInformatiobBoletoController, makeTicketDealershipsController } from '../factories/application/controllers';
import { Router } from 'express';
import { adaptExpressRoute } from '../adapters/express-router';

export default (router: Router): void => {
  router.get('/boleto/:digitalLine', adaptExpressRoute(makeInformatiobBoletoController()));
  router.get('/concessionaria/:digitalLine', adaptExpressRoute(makeTicketDealershipsController()));
};

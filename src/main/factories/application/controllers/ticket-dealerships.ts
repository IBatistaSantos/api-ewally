import {  TicketDealershipsController } from '../../../../application/controllers';
import { makeTickerDealershipsService } from '../../domain/use-cases/ticket-dealerships';

export const makeTicketDealershipsController = (): TicketDealershipsController => {
  return new TicketDealershipsController(makeTickerDealershipsService());
};

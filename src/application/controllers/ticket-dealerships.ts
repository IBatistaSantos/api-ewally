import { TickerDealershipsBarcodeService } from '../../data/services';
import { ValidationError } from '../../domain/errors/validation';
import { badRequest, ok, HttpResponse } from '../helpers';
import { Controller } from './controller';

type HttpRequest = { digitalLine: string };

type Model = object | ValidationError;


export class TicketDealershipsController extends Controller {
  constructor(private readonly tickerDealershipsBarcodeService: TickerDealershipsBarcodeService ) {
    super();
  }

  async perform({ digitalLine }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const boleto = await this.tickerDealershipsBarcodeService.execute({ digitalLine });
      return ok(boleto);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      throw error;
    }
  }

}

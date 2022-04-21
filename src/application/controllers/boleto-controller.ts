import { BankBondsBarcodeService } from '../../data/services';
import { ValidationError } from '../../domain/errors/validation';
import { badRequest, ok, HttpResponse } from '../helpers';
import { Controller } from './controller';

type HttpRequest = { digitalLine: string };

type Model = object | ValidationError;


export class BoletoController extends Controller {
  constructor(private readonly bankBondsService:BankBondsBarcodeService ) {
    super();
  }

  async perform({ digitalLine }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const boleto = await this.bankBondsService.execute({ digitalLine });
      return ok(boleto);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      throw error;
    }
  }

}

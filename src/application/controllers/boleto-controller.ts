import { InformationBoletoService } from '../../data/services';
import { ValidationError } from '../../domain/errors/validation';
import { badRequest, ok, HttpResponse } from '../helpers';
import { Controller } from './controller';

type HttpRequest = { barCode: string };

type Model = object | ValidationError;


export class BoletoController extends Controller {
  constructor(private readonly informationBoletoService:InformationBoletoService ) {
    super();
  }

  async perform({ barCode }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const boleto = await this.informationBoletoService.execute({ barCode });
      return ok(boleto);
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error);
      }
      throw error;
    }
  }

}

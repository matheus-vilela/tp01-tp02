import tiposSanguineosRepository from 'app/repositories/tipos-sanguineos';
import { Request, Response } from 'express';

class TiposSanquineosController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const tiposSanguineos = await tiposSanguineosRepository.findAll(orderBy as string);
    return response.status(200).json(tiposSanguineos);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    const tiposSanguineos = await tiposSanguineosRepository.findById(id);
    return response.status(200).json(tiposSanguineos);
  }

  async update(request: Request, response: Response) {
    const {quantidade, id } = request.body;
    const tiposSanguineos = await tiposSanguineosRepository.update(quantidade, id)
    return response.status(200).json(tiposSanguineos);;
  }

}

export = new TiposSanquineosController();
import doacoesRepository from 'app/repositories/doacoes';
import tiposSanguineos from 'app/repositories/tipos-sanguineos';
import { Request, Response } from 'express';

class DoacoesController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const doacoes = await doacoesRepository.findAll(orderBy as string);
    return response.status(200).json(doacoes);
  }

  async create(request: Request, response: Response) {
    const {pessoa_id, local_id, quantidade, tipo,fator } = request.body;
    const tipoSang = await tiposSanguineos.findByTipoAndFator(tipo,fator);
    console.log('tipo sab',tipoSang)
    if(!pessoa_id) {
      return response.status(400).json({ message: 'Parâmetro pessoa_id é obrigatória' });
    }

    if(!local_id) {
      return response.status(400).json({ message: 'Parâmetro local_id é obrigatório' });
    }

    const doacoes = await doacoesRepository.create(quantidade,tipoSang.id,pessoa_id, local_id);
    await tiposSanguineos.update(quantidade, tipoSang.id)
    return response.status(201).json(doacoes);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({ message: 'Parâmetro id da doação é obrigatório' });
    }

    const doacoes = await doacoesRepository.findById(id);
    return response.status(200).json(doacoes);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { data, pessoa_id, local_id } = request.body;

    if(!id) {
      return response.status(400).json({ message: 'Parâmetro id da doação é obrigatório' });
    }

    if(!data) {
      return response.status(400).json({ message: 'Parâmetro "data" da doação é obrigatória' });
    }

    if(!pessoa_id) {
      return response.status(400).json({ message: 'Parâmetro pessoa_id é obrigatória' });
    }

    if(!local_id) {
      return response.status(400).json({ message: 'Parâmetro local_id é obrigatório' });
    }
    const doacoes = await doacoesRepository.update(id, data, pessoa_id, local_id);
    return response.status(200).json(doacoes);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({ message: 'Parâmetro id da doação é obrigatório' });
    }
    
    await doacoesRepository.delete(id);
    return response.status(204).send();
  }

}

export = new DoacoesController();
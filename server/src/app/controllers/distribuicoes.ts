import distribuicoesRepository from 'app/repositories/distribuicoes';
import { Request, Response } from 'express';

class DistribuicoesController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const distribuicoes = await distribuicoesRepository.findAll(orderBy as string);
    return response.status(200).json(distribuicoes);
  }

  async create(request: Request, response: Response) {
    const { data, produto_id, unidade_id } = request.body;

    if(!data){
      return response.status(400).json({ error: 'Parâmetro data não informada.' });
    }

    if(!produto_id){
      return response.status(400).json({ error: 'Parâmetro produto_id não informado.' });
    }

    if(!unidade_id){
      return response.status(400).json({ error: 'Parâmetro unidade_id não informada.' });
    }
    
    const distribuicoes = await distribuicoesRepository.create(data, produto_id, unidade_id);
    return response.status(201).json(distribuicoes);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id){
      return response.status(400).json({ error: 'Parâmetro id não informado.' });
    }

    const distribuicoes = await distribuicoesRepository.findById(id);
    return response.status(200).json(distribuicoes);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { data, produto_id, unidade_id } = request.body;

    if(!id){
      return response.status(400).json({ error: 'Parâmetro id não informado.' });
    }

    if(!data){
      return response.status(400).json({ error: 'Parâmetro "data" não informada.' });
    }

    if(!produto_id){
      return response.status(400).json({ error: 'Parâmetro "produto_id" não informado.' });
    }

    if(!unidade_id){
      return response.status(400).json({ error: 'Parâmetro "unidade_id" não informada.' });
    }
    
    const distribuicoes = await distribuicoesRepository.update(id, data, produto_id, unidade_id);
    return response.status(200).json(distribuicoes);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id){
      return response.status(400).json({ error: 'Parâmetro "id" não informado.' });
    }
    await distribuicoesRepository.delete(id);
    return response.status(204).send();
  }

}

export = new DistribuicoesController();
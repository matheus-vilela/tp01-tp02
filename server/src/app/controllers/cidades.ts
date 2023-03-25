import cidadesRepository from 'app/repositories/cidades';
import { Request, Response } from 'express';

class CidadesController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const cidade = await cidadesRepository.findAll(orderBy as string);
    return response.status(200).json(cidade);
  }
  
  async create(request: Request, response: Response) {
    const { nome, estado_id } = request.body;

    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" é obrigatório'});
    }

    if(!estado_id) {
      return response.status(400).json({error: 'Parâmetro estado_id é obrigatório'});
    }

    const exist = await cidadesRepository.findByNome(nome);
    if(exist){
      return response.status(400).json({error: 'A cidade já esta cadastrada'});
    }
    const cidade = await cidadesRepository.create(nome, estado_id);
    return response.status(201).json(cidade);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    if(!id) {
      return response.status(400).json({error: 'Parâmetro id é obrigatório'});
    }

    const cidade = await cidadesRepository.findById(id);
    return response.status(200).json(cidade);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, estado_id } = request.body;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro id é obrigatório'});
    }

    if(!nome) {
      return response.status(400).json({error: 'Parâmetro nome é obrigatório'});
    }

    if(!estado_id) {
      return response.status(400).json({error: 'Parâmetro estado_id é obrigatório'});
    }
    
    const cidade = await cidadesRepository.update(id, nome, estado_id);
    return response.status(200).json(cidade);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro id é obrigatório'});
    }
    await cidadesRepository.delete(id);
    return response.status(204).send();
  }

}

export = new CidadesController();
import estadosRepository from 'app/repositories/estados';
import { Request, Response } from 'express';

class EstadosController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const estados = await estadosRepository.findAll(orderBy as string);
    return response.status(200).json(estados);
  }

  async create(request: Request, response: Response) {
    const {nome,sigla } = request.body;

    if(!nome){
      return response.status(400).json({error: 'Parâmetro nome é obrigatório'});
    }

    if(!sigla){
      return response.status(400).json({error: 'Parâmetro sigla é obrigatório'});
    }
    
    const exist = await estadosRepository.findByNome(nome);
    if(exist){
      return response.status(400).json({error: 'Este estado já está cadastrado.'});
    }
    const estados = await estadosRepository.create(nome,sigla);
    return response.status(201).json(estados);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id){
      return response.status(400).json({error: 'Parâmetro "id" é obrigatório'});
    }

    const estados = await estadosRepository.findById(id);
    return response.status(200).json(estados);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome,sigla } = request.body;

    if(!id){
      return response.status(400).json({error: 'Parâmetro "id" é obrigatório'});
    }

    if(!nome){
      return response.status(400).json({error: 'Parâmetro "nome" é obrigatório'});
    }

    if(!sigla){
      return response.status(400).json({error: 'Parâmetro "sigla" é obrigatório'});
    }

    const estados = await estadosRepository.update(id, nome,sigla);
    return response.status(200).json(estados);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id){
      return response.status(400).json({error: 'Parâmetro "id" é obrigatório'});
    }
    
    await estadosRepository.delete(id);
    return response.status(204).send();
  }

}

export = new EstadosController();
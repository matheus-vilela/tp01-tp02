import unidadesRepository from 'app/repositories/unidades';
import { Request, Response } from 'express';

class UndiadesController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const unidades = await unidadesRepository.findAll(orderBy as string);
    return response.status(200).json(unidades);
  }

  async create(request: Request, response: Response) {
    console.log(request.body)
    const {nome, numero, complemento, cidade, estado, sigla } = request.body;

    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" do local de coleta não informado.'});
    }

    if(!numero) {
      return response.status(400).json({error: 'Parâmetro "numero" do local de coleta não informado.'});
    }

    if(!cidade) {
      return response.status(400).json({error: 'Parâmetro "cidade" do local de coleta não informado.'});
    }

    if(!estado) {
      return response.status(400).json({error: 'Parâmetro "estado" do local de coleta não informado.'});
    }

    if(!sigla) {
      return response.status(400).json({error: 'Parâmetro "sigla" do local de coleta não informado.'});
    }
    
    const unidades = await unidadesRepository.create(nome, numero, complemento, cidade, estado, sigla);
    return response.status(201).json(unidades);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    const unidades = await unidadesRepository.findById(id);
    return response.status(200).json(unidades);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {nome, numero, complemento, cidade, estado, sigla } = request.body;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" do local de coleta não informado.'});
    }

    if(!numero) {
      return response.status(400).json({error: 'Parâmetro "numero" do local de coleta não informado.'});
    }

    if(!cidade) {
      return response.status(400).json({error: 'Parâmetro "cidade" do local de coleta não informado.'});
    }

    if(!estado) {
      return response.status(400).json({error: 'Parâmetro "estado" do local de coleta não informado.'});
    }

    if(!sigla) {
      return response.status(400).json({error: 'Parâmetro "sigla" do local de coleta não informado.'});
    }
    const unidades = await unidadesRepository.update(id, nome, numero, complemento, cidade, estado, sigla);
    return response.status(200).json(unidades);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await unidadesRepository.delete(id);
    return response.status(204).send();
  }

}

export = new UndiadesController();
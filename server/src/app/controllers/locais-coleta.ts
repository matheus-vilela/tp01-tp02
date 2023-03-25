import locaisColetaRepository from 'app/repositories/locais-coleta';
import { Request, Response } from 'express';

class LocaisColetaController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const locaisColeta = await locaisColetaRepository.findAll(orderBy as string);
    return response.status(200).json(locaisColeta);
  }

  async create(request: Request, response: Response) {
    console.log(request.body)
    const {nome, rua, numero, complemento, cidade, estado, sigla } = request.body;


    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" do local de coleta não informado.'});
    }

    if(!rua) {
      return response.status(400).json({error: 'Parâmetro "rua" do local de coleta não informado.'});
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

    const locaisColeta = await locaisColetaRepository.create(nome, rua, numero, complemento, cidade, estado, sigla);
    return response.status(201).json(locaisColeta);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }

    const locaisColeta = await locaisColetaRepository.findById(id);
    return response.status(200).json(locaisColeta);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, rua, numero, complemento, cidade, estado, sigla } = request.body;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" do local de coleta não informado.'});
    }

    if(!rua) {
      return response.status(400).json({error: 'Parâmetro "rua" do local de coleta não informado.'});
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
    const locaisColeta = await locaisColetaRepository.update(id, nome, rua, numero, complemento, cidade, estado, sigla);
    return response.status(200).json(locaisColeta);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    await locaisColetaRepository.delete(id);
    return response.status(204).send();
  }

}

export = new LocaisColetaController();
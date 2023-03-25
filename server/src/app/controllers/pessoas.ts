import pessoasRepository from 'app/repositories/pessoas';
import tipoSanguineoRepository from 'app/repositories/tipos-sanguineos';
import { Request, Response } from 'express';

interface ICreate {
  nome: string;
  telefone: string;
  email: string;
  tipo_id: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    sigla: string;
    cep: string;
  };
}

class PessoasController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const pessoas = await pessoasRepository.findAll(orderBy as string);
    return response.status(200).json(pessoas);
  }

  async create(request: Request, response: Response) {
    const {nome, rua, numero, complemento, documento, cidade ,estado,sigla, tipo,fator }:any = request.body;
    const tipoSang= await tipoSanguineoRepository.findByTipoAndFator(tipo,fator);
    const pessoas = await pessoasRepository.create({nome, rua,numero,cidade, estado, sigla,complemento,documento,  tipo_id: tipoSang.id});
    return response.status(201).json(pessoas);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }

    const pessoas = await pessoasRepository.findById(id);
    return response.status(200).json(pessoas);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {nome, telefone, email, tipo_id, endereco }:ICreate = request.body;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }

    if(!nome) {
      return response.status(400).json({error: 'Parâmetro "nome" do local de coleta não informado.'});
    }

    if(!telefone) {
      return response.status(400).json({error: 'Parâmetro "telefone" do local de coleta não informado.'});
    }

    if(!email) {
      return response.status(400).json({error: 'Parâmetro "email" do local de coleta não informado.'});
    }

    if(!tipo_id) {
      return response.status(400).json({error: 'Parâmetro "tipo_id" do local de coleta não informado.'});
    }

    if(!endereco) {
      return response.status(400).json({error: 'Parâmetro "endereco" do local de coleta não informado.'});
    }

    const pessoas = await pessoasRepository.update(id, {nome, telefone, email, tipo_id, endereco});
    return response.status(200).json(pessoas);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    
    await pessoasRepository.delete(id);
    return response.status(204).send();
  }

}

export = new PessoasController();
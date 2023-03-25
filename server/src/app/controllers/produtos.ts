import produtosRepository from 'app/repositories/produtos';
import { Request, Response } from 'express';

class ProdutosController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const produtos = await produtosRepository.findAll(orderBy as string);
    return response.status(200).json(produtos);
  }

  async create(request: Request, response: Response) {
    const {etiqueta, doacao_id, validade } = request.body;

    if(!etiqueta) {
      return response.status(400).json({error: 'Parâmetro "etiqueta" do produto não informado.'});
    }

    if(!doacao_id) {
      return response.status(400).json({error: 'Parâmetro "doacao_id" do produto não informado.'});
    }

    if(!validade) {
      return response.status(400).json({error: 'Parâmetro "validade" do produto não informado.'});
    }

    const produtos = await produtosRepository.create(etiqueta, doacao_id, validade);
    return response.status(201).json(produtos);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }

    const produtos = await produtosRepository.findById(id);
    return response.status(200).json(produtos);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {etiqueta, doacao_id, validade } = request.body;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }

    if(!etiqueta) {
      return response.status(400).json({error: 'Parâmetro "etiqueta" do produto não informado.'});
    }

    if(!doacao_id) {
      return response.status(400).json({error: 'Parâmetro "doacao_id" do produto não informado.'});
    }

    if(!validade) {
      return response.status(400).json({error: 'Parâmetro "validade" do produto não informado.'});
    }
    
    const produtos = await produtosRepository.update(id, etiqueta, doacao_id, validade);
    return response.status(200).json(produtos);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'Parâmetro "id" do local de coleta não informado.'});
    }
    
    await produtosRepository.delete(id);
    return response.status(204).send();
  }

}

export = new ProdutosController();
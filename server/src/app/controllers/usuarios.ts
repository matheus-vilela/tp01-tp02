import usuariosRepository from 'app/repositories/usuarios';
import { Request, Response } from 'express';

class UsuariosController {

  async index(request: Request, response: Response) {
    const { orderBy } = request.query;
    const usuarios = await usuariosRepository.findAll(orderBy as string);
    return response.status(200).json(usuarios);
  }
  
  async signIn(request: Request, response: Response) {
    const {email, senha } = request.body;
    const usuario = await usuariosRepository.findByEmail(email);
    if(!usuario) {
      return response.status(400).json({error: 'Usuário não encontrado'});
    }
    if(usuario.senha !== senha) {
      return response.status(400).json({error: 'Senha inválida'});
    }
    return response.status(200).json(usuario);
  }

  async create(request: Request, response: Response) {
    const {nome, email, senha} = request.body;
    if(!nome) {
      return response.status(400).json({error: 'nome é obrigatório'});
    }

    if(!email) {
      return response.status(400).json({error: 'email é obrigatório'});
    }

    if(!senha) {
      return response.status(400).json({error: 'senha é obrigatório'});
    }

    const usuarios = await usuariosRepository.create(nome, email, senha );
    return response.status(201).json(usuarios);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'id é obrigatório'});
    }

    const usuarios = await usuariosRepository.findById(id);
    return response.status(200).json(usuarios);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const {nome, email, senha, createdAt  } = request.body;

    if(!id) {
      return response.status(400).json({error: 'id é obrigatório'});
    }

    if(!nome) {
      return response.status(400).json({error: 'nome é obrigatório'});
    }

    if(!email) {
      return response.status(400).json({error: 'email é obrigatório'});
    }

    if(!senha) {
      return response.status(400).json({error: 'senha é obrigatório'});
    }

    const usuarios = await usuariosRepository.update(id, nome, email, senha, createdAt );
    return response.status(200).json(usuarios);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) {
      return response.status(400).json({error: 'id é obrigatório'});
    }
    
    await usuariosRepository.delete(id);
    return response.status(204).send();
  }

}

export = new UsuariosController();
import cidadesRepository from 'app/repositories/cidades';
import estadosRepository from 'app/repositories/estados';
import { query } from 'database/connection';

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

class PessoasRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`SELECT * FROM pessoas ORDER BY nome ${direction}`);
    return rows;
  }

  async findById(id:any) {
    const [row] = await query('SELECT * FROM pessoas WHERE id = $1', [id]);
    return row;
  }

  async create(data: any) {
    try {
      let state = await estadosRepository.checkIfStateExists({sigla:data.sigla})
      if(!state) {
        state = await estadosRepository.create(data.estado, data.sigla);
      }
      let city = await cidadesRepository.checkIfCityExists({nome: data.cidade});
      if(!city) {
        city = await cidadesRepository.create(data.cidade, state.id);
      }

      const [row] = await query(
        `INSERT INTO pessoas (nome, rua, numero, complemento, documento, cidade_id, tipo_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [data.nome,
          data.rua,
          data.numero,
          data.complemento,
          data.documento,
          city.id,
          data.tipo_id,
          new Date().toISOString(),
          new Date().toISOString(),
        ],
      );
      return row;
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      return null;
    }
  }

  async update(id:any, data: ICreate) {
    try {
      let state = await estadosRepository.checkIfStateExists({nome:data.nome})
      if(!state) {
        state = await estadosRepository.create(data.endereco.estado, data.endereco.sigla);
      }
      let city = await cidadesRepository.checkIfCityExists({nome: data.nome});
      if(!city) {
        city = await cidadesRepository.create(data.endereco.cidade, state.id);
      }
      const [row] = await query(
        `UPDATE pessoas SET nome = $1, rua = $2, numero = $3, complemento = $4, documento = $5, cidade_id = $6, tipo_id = $7, updated_at = $8
        WHERE id = $9
        RETURNING *`,
        [data.nome,
          data.endereco.rua,
          data.endereco.numero,
          data.endereco.complemento,
          data.telefone,
          city.id,
          data.tipo_id,
          new Date().toISOString(),
          id,
        ],
      );
      return row;
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      return null;
    }
  }

  async delete(id:any) {
    const [row] = await query('DELETE FROM pessoas WHERE id = $1 RETURNING *', [id]);
    return row;
  }

}

export = new PessoasRepository();
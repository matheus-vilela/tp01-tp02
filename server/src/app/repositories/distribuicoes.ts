import { query } from 'database/connection';


class DistribuicoesRepository {

  async findById(id:string) {
    const [row] = await query('SELECT * FROM distribuicoes WHERE id = $1', [id]);
    return row;
  }

  async findByNome(nome:string) {
    const [row] = await query('SELECT * FROM distribuicoes WHERE nome = $1', [nome]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT *
    FROM distribuicoes
    ORDER BY nome ${direction}`);
    return rows;
  }
  
  async checkIfStateExists({id,nome}:{id?:string, nome?:string}){
    if(id) {
      const row = await this.findById(id);
      return row;
    } else if(nome) {
      const [row] = await this.findByNome(nome);
      return row;
    }
    return null;
  }

  async create(data:string, produto_id: string, unidade_id:string) {
    const [row] = await query(
      `INSERT INTO distribuicoes ( produto_id, unidade_id, data, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [ 
        produto_id, 
        unidade_id,
        data, 
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:string, data:string, produto_id: string, unidade_id:string) {
    const [row] = await query(
      `UPDATE distribuicoes
        SET data = $1, produto_id = $2, unidade_id = $3, updated_at = $4
        WHERE id = $5
        RETURNING *`,
      [ 
        data,
        produto_id,
        unidade_id,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async delete(id:string) {
    const [row] = await query(
      `DELETE FROM distribuicoes
        WHERE id = $1
        RETURNING *`,
      [ id ],
    );
    return row;
  }
}

export = new DistribuicoesRepository();
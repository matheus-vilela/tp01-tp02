import { query } from 'database/connection';

class CidadesRepository {

  async findById(id:any) {
    const [row] = await query('SELECT * FROM cidades WHERE id = $1', [id]);
    return row;
  }

  async findByNome(nome:string) {
    const [row] = await query('SELECT * FROM cidades WHERE nome = $1', [nome]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT *
    FROM cidades
    ORDER BY nome ${direction}`);
    return rows;
  }

  async checkIfCityExists({id,nome}:{id?:any, nome?:string}){
    if(id) {
      const row = await this.findById(id);
      return row;
    } else if(nome) {
      const row = await this.findByNome(nome);
      return row;
    }
    return null;
  }

  async create(nome:string, estado_id:number) {
    const [row] = await query(
      `INSERT INTO cidades (nome, estado_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [ nome, 
        estado_id, 
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:any, nome:string, estado_id:number) {
    const [row] = await query(
      `UPDATE cidades
        SET nome = $1, estado_id = $2, updated_at = $3
        WHERE id = $4
        RETURNING *`,
      [ nome,
        estado_id,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async delete(id:any) {
    const [row] = await query('DELETE FROM cidades WHERE id = $1 RETURNING *', [id]);
    return row;
  }

}

export = new CidadesRepository();
import { query } from 'database/connection';


class DoacoesRepository {
  
    async findById(id:string) {
      const [row] = await query('SELECT * FROM doacoes WHERE id = $1', [id]);
      return row;
    }
  
    async findByNome(nome:string) {
      const [row] = await query('SELECT * FROM doacoes WHERE nome = $1', [nome]);
      return row;
    }
  
    async findAll(orderBy = 'ASC') {
      const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
      const rows = await query(`
        SELECT *
        FROM doacoes
        ORDER BY created_at ${direction}
      `);
      return rows;
    }
  
    async checkIfUnitExists({id,nome}:{id?:string, nome?:string}){
      if(id) {
        const row = await this.findById(id);
        return row;
      } else if(nome) {
        const [row] = await this.findByNome(nome);
        return row;
      }
      return null;
    }
  
    async create(quantidade: string, tipo_id: string, pessoa_id:string, local_id:string) {
      console.log(tipo_id)
      const [row] = await query(
        `INSERT INTO doacoes (pessoa_id, local_id, quantidade, tipo_id, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *`,
        [ 
          pessoa_id,
          local_id,
          quantidade,
          tipo_id,
          new Date().toISOString(),
          new Date().toISOString(),
        ],
      );
      return row;
    }
  
    async update(id:string, data: string, passoa_id:string, local_id:string) {
      const [row] = await query(
        `UPDATE doacoes
        SET passoa_id = $1, local_id = $2, data = $3, updated_at = $4
        WHERE id = $5
        RETURNING *`,
        [ 
          passoa_id,
          local_id,
          data,
          new Date().toISOString(),
          id,
        ],
      );
      return row;
    }

    async delete(id:string) {
      const [row] = await query(
        `DELETE FROM doacoes
        WHERE id = $1
        RETURNING *`,
        [ 
          id,
        ],
      );
      return row;
    }
}

export = new DoacoesRepository();
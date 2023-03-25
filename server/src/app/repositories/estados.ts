import { query } from 'database/connection';

class EstadosRepository {

  async findById(id:any) {
    const [row] = await query('SELECT * FROM estados WHERE id = $1', [id]);
    return row;
  }

  async findBySigla(nome:string) {
    console.log( 'NOME ==> ', nome.trim())
    const [row] = await query('SELECT * FROM estados WHERE sigla = $1', [nome]);
    console.log(row)
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT *
    FROM estados
    ORDER BY nome ${direction}`);
    return rows;
  }
  
  async checkIfStateExists({id,sigla,nome}:{id?:any, sigla?:string, nome?:string}){
    if(id) {
      const row = await this.findById(id);
      return row;
    } else if(sigla) {
      const row = await this.findBySigla(sigla);
      return row;
    } else if(nome) {
      const row = await this.findBySigla(nome);
      return row;
    }
    return null;
  }

  async create(nome:string, sigla:string) {
    const [row] = await query(
      `INSERT INTO estados (nome, sigla, created_at, updated_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
      [ nome, 
        sigla, 
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:any, nome:string, sigla:string) {
    const [row] = await query(
      `UPDATE estados
        SET nome = $1, sigla = $2, updated_at = $3
        WHERE id = $4
        RETURNING *`,
      [ nome,
        sigla,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async delete(id:any) {
    const [row] = await query(
      `DELETE FROM estados
        WHERE id = $1
        RETURNING *`,
      [ id ],
    );
    return row;
  }



}

export = new EstadosRepository();
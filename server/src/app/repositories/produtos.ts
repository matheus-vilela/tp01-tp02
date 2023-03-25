import { query } from 'database/connection';


class ProdutosRepository {

  async findById(id:string) {
    const [row] = await query('SELECT * FROM produtos WHERE id = $1', [id]);
    return row;
  }

  async findByNome(nome:string) {
    const [row] = await query('SELECT * FROM produtos WHERE nome = $1', [nome]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
      SELECT *
      FROM produtos
      ORDER BY nome ${direction}
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

  async create(etiqueta:string, doacao_id: string, validade: number) {

    const [row] = await query(
      `INSERT INTO produtos (etiqueta, doacao_id, validade, created_at, upload_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [ 
        etiqueta,
        doacao_id,
        validade,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:string, etiqueta:string, doacao_id: string, validade: number) {
    const [row] = await query(
      `UPDATE produtos
        SET etiqueta = $1, doacao_id = $2, validade = $3, updated_at = $4
        WHERE id = $5
        RETURNING *`,
      [
        etiqueta,
        doacao_id,
        validade,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async delete(id:string) {
    const [row] = await query(
      `DELETE FROM produtos
        WHERE id = $1
        RETURNING *`,
      [id],
    );
    return row;
  }


}

export = new ProdutosRepository();
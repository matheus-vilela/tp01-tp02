import { query } from 'database/connection';

class TiposSanguineosRepository {

  async findById(id:any) {
    const [row] = await query('SELECT * FROM tipos_sanguineos WHERE id = $1', [id]);
    return row;
  }
  async findByTipoAndFator(tipo:string, fator: string) {
    console.log('tipo', tipo)
    console.log('fator', fator)
    const [row] = await query('SELECT * FROM tipos_sanguineos WHERE tipo = $1 AND fator = $2', [tipo, fator]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
      SELECT *
      FROM tipos_sanguineos
      ORDER BY tipo ${direction}
    `);
    return rows;
  }

  async update(quantidade = 0, tipo_id:string) {
    const tipo = await this.findById(tipo_id);
    const [row] = await query(
      `UPDATE tipos_sanguineos SET quantidade = $1
      WHERE id = $2
      RETURNING *`,
      [
        String(Number(quantidade) + Number(tipo.quantidade)),
        tipo_id,
      ],
    );
    return row;
  }

}

export = new TiposSanguineosRepository();
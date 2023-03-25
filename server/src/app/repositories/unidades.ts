import cidadesRepository from 'app/repositories/cidades';
import estadosRepository from 'app/repositories/estados';
import { query } from 'database/connection';


class UnidadesRepository {

  async findById(id:string) {
    const [row] = await query('SELECT * FROM unidades WHERE id = $1', [id]);
    return row;
  }

  async findByNome(nome:string) {
    const [row] = await query('SELECT * FROM unidades WHERE nome = $1', [nome]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
      SELECT *
      FROM unidades
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

  async create(nome:string, numero: string, complemento: string, cidade:string, estado:string, sigla:string) {
    let state = await estadosRepository.checkIfStateExists({sigla:sigla})
    console.log(
      'state', state
    )
    if(!state) {
      state = await estadosRepository.create(estado, sigla);
    }
    let city = await cidadesRepository.checkIfCityExists({nome: cidade});
    console.log(
      'city', city
    )
    if(!city) {
      city = await cidadesRepository.create(cidade, state.id);
    }

    const [row] = await query(
      `INSERT INTO unidades (nome, numero, complemento, cidade_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
      [ 
        nome,
        numero,
        complemento,
        city.id,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:string, nome:string, numero: string, complemento: string, cidade:string, estado:string, sigla:string) {
    let state = await estadosRepository.checkIfStateExists({sigla:sigla})
    if(!state) {
      state = await estadosRepository.create(estado, sigla);
    }
    let city = await cidadesRepository.checkIfCityExists({nome: cidade});
    if(!city) {
      city = await cidadesRepository.create(cidade, state.id);
    }

    const [row] = await query(
      `UPDATE unidades
        SET nome = $1,
            numero = $2,
            complemento = $3,
            cidade_id = $4,
            updated_at = $5
        WHERE id = $6
        RETURNING *`,
      [nome,
        numero,
        complemento,
        city.id,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async delete(id:string) {
    const [row] = await query(
      `DELETE FROM unidades
        WHERE id = $1
        RETURNING *`,
      [id],
    );
    return row;
  }


}

export = new UnidadesRepository();
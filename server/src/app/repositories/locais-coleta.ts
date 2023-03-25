import cidadesRepository from 'app/repositories/cidades';
import estadosRepository from 'app/repositories/estados';
import { query } from 'database/connection';


class LocaisColetaRepository {

  async findById(id:string) {
    const [row] = await query('SELECT * FROM locais_coleta WHERE id = $1', [id]);
    return row;
  }

  async findByNome(nome:string) {
    const [row] = await query('SELECT * FROM locais_coleta WHERE nome = $1', [nome]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
      SELECT *
      FROM locais_coleta
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

  async create(nome:string, rua:string, numero:string, complemento: string, cidade:string, estado:string, sigla:string) {
    console.log('aqui')
    let state = await estadosRepository.checkIfStateExists({sigla:sigla})
    if(!state) {
      state = await estadosRepository.create(estado, sigla);
    }
    console.log(
      'state', state
      
    )
    let city = await cidadesRepository.checkIfCityExists({nome: cidade});
    if(!city) {
      city = await cidadesRepository.create(cidade, state.id);
    }
   

    const [row] = await query(
      `INSERT INTO locais_coleta (nome, rua, numero, complemento, cidade_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
      [ 
        nome,
        rua,
        numero,
        complemento || '',
        city.id,
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:string, nome:string, rua:string, numero:string, complemento: string, cidade:string, estado:string, sigla:string) {
    let state = await estadosRepository.checkIfStateExists({nome:estado})
    if(!state) {
      state = await estadosRepository.create(estado, sigla);
    }
    let city = await cidadesRepository.checkIfCityExists({nome: cidade});
    if(!city) {
      city = await cidadesRepository.create(cidade, state.id);
    }

    const [row] = await query(
      `UPDATE locais_coleta
        SET nome = $1, rua = $2, numero = $3, complemento = $4, cidade_id = $5, updated_at = $6
        WHERE id = $7
        RETURNING *`,
      [ 
        nome,
        rua,
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
      `DELETE FROM locais_coleta
        WHERE id = $1
        RETURNING *`,
      [id],
    );
    return row;
  }
  
    

}

export = new LocaisColetaRepository();
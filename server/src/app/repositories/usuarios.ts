import { query } from 'database/connection';



class UsuariosRepository {

  async findById(id:any) {
    const [row] = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email:string) {
    const [row] = await query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return row;
  }

  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await query(`
    SELECT *
    FROM usuarios
    ORDER BY nome ${direction}`);
    return rows;
  }

  async create(nome:string, email:string, senha:string) {
    const [row] = await query(
      `INSERT INTO usuarios (nome, email, senha, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
      [ nome, 
        email, 
        senha, 
        new Date().toISOString(),
        new Date().toISOString(),
      ],
    );
    return row;
  }

  async update(id:any, nome:string, email:string, senha:string, createdAt:any) {
    const [row] = await query(
      `UPDATE usuarios
        SET nome = $1, email = $2, senha = $3, created_at = $4, updated_at = $5
        WHERE id = $6
        RETURNING *`,
      [ nome,
        email,
        senha,
        createdAt,
        new Date().toISOString(),
        id,
      ],
    );
    return row;
  }

  async checkIfUserExists({id,email}:{id?:any, email?:string}){
    if(id) {
      const row = await this.findById(id);
      return row;
    } else if(email) {
      const [row] = await this.findByEmail(email);
      return row;
    }
    return null;
  }

  async delete(id:any) {
    const [row] = await query(
      `DELETE FROM usuarios
        WHERE id = $1
        RETURNING *`,
      [ id ],
    );
    return row;
  }



}

export = new UsuariosRepository();
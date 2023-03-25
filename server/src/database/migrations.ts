export const migrations = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS tipos_sanguineos (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    tipo VARCHAR(2) NOT NULL,
    fator VARCHAR(1) NOT NULL,
    quantidade VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );

  INSERT INTO tipos_sanguineos (id,tipo,fator,quantidade,created_at, updated_at) 
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','A','+', '1000', '2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'A' AND fator = '+'
  );

  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'A','-','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'A' AND fator = '-'
  );
  
  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'B','+','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'B' AND fator = '+'
  );

  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'B','-','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'B' AND fator = '-'
  );

  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'AB','+','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'AB' AND fator = '+'
  );
    
  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'AB','-','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'AB' AND fator = '-'
  );

  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'O','+','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'O' AND fator = '+'
  );

  INSERT INTO tipos_sanguineos (tipo,fator,quantidade,created_at, updated_at)
  SELECT 'O','-','0','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM tipos_sanguineos WHERE tipo = 'O' AND fator = '-'
  );
  
  CREATE TABLE IF NOT EXISTS estados (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    sigla VARCHAR(2) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );

  INSERT INTO estados (id,nome,sigla,created_at, updated_at)
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f7','Minas Gerais', 'MG', '2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM estados WHERE sigla = 'MG'
  );

  CREATE TABLE IF NOT EXISTS cidades (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    estado_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (estado_id) REFERENCES estados(id)
  );

  INSERT INTO cidades (id, nome, estado_id, created_at, updated_at)
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','João Monlevade', 'b30ae9e9-56ef-47de-bf58-64530d7a98f7','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM cidades WHERE id = 'b30ae9e9-56ef-47de-bf58-64530d7a98f8'
  );

  CREATE TABLE IF NOT EXISTS pessoas (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    documento VARCHAR(255) NOT NULL,
    cidade_id VARCHAR(255) NOT NULL,
    tipo_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidades(id),
    FOREIGN KEY (tipo_id) REFERENCES tipos_sanguineos(id)
  );

  INSERT INTO pessoas (id, nome, rua, numero, complemento, documento, cidade_id, tipo_id, created_at, updated_at)
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f8', 'Matheus', 'Avenida b1', '44', 'ap01', '12312312311', 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','b30ae9e9-56ef-47de-bf58-64530d7a98f8','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM pessoas WHERE id = 'b30ae9e9-56ef-47de-bf58-64530d7a98f8'
  );

  CREATE TABLE IF NOT EXISTS locais_coleta (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    rua VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    cidade_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
  );

  INSERT INTO locais_coleta (id, nome, rua, numero, complemento, cidade_id,created_at, updated_at)
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','LocalColeta1-Unidade1', 'Avenida x1', '99', '', 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM locais_coleta WHERE id = 'b30ae9e9-56ef-47de-bf58-64530d7a98f8'
  );

  CREATE TABLE IF NOT EXISTS doacoes (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    pessoa_id VARCHAR(255) NOT NULL,
    local_id VARCHAR(255) NOT NULL,
    tipo_id VARCHAR(255) NOT NULL,
    quantidade VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (pessoa_id) REFERENCES pessoas(id),
    FOREIGN KEY (local_id) REFERENCES locais_coleta(id)
  );


  INSERT INTO doacoes (id, pessoa_id, local_id, tipo_id, quantidade,  created_at, updated_at)
  SELECT 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','b30ae9e9-56ef-47de-bf58-64530d7a98f8',
  'b30ae9e9-56ef-47de-bf58-64530d7a98f8','b30ae9e9-56ef-47de-bf58-64530d7a98f8', '1000', '2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM doacoes WHERE id = 'b30ae9e9-56ef-47de-bf58-64530d7a98f8'
  );


  CREATE TABLE IF NOT EXISTS produtos (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    etiqueta VARCHAR(255) NOT NULL,
    doacao_id VARCHAR(255) NOT NULL,
    validade VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (doacao_id) REFERENCES doacoes(id)
  );

  CREATE TABLE IF NOT EXISTS unidades (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    complemento VARCHAR(255) NOT NULL,
    cidade_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (cidade_id) REFERENCES cidades(id)
  );

  INSERT INTO unidades (nome,numero, complemento, cidade_id,  created_at, updated_at)
  SELECT 'Undiade1', '56','', 'b30ae9e9-56ef-47de-bf58-64530d7a98f8','2023-01-01 00:00:00','2023-01-01 00:00:00'
  WHERE NOT EXISTS (
    SELECT 1 FROM unidades WHERE nome = 'Undiade1'
  );

  CREATE TABLE IF NOT EXISTS distribuicoes (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    produto_id VARCHAR(255) NOT NULL,
    unidade_id VARCHAR(255) NOT NULL,
    data VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (unidade_id) REFERENCES unidades(id)
  );

  CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(255) NOT NULL UNIQUE DEFAULT uuid_generate_v4(), 
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    updated_at VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );
  
`;

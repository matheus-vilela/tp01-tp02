import React, { useEffect, useState } from 'react';
import { DivProps } from '../../@types/global';
import { getAllPessoas } from '../../services';

import { Container } from './styles';

export type IPessoa = {
  id: string;
  cidade_id: string;
  created_at: string;
  documento: string;
  nome: string;
  numero: string;
  rua: string;
  tipo_id: string;
  updated_at: string;
};

const Pessoas: React.FC<DivProps> = ({ ...rest }) => {
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);

  useEffect(() => {
    onGetAllPessoas();
    const unsubscribe = setInterval(() => onGetAllPessoas(), 2000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllPessoas() {
    const { data } = await getAllPessoas();
    if (data) {
      setPessoas(data);
    }
  }

  return (
    <Container className={rest.className}>
      <h1>Pessoas</h1>
      {pessoas.map((item) => {
        return (
          <div className="item" key={item.id}>
            <div>
              <h1>Nome</h1>
              <h2>{item.nome}</h2>
            </div>
            <div>
              <h1>Documento</h1>
              <h2>{item.documento} </h2>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Pessoas;

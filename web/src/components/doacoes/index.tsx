import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { DivProps } from '../../@types/global';
import { getAllDoacoes, getLocalColetaById, getPessoaById, getTipoSanguineoById } from '../../services';

import { Container } from './styles';

export type IDoacoes = {
  created_at: string;
  id: string;
  local_id: string;
  pessoa_id: string;
  quantidade: string;
  updated_at: string;
  data: string;
  pessoa: any;
  localColeta: any;
  tipoSanguineo: any;
};

const Doacoes: React.FC<DivProps> = ({ ...rest }) => {
  const [tipos, setLocais] = useState<IDoacoes[]>([]);
  const theme = useTheme();
  useEffect(() => {
    onGetAllDoacoes();
    const unsubscribe = setInterval(() => onGetAllDoacoes(), 2000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllDoacoes() {
    const { data } = await getAllDoacoes();
    if (data) {
      const list: IDoacoes[] = [];
      await Promise.all(
        data.map(async (item: any) => {
          const [pessoa, localColeta, tipoSanguineo] = await Promise.all([
            await getPessoaById(item.pessoa_id),
            await getLocalColetaById(item.local_id),
            await getTipoSanguineoById(item.tipo_id),
          ]);
          console.log(tipoSanguineo.data);
          list.push({
            ...item,
            pessoa: pessoa.data,
            localColeta: localColeta.data,
            tipoSanguineo: tipoSanguineo.data,
          });
        })
      );
      setLocais(list.sort((a: any, b: any) => (a.created_at > b.created_at ? 1 : -1)));
    }
  }

  return (
    <Container className={rest.className}>
      <h1>Doações</h1>
      {tipos.map((item) => {
        return (
          <div className="item" key={item.id}>
            <div>
              <h1>Nome</h1>
              <h2>{item.pessoa.nome}</h2>
            </div>
            <div>
              <h1>Tipo</h1>
              <h2 style={{ color: theme.colors.error }}>{item.tipoSanguineo.tipo + item.tipoSanguineo.fator}</h2>
            </div>
            <div>
              <h1>Quantidade</h1>
              <h2>{item.quantidade} mls</h2>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Doacoes;

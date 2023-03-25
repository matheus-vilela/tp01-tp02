import React, { useEffect, useState } from 'react';
import { DivProps } from '../../@types/global';
import { getAllLocaisColeta, getCityById, getStateById } from '../../services';

import { Container } from './styles';

export type ILocaisColeta = {
  id: string;
  cidade_id: string;
  nome: string;
  numero: string;
  complemento: string;
  created_at: string;
  updated_at: string;
  cidade: string;
  estado_nome: string;
  estado_sigla: string;
};

const LocaisColeta: React.FC<DivProps> = ({ ...rest }) => {
  const [locais, setLocais] = useState<ILocaisColeta[]>([]);

  useEffect(() => {
    onGetAllLocaisColeta();
    const unsubscribe = setInterval(() => onGetAllLocaisColeta(), 2000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllLocaisColeta() {
    const { data } = await getAllLocaisColeta();

    if (data) {
      const list: ILocaisColeta[] = [];
      await Promise.all(
        data.map(async (item: any) => {
          const { data } = await getCityById(item.cidade_id);
          const { data: data2 } = await getStateById(data.estado_id);
          if (data) {
            list.push({
              ...item,
              cidade: data.nome,
              estado_nome: data2.nome,
              estado_sigla: data2.sigla,
            });
          }
        })
      );
      setLocais(list.sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1)));
    }
  }

  return (
    <Container className={rest.className}>
      <h1>Local de Coleta</h1>
      {locais.map((item) => {
        return (
          <div className="item" key={item.id}>
            <div>
              <h1>Nome</h1>
              <h2>{item.nome}</h2>
            </div>
            <div>
              <h1>Localidade</h1>
              <h2>
                {item.cidade} / {item.estado_sigla}
              </h2>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default LocaisColeta;

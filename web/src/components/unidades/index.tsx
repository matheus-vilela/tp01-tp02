import React, { useEffect, useState } from 'react';
import { DivProps } from '../../@types/global';
import { getAllUnidades, getCityById, getStateById } from '../../services';

import { Container } from './styles';

export type IUnidades = {
  id: string;
  cidade_id: string;
  created_at: string;
  updated_at: string;
  cidade: string;
  nome: string;
  numero: string;
  complemento: string;
  estado_nome: string;
  estado_sigla: string;
};

const Unidades: React.FC<DivProps> = ({ ...rest }) => {
  const [unidades, setUnidades] = useState<IUnidades[]>([]);

  useEffect(() => {
    onGetAllUnidades();
    const unsubscribe = setInterval(() => onGetAllUnidades(), 2000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllUnidades() {
    const { data } = await getAllUnidades();
    if (data) {
      const unidades: IUnidades[] = [];
      await Promise.all(
        data.map(async (item: any) => {
          const { data } = await getCityById(item.cidade_id);
          const { data: data2 } = await getStateById(data.estado_id);
          if (data) {
            unidades.push({
              ...item,
              cidade: data.nome,
              estado_nome: data2.nome,
              estado_sigla: data2.sigla,
            });
          }
        })
      );
      setUnidades(unidades.sort((a: any, b: any) => (a.nome > b.nome ? 1 : -1)));
    }
  }

  return (
    <Container className={rest.className}>
      <h1>Unidades</h1>
      {unidades.map((item) => {
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

export default Unidades;

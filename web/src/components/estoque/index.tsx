import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { DivProps } from '../../@types/global';
import { getAllTiposSanguineos } from '../../services';

import { Container } from './styles';

export type ITipoSanguineo = {
  id: string;
  tipo: string;
  fator: string;
  quantidade: number;
};

const Estoque: React.FC<DivProps> = ({ ...rest }) => {
  const [tipos, setTipos] = useState<ITipoSanguineo[]>([]);
  const theme = useTheme();
  useEffect(() => {
    onGetAllTiposSanguineos();
    const unsubscribe = setInterval(() => onGetAllTiposSanguineos(), 10000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllTiposSanguineos() {
    const { data } = await getAllTiposSanguineos();
    if (data) {
      setTipos(data);
    }
  }

  return (
    <Container className={rest.className} style={rest.style}>
      <h1>Estoque</h1>
      {tipos.map((item) => {
        return (
          <div className="item" key={item.id}>
            <div>
              <h1>Tipo sanguíneo</h1>
              <h2 style={{ color: theme.colors.error }}>{item.tipo + item.fator}</h2>
            </div>
            <div>
              <h1>Quantidade em estoque</h1>
              <h2>{item.quantidade / 1000} litros</h2>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default Estoque;

import React from 'react';
import Doacoes from '../../components/doacoes';
import Estoque from '../../components/estoque';
import Header from '../../components/header';
import Pessoas from '../../components/pessoas';
import Unidades from '../../components/unidades';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Header />
      <div className="content">
        <Estoque className="estoque" />
        <Unidades className="unidades" />
        <Doacoes className="doacoes" />
        <Pessoas className="pessoas" />
      </div>
    </Container>
  );
};

export default Home;

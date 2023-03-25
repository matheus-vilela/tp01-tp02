import { Route, Routes as RouteProvider } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import Doacao from '../pages/doacoes';

import Home from '../pages/home';
import Login from '../pages/login';
import Pessoa from '../pages/pessoas';
import Unidade from '../pages/unidades';

export function Routes() {
  const auth = useAuth();
  return (
    <RouteProvider>
      {auth.user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/unidade" element={<Unidade />} />
          <Route path="/doacao" element={<Doacao />} />
          <Route path="/pessoa" element={<Pessoa />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </RouteProvider>
  );
}

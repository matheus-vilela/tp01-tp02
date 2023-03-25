import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Doacoes from '../../components/doacoes';
import Header from '../../components/header';
import { ILocaisColeta } from '../../components/local-coleta';
import { IPessoa } from '../../components/pessoas';
import { getAllLocaisColeta, getAllPessoas, getCityById, getStateById, registerNewDoacao } from '../../services';

import { Container } from './styles';

type IADDRESS = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

const Doacao: React.FC = () => {
  const theme = useTheme();
  const [address, setAddress] = useState<IADDRESS | null>();
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [locais, setLocais] = useState<ILocaisColeta[]>([]);

  useEffect(() => {
    onGetAllPessoas();
    onGetAllLocaisColeta();
    const unsubscribe = setInterval(() => [onGetAllPessoas(), onGetAllLocaisColeta()], 2000);
    return () => clearInterval(unsubscribe);
  }, []);

  async function onGetAllPessoas() {
    const { data } = await getAllPessoas();
    if (data) {
      setPessoas(data);
    }
  }

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const props = Object.fromEntries(formData);

    if (props) {
      const { pessoa, local, quantidade, fator, tipo } = props as unknown as any;

      const { data } = await registerNewDoacao({
        pessoa_id: pessoa,
        local_id: local,
        quantidade,
        fator,
        tipo,
      });
      if (!data.error) {
        form.reset();
      } else {
        console.log('ERRO ==> ', data.error);
      }
      console.log('DATA ==> ', data);
    }
  }

  return (
    <Container>
      <Header />
      <div className="content">
        <Doacoes className="pessoas" />
        <div className="cadastro">
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <select name="pessoa">
              <option value="">Selecione a pessoa</option>
              {pessoas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
            <select name="local">
              <option value="">Selecione o local</option>
              {locais.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>

            <input type="text" placeholder="Quantidade em mls" name="quantidade" />
            <input type="text" placeholder="Tipo Sanguineo" name="tipo" />
            <input type="text" placeholder="Fator" name="fator" />

            <div>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Doacao;

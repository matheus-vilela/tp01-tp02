import axios from 'axios';
import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import Header from '../../components/header';
import LocaisColeta from '../../components/local-coleta';
import Unidades from '../../components/unidades';
import { registerNewColeta, registerNewUnidade } from '../../services';

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

const ESTADOS = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goiás',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraima',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins',
};

const Unidade: React.FC = () => {
  const [tipo, setTipoe] = useState('');
  const theme = useTheme();
  const [address, setAddress] = useState<IADDRESS | null>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const props = Object.fromEntries(formData);

    if (props && address) {
      const { name: nome, numero, CEP, bairro, complemento } = props as unknown as any;
      if (tipo === 'unidade') {
        const { data } = await registerNewUnidade({
          nome,
          numero,
          CEP,
          estado: ESTADOS[address.uf as keyof typeof ESTADOS],
          bairro: address.bairro ? address.bairro : bairro,
          complemento,
          cidade: address.localidade,
          sigla: address.uf,
        });
        if (!data.error) {
          form.reset();
          setTipoe('');
        } else {
          console.log('ERRO ==> ', data.error);
        }
        console.log('DATA ==> ', data);
      } else if (tipo === 'coleta') {
        const { data } = await registerNewColeta({
          nome,
          numero,
          rua: address.logradouro,
          CEP,
          estado: ESTADOS[address.uf as keyof typeof ESTADOS],
          bairro: address.bairro ? address.bairro : bairro,
          complemento,
          cidade: address.localidade,
          sigla: address.uf,
        });
        if (!data.error) {
          form.reset();
          setTipoe('');
        } else {
          console.log('ERRO ==> ', data.error);
        }
        console.log('DATA ==> ', data);
      }
    }
  }

  async function handleCep(e: any) {
    const prop = e.target.value.replace('-', '');
    if (prop.length === 8) {
      const { data } = await axios.get(`https://viacep.com.br/ws/${prop}/json/`);
      if (data) {
        console.log('CEP ==> ', data);
        setAddress(data);
      }
    }
  }

  return (
    <Container>
      <Header />
      <div className="content">
        <Unidades className="unidades" />
        <LocaisColeta className="localColeta" />
        <div className="cadastro">
          <h1>Cadastrar</h1>
          <form onSubmit={handleSubmit}>
            <select name="tipo" onChange={(e) => setTipoe(e.target.value)} value={tipo}>
              <option value="">Selecione o tipo</option>
              <option value="unidade">Unidade</option>
              <option value="coleta">Local de Coleta</option>
            </select>
            {tipo !== '' && (
              <>
                <input type="text" placeholder="Nome" name="name" />
                <input type="text" placeholder="CEP" name="CEP" onChange={handleCep} />
                {address && (
                  <>
                    <input
                      type="text"
                      placeholder="Endereço"
                      name="rua"
                      disabled
                      value={address.logradouro}
                      style={{
                        backgroundColor: theme.colors.background,
                      }}
                    />
                    <input type="text" placeholder="Número" name="numero" />
                    <input type="text" placeholder="Complemento" name="complemento" />
                    <input
                      type="text"
                      placeholder="Bairro"
                      name="bairro"
                      disabled={!!address.bairro}
                      style={{
                        backgroundColor: address.bairro ? theme.colors.background : theme.colors.foreground,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Cidade"
                      name="cidade"
                      disabled
                      value={address.localidade}
                      style={{
                        backgroundColor: theme.colors.background,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Estado"
                      name="estado"
                      disabled
                      value={ESTADOS[address.uf as keyof typeof ESTADOS]}
                      style={{
                        backgroundColor: theme.colors.background,
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Sigla"
                      name="sigla"
                      disabled
                      value={address.uf}
                      style={{
                        backgroundColor: theme.colors.background,
                      }}
                    />
                  </>
                )}
              </>
            )}
            <div>
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Unidade;

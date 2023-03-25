import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 10000,
});

export type ISignIn = {
  email: string;
  password: string;
};

export const signInWithEmailAndPassword = async (data: ISignIn) => {
  return api.post('/login', {
    email: data.email,
    senha: data.password,
  });
};

export type ICreateUser = {
  name: string;
  email: string;
  password: string;
};

export const registerNewUser = async (data: ICreateUser) => {
  return api.post('/usuarios', {
    nome: data.name,
    email: data.email,
    senha: data.password,
  });
};
export const registerNewUnidade = async (data: any) => {
  return api.post('/unidades', {
    ...data,
  });
};
export const registerNewPessoa = async (data: any) => {
  return api.post('/pessoas', {
    ...data,
  });
};
export const registerNewColeta = async (data: any) => {
  return api.post('/locais-coleta', {
    ...data,
  });
};
export const registerNewDoacao = async (data: any) => {
  return api.post('/doacoes', {
    ...data,
  });
};

export const getAllTiposSanguineos = async () => {
  return api.get('/tipos-sanguineos');
};
export const getAllLocaisColeta = async () => {
  return api.get('/locais-coleta');
};
export const getAllUnidades = async () => {
  return api.get('/unidades');
};
export const getAllPessoas = async () => {
  return api.get('/pessoas');
};
export const getAllDoacoes = async () => {
  return api.get('/doacoes');
};

export const getCityById = async (id: string) => {
  return api.get('/cidades/' + id);
};
export const getStateById = async (id: string) => {
  return api.get('/estados/' + id);
};
export const getPessoaById = async (id: string) => {
  return api.get('/pessoas/' + id);
};
export const getLocalColetaById = async (id: string) => {
  return api.get('/locais-coleta/' + id);
};
export const getTipoSanguineoById = async (id: string) => {
  return api.get('/tipos-sanguineos/' + id);
};

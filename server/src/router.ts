import cidades from 'app/controllers/cidades';
import distribuicoes from 'app/controllers/distribuicoes';
import doacoes from 'app/controllers/doacoes';
import estados from 'app/controllers/estados';
import locaisColeta from 'app/controllers/locais-coleta';
import pessoas from 'app/controllers/pessoas';
import produtos from 'app/controllers/produtos';
import tiposSanguineos from 'app/controllers/tipos-sanguineos';
import unidades from 'app/controllers/unidades';
import usuarios from 'app/controllers/usuarios';

import { Router } from 'express';

const router = Router();

router.get('/cidades', cidades.index);
router.get('/cidades/:id', cidades.show);
router.post('/cidades', cidades.create);
router.put('/cidades/:id', cidades.update);
router.delete('/cidades/:id', cidades.delete);

router.get('/distribuicoes', distribuicoes.index);
router.get('/distribuicoes/:id', distribuicoes.show);
router.post('/distribuicoes', distribuicoes.create);
router.put('/distribuicoes/:id', distribuicoes.update);
router.delete('/distribuicoes/:id', distribuicoes.delete);

router.get('/doacoes', doacoes.index);
router.get('/doacoes/:id', doacoes.show);
router.post('/doacoes', doacoes.create);
router.put('/doacoes/:id', doacoes.update);
router.delete('/doacoes/:id', doacoes.delete);

router.get('/estados', estados.index);
router.get('/estados/:id', estados.show);
router.post('/estados', estados.create);
router.put('/estados/:id', estados.update);
router.delete('/estados/:id', estados.delete);

router.get('/locais-coleta', locaisColeta.index);
router.get('/locais-coleta/:id', locaisColeta.show);
router.post('/locais-coleta', locaisColeta.create);
router.put('/locais-coleta/:id', locaisColeta.update);
router.delete('/locais-coleta/:id', locaisColeta.delete);

router.get('/pessoas', pessoas.index);
router.get('/pessoas/:id', pessoas.show);
router.post('/pessoas', pessoas.create);
router.put('/pessoas/:id', pessoas.update);
router.delete('/pessoas/:id', pessoas.delete);

router.get('/produtos', produtos.index);
router.get('/produtos/:id', produtos.show);
router.post('/produtos', produtos.create);
router.put('/produtos/:id', produtos.update);
router.delete('/produtos/:id', produtos.delete);

router.get('/tipos-sanguineos', tiposSanguineos.index);
router.get('/tipos-sanguineos/:id', tiposSanguineos.show);
router.post('/tipos-sanguineos', tiposSanguineos.update);

router.get('/unidades', unidades.index);
router.get('/unidades/:id', unidades.show);
router.post('/unidades', unidades.create);
router.put('/unidades/:id', unidades.update);
router.delete('/unidades/:id', unidades.delete);

router.get('/usuarios', usuarios.index);
router.get('/usuarios/:id', usuarios.show);
router.post('/usuarios', usuarios.create);
router.put('/usuarios/:id', usuarios.update);
router.delete('/usuarios/:id', usuarios.delete);

router.post('/login', usuarios.signIn);

export default router;

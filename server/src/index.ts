import cors from 'cors';
import { query } from 'database/connection';
import { migrations } from 'database/migrations';
import express from 'express';
import router from 'router';

const app = express();

app.use(cors());
// app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.listen(3002,async  ()=>{
    await query(migrations);
    console.log('\n🚀 ==> Servidor rodando na porta 3002 (http://localhost:3002/)\n');
});


const express = require('express');
const app = express();
app.use(express.json());

const tarefas = [
    {
        id: 1,
        titulo: 'Lavar o carro',
        concluida: true
    },
    {
        id: 2,
        titulo: 'Fazer bolo',
        concluida: false
    },
    {
        id: 3,
        titulo: 'Varrer a calçada',
        concluida: true
    }
];

app.get('/', (req, res) => {
    res.status(200).send('API de Tarefas no Ar');
});
// GET / -> retorna "API de Tarefas no Ar"

app.get('/tarefas', (req, res) => {
    const { concluida } = req.query;

    if (concluida === undefined) {
        return res.status(200).json(tarefas);
    };

    const buscaConcluida = tarefas.filter( p => p.concluida === (concluida === 'true') );

    if (buscaConcluida.length === 0) {
        return res.status(404).json({error: "Tarefas não encontradas"});
    };

    res.status(200).json(buscaConcluida);
});
// GET /tarefas -> lista todas as tarefas 
// Resposta: [{"id":1,"titulo":"Lavar o carro","concluida":true},
// {"id":2,"titulo":'Fazer bolo',"concluida":false},
// {"id":3,"titulo":'Varrer a calçada',"concluida": true}]

// GET /tarefas?concluida=false -> filtra por status. 
// Resposta: {"id":2,"titulo":'Fazer bolo',"concluida":false}

app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const buscaId = tarefas.find( p => p.id === Number(id));

    if (!buscaId) {
        return res.status(404).json({error: "Tarefa não encontrada."});
    };

    res.status(200).json(buscaId);
});

// GET /tarefas/2 -> retorna a tarefa com esse id, ou 404 se não existir
// Resposta: {"id":2,"titulo":'Fazer bolo',"concluida":false},

function autenticacao(req, res, next) {
    const autorizado = req.headers['authorization'];

    if (!autorizado) {
        return res.status(401).json({ error: "Não autorizado" });
    }

    next();
}

function validacaoBody(req, res, next) {
    if (!req.body.titulo) {
        return res.status(400).json({ error: "O campo título é obrigatório" });
    }

    next();
}

function log(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} - ${req.url} - titulo: "${req.body.titulo}"`);
    next();
}

// POST /tarefas, body: { "titulo": "Estudar Express" } -> cria a tarefa e retorna 201
// Resposta: {"id":4,"titulo": "Estudar Express","concluida":false}
app.post('/tarefas', [autenticacao, validacaoBody, log],(req, res) => {
    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo, 
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.listen(3000);
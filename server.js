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

// GET / -> retorna "API de Tarefas no Ar"
app.get('/', (req, res) => {
    res.status(200).send('API de Tarefas no Ar');
});

// GET /tarefas -> lista todas as tarefas
// GET /tarefas?concluida=true -> filtra por status. Resposta: [{ id: ... , titulo: ... , concluida: true }]
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

// GET /tarefas/2 -> retorna a tarefa com esse id, ou 404 se não existir
app.get('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const buscaId = tarefas.find( p => p.id === Number(id));

    if (!buscaId) {
        return res.status(404).json({error: "Tarefa não encontrada."});
    };

    res.status(200).json(buscaId);
});

// POST /tarefas, body: { "titulo": "Estudar Express" } -> cria e mostra a tarefa e retorna 201
app.post('/tarefas', (req, res) => {
    if (!req.body.titulo) {
            return res.status(400).json({error: "O campo título é obrigatório"})
        };

    const novaTarefa = {
        id: tarefas.length + 1,
        titulo: req.body.titulo, 
        concluida: false
    };

    tarefas.push(novaTarefa);
    res.status(201).json(novaTarefa);
});

app.listen(3000);
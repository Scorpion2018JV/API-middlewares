const express = require('express');
const app = express();

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

app.get ('/', (req, res) => {
    res.status(200).send('API de Tarefas no Ar');
});

app.get ('/tarefas', (req, res) => {
    const { concluida } = req.query;

    if (concluida === undefined) {
        return res.status(200).json(tarefas);
    }

    const buscaConcluida = tarefas.filter( p => p.concluida === (concluida === 'true') );
    
    if (!buscaConcluida) {
        return res.status(404).json({error: "Tarefas não encontradas"})
    }

    res.status(200).json(buscaConcluida)
});

app.get ('/tarefas/:id', (req, res) => {
    const { id } = req.params;
    const buscaId = tarefas.find( p => p.id === Number(id));

    if (!buscaId) {
        return res.status(404).json({error: "Tarefa não encontrada."});
    }

    res.status(200).json(buscaId);
});

app.listen(3000);
const express = require('express');
const app = express();


const tarefas = [
    {
        id: 1,
        titulo: 'Lavar o carro',
        status: 'Concluída'
    },
    {
        id: 2,
        titulo: 'Fazer bolo',
        status: 'Pendente',
    },
    {
        id: 3,
        titulo: 'Varrer a calçada',
        status: 'Concluída'
    }
];

app.get ('/', (req, res) => {
    res.send('API de Tarefas no Ar')
});

app.get ('/tarefas', (req, res) => {
    res.json(tarefas)
});
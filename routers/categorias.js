const express = require('express');
const router = express.Router();
const db = require('../data'); // Importação padronizada do banco em memória

// Listar todas as categorias
router.get('/', (req, res) => {
    res.json(db.categorias);
});

// Criar nova categoria com ID incremental
router.post('/', (req, res) => {
    if (!req.body.nome) {
        return res.status(400).json({ message: "O nome da categoria é obrigatório" });
    }

    const novaCategoria = {
        // Busca o maior ID atual para evitar duplicatas
        id: db.categorias.length > 0 ? Math.max(...db.categorias.map(c => c.id)) + 1 : 1,
        nome: req.body.nome
    };
    
    db.categorias.push(novaCategoria);
    res.status(201).json(novaCategoria);
});

module.exports = router;
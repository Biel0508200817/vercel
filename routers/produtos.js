const express = require('express');
const router = express.Router();
const db = require('../database'); // Ajustado para o caminho correto

// Listar produtos (com filtro opcional por categoriaId via Query String)
router.get('/', (req, res) => {
    const { categoriaId } = req.query;
    
    if (categoriaId) {
        const produtosFiltrados = db.produtos.filter(p => p.categoriaId === parseInt(categoriaId));
        return res.json(produtosFiltrados);
    }
    
    res.json(db.produtos);
});

// Buscar um único produto por ID
router.get('/:id', (req, res) => {
    const produto = db.produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ message: "Produto não encontrado" });
    res.json(produto);
});

// Adicionar novo produto
router.post('/', (req, res) => {
    const { categoriaId, nome, descricao, preco, image } = req.body;

    const novoProduto = {
        // Lógica para garantir ID único baseado no maior valor existente
        id: db.produtos.length > 0 ? Math.max(...db.produtos.map(p => p.id)) + 1 : 1,
        categoriaId: parseInt(categoriaId),
        nome,
        descricao,
        preco,
        image
    };

    db.produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// Atualizar produto existente (Correção de sintaxe e lógica)
router.put('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const index = db.produtos.findIndex(p => p.id === produtoId);

    if (index !== -1) {
        // Mescla os dados atuais com os novos recebidos no body
        db.produtos[index] = {
            ...db.produtos[index],
            ...req.body,
            id: produtoId // Protege o ID original
        };
        res.json(db.produtos[index]);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});

// Remover produto
router.delete('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    const existe = db.produtos.some(p => p.id === produtoId);

    if (!existe) return res.status(404).json({ message: "Produto não encontrado" });

    db.produtos = db.produtos.filter(p => p.id !== produtoId);
    res.json({ message: 'Produto deletado com sucesso' });
});

module.exports = router;
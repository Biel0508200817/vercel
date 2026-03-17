const express = require('express');
const cors = require('cors'); // <-- Adicionado: Importação do CORS

const app = express();

// --- 1. MIDDLEWARES GLOBAIS (Sempre no topo) ---
app.use(cors()); // Permite que front-ends em outras portas acessem a API
app.use(express.json()); // Permite ler JSON no corpo das requisições (req.body)

// Middleware de Logger customizado
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] Recebeu requisição: ${req.method} ${req.url}`);
    next(); // Passa a bola para a próxima rota
});

// --- DADOS EM MEMÓRIA ---
let produtos = [
    // --- GPU (Categoria: gpu) ---
    { id: 1, nome: "RTX 4090 Rog Strix", preco: 13500.00, categoria: "gpu", descricao: "24GB GDDR6X - Top de linha." },
    { id: 2, nome: "RTX 4080 Super", preco: 7900.00, categoria: "gpu", descricao: "16GB GDDR6X." },
    { id: 3, nome: "RTX 4070 Ti Super", preco: 5800.00, categoria: "gpu", descricao: "16GB GDDR6X." },
    { id: 4, nome: "RX 7900 XTX", preco: 7200.00, categoria: "gpu", descricao: "24GB AMD Radeon." },
    { id: 5, nome: "RTX 4060 Ti", preco: 2600.00, categoria: "gpu", descricao: "8GB Ray Tracing." },

    // --- PROCESSADOR (Categoria: cpu) ---
    { id: 6, nome: "Ryzen 7 7800X3D", preco: 2950.00, categoria: "cpu", descricao: "Rei dos Games." },
    { id: 7, nome: "Core i9-14900K", preco: 3800.00, categoria: "cpu", descricao: "24 Cores." },
    { id: 8, nome: "Ryzen 5 7600X", preco: 1450.00, categoria: "cpu", descricao: "AM5 Performance." },
    { id: 9, nome: "Core i5-14600K", preco: 1950.00, categoria: "cpu", descricao: "14 Cores." },

    // --- RAM (Categoria: ram) ---
    { id: 10, nome: "Corsair 32GB DDR5", preco: 1100.00, categoria: "ram", descricao: "6000MHz Kit." },
    { id: 11, nome: "Kingston 16GB DDR4", preco: 350.00, categoria: "ram", descricao: "3200MHz Fury." },

    // --- SSD (Categoria: ssd) ---
    { id: 12, nome: "Samsung 990 Pro 2TB", preco: 1450.00, categoria: "ssd", descricao: "7450MB/s." },
    { id: 13, nome: "Kingston NV2 1TB", preco: 450.00, categoria: "ssd", descricao: "M.2 NVMe." },

    // --- PCS MONTADOS (Categoria: pcs) ---
    { id: 14, nome: "PC Ultimate 4090", preco: 25000.00, categoria: "pcs", descricao: "i9 + RTX 4090." },
    { id: 15, nome: "PC Budget King", preco: 4800.00, categoria: "pcs", descricao: "R5 + RTX 3060." }
];

// --- 2. ROTAS DA API ---

// 1. Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// 2. Listar categorias únicas
app.get('/categorias', (req, res) => {
    const categoriasUnicas = [...new Set(produtos.map(p => p.categoria))];
    res.json(categoriasUnicas);
});

// 3. Buscar produtos por categoria
app.get('/produtos/categoria/:nomeCategoria', (req, res) => {
    const { nomeCategoria } = req.params;
    const produtosFiltrados = produtos.filter(
        p => p.categoria.toLowerCase() === nomeCategoria.toLowerCase()
    );
    res.json(produtosFiltrados);
});

// 4. Criar um novo hardware
app.post('/produtos', (req, res) => {
    const { nome, preco, categoria, descricao } = req.body;
    
    if (!nome || !preco || !categoria) {
        return res.status(400).json({ message: "Nome, preço e categoria são obrigatórios." });
    }

    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1, 
        nome,
        preco: parseFloat(preco),
        categoria,
        descricao: descricao || ""
    };
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// 5. Atualizar hardware
app.put("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria, descricao } = req.body;
    const index = produtos.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        produtos[index] = { 
            id: parseInt(id), 
            nome: nome || produtos[index].nome, 
            preco: preco ? parseFloat(preco) : produtos[index].preco, 
            categoria: categoria || produtos[index].categoria,
            descricao: descricao || produtos[index].descricao
        };
        res.json(produtos[index]);
    } else {
        res.status(404).json({ message: "Hardware não encontrado" });
    }
});

// 6. Deletar hardware
app.delete("/produtos/:id", (req, res) => {
    const { id } = req.params;
    const index = produtos.findIndex(p => p.id === parseInt(id));
    
    if (index !== -1) {
        produtos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Hardware não encontrado" });
    }
});

// --- 3. MIDDLEWARES DE TRATAMENTO FINAIS (Sempre no fim) ---

// Middleware de Rota Não Encontrada (404)
app.use((req, res, next) => {
    res.status(404).json({ error: "Rota não encontrada na API de Hardware." });
});

// Middleware de Tratamento de Erros Globais (500)
app.use((err, req, res, next) => {
    console.error("Erro interno:", err.stack);
    res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
});

const PORT = process.env.PORT || 3000; // Permite configurar a porta via variável de ambiente

// --- 4. INICIALIZAÇÃO DO SERVIDOR ---
app.listen(PORT, () => {
    console.log(`Servidor de Hardware rodando em :${PORT}`);
    
});
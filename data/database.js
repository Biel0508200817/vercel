const categorias = [
    { id: 1, nome: "GPU" },
    { id: 2, nome: "PROCESSADOR" },
    { id: 3, nome: "RAM" },
    { id: 4, nome: "PLACA MÃE" },
    { id: 5, nome: "SSDS" },
    { id: 6, nome: "HDS" }, // Was empty
    { id: 7, nome: "GABINETES" },
    { id: 8, nome: "PERIFERICOS" },
    { id: 9, nome: "PCS MONTADOS" }
];

const produtos = [
    {
        id: 1, // Added ID
        categoriaId: 1,
        nome: "RTX 4090 Rog Strix",
        descricao: "24GB GDDR6X - Top de linha.",
        preco: 13500.00,
        imagem: "https://link-da-imagem.com/rtx4090.jpg"
    },
    {
        id: 2,
        categoriaId: 2,
        nome: "Ryzen 7 7800X3D",
        descricao: "Rei dos Games - Tecnologia 3D V-Cache.",
        preco: 2950.00,
        imagem: "https://link-da-imagem.com/7800x3d.jpg"
    },
    {
        id: 3,
        categoriaId: 3,
        nome: "Corsair 32GB DDR5",
        descricao: "6000MHz Kit dual channel.",
        preco: 1100.00,
        imagem: "https://link-da-imagem.com/ram-ddr5.jpg"
    },
    {
        id: 4,
        categoriaId: 4,
        nome: "Asus ROG Z790",
        descricao: "LGA 1700 DDR5 - Suporte total a 14ª Gen.",
        preco: 4200.00,
        imagem: "https://link-da-imagem.com/z790.jpg"
    },
    {
        id: 5,
        categoriaId: 5,
        nome: "Samsung 990 Pro 2TB",
        descricao: "Leitura de 7450MB/s - NVMe Gen4.",
        preco: 1450.00,
        imagem: "https://link-da-imagem.com/ssd-samsung.jpg"
    },
    {
        id: 6, // Added item for Categoria 6
        categoriaId: 6,
        nome: "Seagate IronWolf 4TB",
        descricao: "HDD para NAS - Alta durabilidade.",
        preco: 680.00,
        imagem: "https://link-da-imagem.com/hd-ironwolf.jpg"
    },
    {
        id: 7,
        categoriaId: 7,
        nome: "Lian Li O11 Dynamic",
        descricao: "Black/Glass - O queridinho dos setups.",
        preco: 1300.00,
        imagem: "https://link-da-imagem.com/lian-li.jpg"
    },
    {
        id: 8,
        categoriaId: 8,
        nome: "Logitech G Pro X Superlight 2",
        descricao: "Mouse wireless ultraleve profissional.",
        preco: 850.00,
        imagem: "https://link-da-imagem.com/mouse-gpro.jpg"
    },
    {
        id: 9,
        categoriaId: 9,
        nome: "PC Ultimate 4090",
        descricao: "Configuração completa: i9 + RTX 4090.",
        preco: 25000.00,
        imagem: "https://link-da-imagem.com/pc-montado.jpg"
    },
    {
        id: 10, // Bonus: Second GPU
        categoriaId: 1,
        nome: "Radeon RX 7900 XTX",
        descricao: "24GB GDDR6 - Excelente custo-benefício 4K.",
        preco: 7200.00,
        imagem: "https://link-da-imagem.com/7900xtx.jpg"
    }
];

module.exports = { categorias, produtos };
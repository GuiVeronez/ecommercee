// Referências
const botoesAdicionar = document.querySelectorAll('.add-carrinho');
const carrinho = document.getElementById('carrinho');
const toggleCarrinho = document.getElementById('toggle-carrinho');
const listaCarrinho = document.getElementById('itens-carrinho');
const totalElemento = document.getElementById('total');
const quantidadeItens = document.getElementById('quantidade-itens');
const finalizarCompra = document.getElementById('finalizar-compra');

let total = 0;
let quantidade = 0;
let itensCarrinho = [];

// Abrir e fechar carrinho
toggleCarrinho.addEventListener('click', () => {
    carrinho.classList.toggle('ativo');
});

// Adicionar ao carrinho
botoesAdicionar.forEach((botao) => {
    botao.addEventListener('click', (e) => {
        const produto = e.target.closest('.card');
        const nome = produto.dataset.nome;
        const preco = parseFloat(produto.dataset.preco);

        const li = document.createElement('li');
        li.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
        listaCarrinho.appendChild(li);

        itensCarrinho.push({ nome, preco });
        total += preco;
        quantidade++;
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
        quantidadeItens.textContent = quantidade;
    });
});

// Finalizar compra
finalizarCompra.addEventListener('click', async () => {
    if (itensCarrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    const urlPagamento = 'https://jsonplaceholder.typicode.com/posts'; // API fake
    const payload = {
        itens: itensCarrinho,
        total: total,
    };

    try {
        const response = await fetch(urlPagamento, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Erro ao processar pagamento.');

        const data = await response.json();
        alert(`Compra finalizada com sucesso! ID da transação: ${data.id}`);
        // Reset do carrinho
        listaCarrinho.innerHTML = '<p>Adicione itens para vê-los aqui.</p>';
        total = 0;
        quantidade = 0;
        itensCarrinho = [];
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
        quantidadeItens.textContent = quantidade;
    } catch (error) {
        alert('Erro ao finalizar a compra. Tente novamente mais tarde.');
        console.error(error);
    }
});

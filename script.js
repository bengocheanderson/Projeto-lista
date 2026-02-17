let itens = JSON.parse(localStorage.getItem("minhaLista")) || [];
const botao = document.querySelector("#btn");
const input = document.querySelector("#entradadedados");
const lista = document.querySelector("#lista");
const btnLimpar = document.querySelector("#btn-limpar");


botao.addEventListener("click", adicionarItem);
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") adicionarItem();
});

btnLimpar.addEventListener("click", () => {
    itens = itens.filter(item => !item.concluida);
    salvarLista();
    carregarLista();
});

lista.addEventListener("click", (event) => {
    const botao = event.target.closest("button");
    if (botao) {
        if (botao.classList.contains("btn-check")) {
            const id = botao.dataset.id;
            itens = itens.map(item => {
                if (item.id == id){
                return {...item, concluida: !item.concluida};
                
            }
            return item;    
        });
        salvarLista();
        carregarLista();
        
        }else if (botao.classList.contains("btn-excluir")) {
            const id = botao.dataset.id;
            itens = itens.filter(item => item.id != id);
            salvarLista();
            carregarLista();
        }
    }
});

function adicionarItem() {
    const valor = input.value.trim();
    if(!valor) return;

    itens.push({
        id: Date.now(),
        texto: valor,
        concluida: false
    });
    salvarLista();
    carregarLista();
    input.value = "";
}

function salvarLista() {
    localStorage.setItem("minhaLista", JSON.stringify(itens));
}

    
function carregarLista() {   
    lista.innerHTML = "";
    
    itens.forEach((item, index) => {
        
        const li = document.createElement("li");
        
        const span = document.createElement("span");
        span.textContent = item.texto;
        if (item.concluida) {
            span.classList.add("concluida");
        }
        
        const btnConcluir = document.createElement("button");
        btnConcluir.classList.add("btn-check");
        btnConcluir.textContent = "✓";
        btnConcluir.dataset.id = item.id;
        
        
        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.textContent = "X";
        btnExcluir.dataset.id = item.id;
        
        li.appendChild(btnConcluir);
        li.appendChild(span);
        li.appendChild(btnExcluir);
        lista.appendChild(li);
        
    });
}

carregarLista();
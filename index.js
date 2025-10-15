/* Comentario em cima e conteudo do comentario abaixo */

/* Seleciona o botão de adicionar tarefa no HTML e guarda dentro da variável "botao" */
const botao = document.getElementById("botao");

/* Seleciona a lista aonde as tarefas vão aparecer e guarda dentro da variável */
const lista = document.getElementById("tarefas");

/* Seleciona o campo de digitação da tarefa e guarda dentro da variável input */
const input = document.getElementById("input-tarefa");

/* Adiciona um "ouvinte de evento(Event listener)" que vai executar a função adicionarTarefa() */
/* Toda vez que o usuario aperta o botão */
botao.addEventListener("click", adiciona);

/* Cria a função que adiciona uma novas tarefa */
function adicionarTarefa() {
  /* cria uma variavel "texto" e guarda o valor digitado no input, removendo espaços vazios */
  const texto = input.value.trim();

  /* se o campo estiver vazio(sem texto) o codigo "retorna"(Não adiciona nada)*/
  if (!texto) return;

  /* Cria um novo elemento HTML do tipo <li>(item da lista) e guarada dentro da variavel "item" */
  const item = document.createElement("li");

  /* Define o texo que vai aparecer dentro do item (o que o usuario digitou) */
  item.textContent = texto;

  /* Adiciona um evento de click em cada tarefa criada  */
  /* quando o usuario clicar 1 vez o JS vai alternar (ligar/desligar) */
  /* a classe "DONE"  que risca o texto e muda o estilo(CSS)*/
  item.addEventListener("click", () => item.classList.toggle("done"));

  /* Adiciona o duplo click (dblclick) */
  /* Clicar 2 vezes na tarefa remove ela da lista */
  item.addEventListener("dblclick", () => lista.removeChild(item));

  /* Adiciona o novo item (a tarefa criada) dentro da lista principal do HTML */
  lista.appendChild(item);

  /* Limpa o campo de digitação, deixa ele vaizo depois que a tarefa é adicionada */
  input.value = "";
}

function adiciona() {
  /* Pega o valor digitado no campo de input com id='input-tarefa' */
  let valor = document.getElementById("input-tarefa").value.trim();

  /* se o campo estiver vazio, alerta o usuário */
  if (valor === "") {
    alert("Informe uma tarefa!");
    return; /* sai dda função e não continua */
  }

  /* Verifica se já existe algo salvo no localStorage(ou cria um array vazio) */
  let listadeTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  /* Adiciona a nova tarefa ao array */
  listadeTarefas.push(valor);

  /* Salva novamente no localStorage, converteendo o array para texto JSON */
  localStorage.setItem("tarefas", JSON.stringify(listadeTarefas));

  /* Limpa o campo de input para o usuário digitar outra tarefa */
  document.getElementById("input-tarefa").value = "";

  /* Atualiza a area de exibição chamando a função que mostra as tarefas */
  mostraTarefa();
}

/* Função seaparada para mostrar as tarefas na tela */
function mostraTarefa() {
  let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let saida = document.getElementById("tarefas"); // <ul id="tarefas">

  /* Limpa o conteúdo antes de mostrar */
  saida.innerHTML = "";

  tarefasSalvas.forEach((tarefa, index) => {
    // aceita string antiga OU objeto novo
    const texto = typeof tarefa === "string" ? tarefa : tarefa.texto;
    const done = typeof tarefa === "string" ? false : !!tarefa.done;

    const li = document.createElement("li");
    li.textContent = texto;
    if (done) li.classList.add("done");

    li.addEventListener("click", () => {
      // garanta o objeto para salvar estado
      const obj = typeof tarefa === "string" ? { texto, done: false } : tarefa;
      obj.done = !obj.done;
      tarefasSalvas[index] = obj;
      localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));
      mostraTarefa();
    });

    li.addEventListener("dblclick", () => {
      tarefasSalvas.splice(index, 1);
      localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas));
      mostraTarefa();
    });

    saida.appendChild(li);
  });
}

/* Chama a função assim que a página abrir, para carregar as tarefas antigas  */
document.addEventListener("DOMContentLoaded", mostraTarefa);


/* Botão para limpar toda a lista */
document.getElementById("limpar").addEventListener("click", () => {
  localStorage.removeItem("tarefas"); // apaga tudo do localStorage
  mostraTarefa(); // limpa a tela
});

/* Cria uma variavel para o botão da lua(tema claro/escuro) */
const mode = document.getElementById("mode-icon");



/*  Seleciona o corpo da pagina (aonde apliquei a classe dark)*/
const body = document.body;
/* Seleciona a imagem principal */
const ilustracao = document.getElementById('ilustracao-img');

/* Funçao principal de alternância de tema */
/* ------------------------------------------- */
mode.addEventListener('click',() => {
       /* Alterna a classe 'dark  no body*/
  const darkmode = body.classList.toggle('dark');


/* troca o icone de lua pra sol  */
  if(darkmode) {
    mode.classList.replace('fa-moon', 'fa-sun');
  } else{
    mode.classList.replace('fa-sun', 'fa-moon');
  }
/* trica a imagem com base no dataset */
  ilustracao.src = ilustracao.dataset[darkmode? 'dark' : 'light'];
/* Salva o estado atual no localstorage , para lembrar na proxima vez */
  localStorage.setItem('theme', darkmode ? 'dark' : 'light');
} );

/* -----------------------------
   Aplica o tema salvo ao carregar a página
------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  
  /* Verifica se existe tema salvo */
  const savedtheme = localStorage.getItem('theme');

  /* Define a imagem inicial de acordo com o tema salvo */
  ilustracao.src = ilustracao.dataset[savedtheme === 'dark' ? 'dark' : 'light'];

  /* Se for 'dark , aplica o tema e muda icone/imagem*/
  if(savedtheme === 'dark'){
    body.classList.add('dark');
    mode.classList.replace('fa-moon', 'fa-sun');
    
  } else {
    body.classList.remove('dark');
    mode.classList.replace('fa-sun', 'fa-moon');
  }
});
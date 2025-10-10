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
  let valor = document.getElementById('input-tarefa').value.trim();

  /* se o campo estiver vazio, alerta o usuário */
  if(valor === ''){
    alert('Informe uma tarefa!');
    return; /* sai dda função e não continua */
  }

  /* Verifica se já existe algo salvo no localStorage(ou cria um array vazio) */
  let listadeTarefas =JSON.parse(localStorage.getItem('tarefas')) || [];

  /* Adiciona a nova tarefa ao array */
  listadeTarefas.push(valor);

  /* Salva novamente no localStorage, converteendo o array para texto JSON */
  localStorage.setItem('tarefas', JSON.stringify(listadeTarefas));

  /* Limpa o campo de input para o usuário digitar outra tarefa */
  document.getElementById('input-tarefa').value = '';
  
  /* Atualiza a area de exibição chamando a função que mostra as tarefas */
  mostraTarefa();
}

/* Função seaparada para mostrar as tarefas na tela */
function mostraTarefa() {
  let tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
  let saida = document.getElementById('tarefas');// <ul id="tarefas">

  /* Limpa o conteúdo antes de mostrar */
  saida.innerHTML = '';

  /* Cria uma lista <ul> com cada tarefa dentro de um <li> */
  tarefasSalvas.forEach(function (tarefa, index) {
    /* cria o elemento <li> */
    const li = document.createElement('li');
    li.textContent = tarefa;
    /* adiciona comportamento: riscar ao clicar */
    li.addEventListener('click', function(){
      li.classList.toggle('done');// usa sua classe do CSS
    });
      /* duplo clique: remove a tarefa e salva novamente */
      li.addEventListener('dblclick', function(){
        tarefasSalvas.splice(index,1); // remove do array
        localStorage.setItem('tarefas',JSON.stringify(tarefasSalvas));
      });

      saida.appendChild(li);
    
  });
}

/* Chama a função assim que a página abrir, para carregar as tarefas antigas  */
document.addEventListener("DOMContentLoaded", mostraTarefa); 

/* Botão para limpar toda a lista */
document.getElementById('limpar').addEventListener('click', () => {
  localStorage.removeItem('tarefas');// apaga tudo do localStorage
  mostraTarefa();// limpa a tela
})
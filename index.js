/* Comentario em cima e conteudo do comentario abaixo */


/* Seleciona o botão de adicionar tarefa no HTML e guarda dentro da variável "botao" */
const botao = document.getElementById("botao");

/* Seleciona a lista aonde as tarefas vão aparecer e guarda dentro da variável */
const lista = document.getElementById("tarefas");

/* Seleciona o campo de digitação da tarefa e guarda dentro da variável input */
const input = document.getElementById("input-tarefa");

/* Adiciona um "ouvinte de evento(Event listener)" que vai executar a função adicionarTarefa() */
/* Toda vez que o usuario aperta o botão */
botao.addEventListener("click", adicionarTarefa);

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

const tarefa = document.querySelector("#tarefa");
const adicionar = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");

let tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];

// Carregar tarefas salvas
tarefas.forEach(function (tarefaSalva) {
  const textoTarefa = document.createElement("li");

  const textoElemento = document.createElement("span");
  textoElemento.textContent = tarefaSalva.nome;

  textoTarefa.appendChild(textoElemento);
  lista.appendChild(textoTarefa);

  const excluir = document.createElement("button");
  excluir.id = "excluir";
  excluir.textContent = "Excluir";
  textoTarefa.appendChild(excluir);

  excluir.addEventListener("click", function () {
    tarefas = tarefas.filter(function (item) {
      return item.id != tarefaSalva.id;
    });

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    textoTarefa.remove();
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarefaSalva.concluida;

  if (checkbox.checked) {
    textoElemento.style.textDecoration = "line-through";
    textoElemento.style.color = "black";
  } else {
    textoElemento.style.textDecoration = "none";
    textoElemento.style.color = "white";
  }

  checkbox.addEventListener("change", function () {
    tarefaSalva.concluida = checkbox.checked;

    if (checkbox.checked) {
      textoElemento.style.textDecoration = "line-through";
      textoElemento.style.color = "black";
    } else {
      textoElemento.style.textDecoration = "none";
      textoElemento.style.color = "white";
    }

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
  });

  textoTarefa.appendChild(checkbox);
});

// Adicionar novas tarefas
adicionar.addEventListener("click", function () {
  if (tarefa.value.trim() !== "") {
    const nomeTarefa = tarefa.value;

    const id = Date.now();

    const novaTarefa = {
      id: id,
      nome: nomeTarefa,
      concluida: false,
    };

    tarefas.push(novaTarefa);

    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));

    const textoTarefa = document.createElement("li");

    const textoElemento = document.createElement("span");
    textoElemento.textContent = nomeTarefa;

    textoTarefa.appendChild(textoElemento);
    lista.appendChild(textoTarefa);

    tarefa.value = "";

    const excluir = document.createElement("button");
    excluir.id = "excluir";
    excluir.textContent = "Excluir";

    textoTarefa.appendChild(excluir);

    excluir.addEventListener("click", function () {
      tarefas = tarefas.filter(function (item) {
        return item.id != id;
      });

      localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));

      textoTarefa.remove();
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    textoTarefa.appendChild(checkbox);

    checkbox.addEventListener("change", function () {
      novaTarefa.concluida = checkbox.checked;

      if (checkbox.checked) {
        textoElemento.style.textDecoration = "line-through";
        textoElemento.style.color = "black";
      } else {
        textoElemento.style.textDecoration = "none";
        textoElemento.style.color = "white";
      }

      localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
    });
  }
});

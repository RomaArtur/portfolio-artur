const botao = document.getElementById("modo__noturno");
const body = document.body;
const icone = botao.querySelector("i");

botao.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    icone.classList.remove("fa-moon");
    icone.classList.add("fa-sun");
    botao.textContent = "Modo Claro";
    botao.prepend(icone);
  } else {
    icone.classList.remove("fa-sun");
    icone.classList.add("fa-moon");
    botao.textContent = "Modo Escuro";
    botao.prepend(icone);
  }
});

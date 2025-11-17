document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/profile");

    if (!response.ok) {
      throw new Error("Erro ao buscar dados na API.");
    }

    const dados = await response.json();

    document.getElementById("id__nome").textContent = dados.name;
    document.getElementById("id__bio").textContent = dados.bio;

    document.getElementById("id-linkedin").href = dados.linkedinUrl;
    document.getElementById("id-github").href = dados.githubUrl;
    document.getElementById("id-curriculo").href = dados.resumeUrl;
    document.getElementById("id-curriculo").href = dados.curriculumVitaeUrl;
    document.getElementById("id-whatsapp").href = dados.whatsappUrl;

    console.log("Dados carregados com sucesso:", dados);
  } catch (error) {
    console.log("Algo deu errado:", error);
  }
});

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

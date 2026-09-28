const botaoMenu = document.querySelector(".menu-toggle");
const menuNav = document.querySelector("nav");

botaoMenu.addEventListener("click", function () {
  menuNav.classList.toggle("aberto");
});


const regexCPF = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
const regexCEP = /^\d{5}-?\d{3}$/;

function validarCampo(campo, regex) {
  if (!campo) return true;
  const valido = regex.test(campo.value.trim());
  if (valido) {
    campo.classList.remove("campo-invalido");
    campo.classList.add("campo-valido");
  } else {
    campo.classList.remove("campo-valido");
    campo.classList.add("campo-invalido");
  }
  return valido;
}

function salvarCadastro(dados) {
  const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
  cadastros.push(dados);
  localStorage.setItem("cadastros", JSON.stringify(cadastros));
}

function configurarFormulario() {
  const formulario = document.querySelector("form");
  if (!formulario) return;
const mensagemSucesso = document.getElementById("mensagem-sucesso");
const mensagemErro = document.getElementById("mensagem-erro");

  const campoCpf = document.getElementById("cpf");
  const campoTelefone = document.getElementById("telefone");
  const campoCep = document.getElementById("cep");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const cpfValido = validarCampo(campoCpf, regexCPF);
    const telefoneValido = validarCampo(campoTelefone, regexTelefone);
    const cepValido = validarCampo(campoCep, regexCEP);

    if (formulario.checkValidity() && cpfValido && telefoneValido && cepValido) {
      const novoCadastro = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: campoTelefone.value
      };
      salvarCadastro(novoCadastro);

      mensagemSucesso.style.display = "block";
      mensagemErro.style.display = "none";
    } else {
      mensagemErro.style.display = "block";
      mensagemSucesso.style.display = "none";
    }
  });
}

const conteudo = document.getElementById("conteudo");

const paginas = {
  index: "fragments/index.html",
  projetos: "fragments/projetos.html",
  cadastro: "fragments/cadastro.html",
  depoimentos: "fragments/depoimentos.html"
};

const depoimentos = [
  { nome: "Ana", texto: "Aqui encontrei apoio que não tinha em lugar nenhum." },
  { nome: "Carla", texto: "Trocar experiências com outras mães mudou minha rotina." },
  { nome: "Beatriz", texto: "Me senti acolhida desde o primeiro dia." }
];

function gerarDepoimentos() {
  const lista = document.getElementById("lista-depoimentos");
  if (!lista) return;

  const html = depoimentos.map(depoimento => `
    <div class="card">
      <h3>${depoimento.nome}</h3>
      <p>${depoimento.texto}</p>
    </div>
  `).join('');

  lista.innerHTML = html;
}

async function carregarPagina(nome) {
  try {
    const resposta = await fetch(paginas[nome]);
    const html = await resposta.text();
    conteudo.innerHTML = html;
    history.pushState({ pagina: nome }, "", `#${nome}`);

    if (nome === "depoimentos") {
      gerarDepoimentos();
    }
    if (nome === "cadastro") {
      configurarFormulario();
      aplicarMascaras();
    }
  } catch (erro) {
    conteudo.innerHTML = "<p>Não foi possível carregar a página.</p>";
  }
}

document.querySelectorAll("nav a[data-pagina]").forEach(function (link) {
  link.addEventListener("click", function (evento) {
    evento.preventDefault();
    const pagina = link.getAttribute("data-pagina");
    carregarPagina(pagina);
    menuNav.classList.remove("aberto");
  });
});

window.addEventListener("popstate", function (evento) {
  const pagina = evento.state ? evento.state.pagina : "index";
  carregarPagina(pagina);
});
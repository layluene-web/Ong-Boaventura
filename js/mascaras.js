function aplicarMascaraCPF() {
  const campoCpf = document.getElementById("cpf");
  if (!campoCpf) return;
  campoCpf.addEventListener("input", function () {
    let valor = campoCpf.value.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    campoCpf.value = valor;
  });
}

function aplicarMascaraCEP() {
  const campoCep = document.getElementById("cep");
  if (!campoCep) return;
  campoCep.addEventListener("input", function () {
    let valor = campoCep.value.replace(/\D/g, "").slice(0, 8);
    valor = valor.replace(/(\d{5})(\d{1,3})$/, "$1-$2");
    campoCep.value = valor;
  });
}

function aplicarMascaraTelefone() {
  const campoTel = document.getElementById("telefone");
  if (!campoTel) return;
  campoTel.addEventListener("input", function () {
    let valor = campoTel.value.replace(/\D/g, "").slice(0, 11);
    valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
    valor = valor.replace(/(\d{4,5})(\d{4})$/, "$1-$2");
    campoTel.value = valor;
  });
}

function aplicarMascaras() {
  aplicarMascaraCPF();
  aplicarMascaraCEP();
  aplicarMascaraTelefone();
}
const idEmpresa = sessionStorage.getItem("idEmpresa");

function retornarIndex() {
    sessionStorage.clear();
    window.location.href = "../index.html"
}

window.addEventListener("load", () => {
    if (!idEmpresa) {
        window.location.href = "../login.html";
    }
});

function redirecionarDashboard() {
    window.location.href = "../dashboard/dashboard.html";
}

function redirecionarPerfilEmpresa() {
    window.location.href = "../dashboard/perfil-empresa.html";
}

function redirecionarGerenciadorVacina() {
    window.location.href = "../dashboard/gerenciador-vacina.html";
}
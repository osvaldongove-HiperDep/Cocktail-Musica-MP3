/* ===== Cocktail Musica - Script Principal ===== */

let filtroAtual = "todos";
let termoBusca = "";

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    renderizarMusicas();
    setupMenu();
    setupSearch();
});

/* ---------- Menu Mobile ---------- */
function setupMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("navMobile");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        const icon = toggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });
}

function fecharMenu() {
    const nav = document.getElementById("navMobile");
    const toggle = document.getElementById("menuToggle");
    if (nav) nav.classList.remove("open");
    if (toggle) {
        const icon = toggle.querySelector("i");
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
    }
}

/* ---------- Pesquisa ---------- */
function setupSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") filtrarMusicas();
        filtrarMusicas();
    });
}

function filtrarMusicas() {
    const input = document.getElementById("searchInput");
    termoBusca = input ? input.value.trim().toLowerCase() : "";
    renderizarMusicas();
}

/* ---------- Filtros ---------- */
function aplicarFiltro(tipo) {
    filtroAtual = tipo;

    document.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filtro === tipo);
    });

    renderizarMusicas();
}

/* ---------- Renderização ---------- */
function getMusicasFiltradas() {
    let lista = [...musicas];

    // Filtro de busca
    if (termoBusca) {
        lista = lista.filter(m =>
            m.titulo.toLowerCase().includes(termoBusca) ||
            m.artista.toLowerCase().includes(termoBusca)
        );
    }

    // Filtro de secção
    if (filtroAtual === "destaque") {
        lista = lista.filter(m => m.destaque);
    } else if (filtroAtual === "recentes") {
        lista.sort((a, b) => new Date(b.data) - new Date(a.data));
    } else {
        // "todos": destaques primeiro, depois por data
        lista.sort((a, b) => {
            if (a.destaque && !b.destaque) return -1;
            if (!a.destaque && b.destaque) return 1;
            return new Date(b.data) - new Date(a.data);
        });
    }

    return lista;
}

function criarCard(musica) {
    const temVideo = musica.video && musica.video.trim() !== "";
    const destaqueClass = musica.destaque ? "destaque" : "";
    const badge = musica.destaque
        ? `<span class="badge-destaque">Destaque</span>`
        : "";

    const btnPromover = !musica.destaque
        ? `<a href="https://wa.me/258841460389?text=${encodeURIComponent(
              `Olá! Quero promover a música "${musica.titulo}" de ${musica.artista} por 500 MT.`
          )}" target="_blank" class="btn btn-promover-card">
               <i class="fas fa-rocket"></i> Promover por 500 MT
           </a>`
        : "";

    return `
        <div class="card ${destaqueClass}" 
             data-titulo="${musica.titulo.toLowerCase()}" 
             data-artista="${musica.artista.toLowerCase()}">
            ${badge}
            <div class="card-img">🎵</div>
            <h3>${escapeHtml(musica.titulo)}</h3>
            <p class="artista">${escapeHtml(musica.artista)}</p>
            
            <div class="stats">
                <span><i class="fas fa-play"></i> ${formatNumber(musica.plays)}</span>
                <span><i class="fas fa-download"></i> ${formatNumber(musica.downloads)}</span>
            </div>

            <audio controls preload="none">
                <source src="${musica.audio}" type="audio/mpeg">
                O teu navegador não suporta áudio.
            </audio>

            <div class="botoes">
                <a href="${musica.audio}" download class="btn">
                    <i class="fas fa-download"></i> MP3
                </a>
                ${temVideo ? `
                    <a href="${musica.video}" download class="btn btn-mp4">
                        <i class="fas fa-video"></i> MP4
                    </a>
                ` : ""}
            </div>
            ${btnPromover}
        </div>
    `;
}

function renderizarMusicas() {
    const listaCompleta = getMusicasFiltradas();
    const container = document.getElementById("listaMusicas");
    const containerDestaques = document.getElementById("listaDestaques");
    const semResultados = document.getElementById("semResultados");
    const resultadoPesquisa = document.getElementById("resultadoPesquisa");

    // Secção Destaques
    if (containerDestaques) {
        const soDestaques = musicas
            .filter(m => m.destaque)
            .sort((a, b) => new Date(b.data) - new Date(a.data));

        if (soDestaques.length === 0) {
            containerDestaques.innerHTML = `<p class="nota" style="grid-column:1/-1">Ainda não há músicas em destaque. Sê o primeiro a promover!</p>`;
        } else {
            containerDestaques.innerHTML = soDestaques.map(criarCard).join("");
        }
    }

    // Catálogo principal
    if (container) {
        if (listaCompleta.length === 0) {
            container.innerHTML = "";
            if (semResultados) semResultados.style.display = "block";
        } else {
            container.innerHTML = listaCompleta.map(criarCard).join("");
            if (semResultados) semResultados.style.display = "none";
        }
    }

    // Texto de resultado de pesquisa
    if (resultadoPesquisa) {
        if (termoBusca) {
            resultadoPesquisa.textContent = listaCompleta.length > 0
                ? `${listaCompleta.length} resultado(s) para "${termoBusca}"`
                : `Nenhum resultado para "${termoBusca}"`;
        } else {
            resultadoPesquisa.textContent = "";
        }
    }
}

/* ---------- Utilitários ---------- */
function formatNumber(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return n.toString();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

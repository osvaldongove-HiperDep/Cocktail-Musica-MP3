// Função de pesquisa - abre resultados no YouTube
function pesquisar() {
    const query = document.getElementById('searchInput').value.trim();
    
    if (query === '') {
        alert('Escreve o nome da música ou artista.');
        return;
    }
    
    // Abre a pesquisa no YouTube (conteúdo oficial)
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    window.open(url, '_blank');
}

// Permitir pesquisar com Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        pesquisar();
    }
});

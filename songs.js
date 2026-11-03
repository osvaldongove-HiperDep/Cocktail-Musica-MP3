/**
 * DADOS DAS MÚSICAS
 * -----------------
 * Para adicionar uma música nova:
 * 1. Coloca o ficheiro MP3 (e MP4 se existir) na pasta /musicas/
 * 2. Adiciona um objeto novo no array abaixo
 * 3. Guarda o ficheiro e atualiza a página
 */

const musicas = [
    {
        id: 1,
        titulo: "Exemplo Música",
        artista: "Artista Iniciante",
        audio: "musicas/exemplo1.mp3",
        video: "musicas/exemplo1.mp4",
        destaque: true,
        data: "2026-10-28",
        plays: 1240,
        downloads: 310
    },
    {
        id: 2,
        titulo: "Outra Música",
        artista: "Novo Talento",
        audio: "musicas/exemplo2.mp3",
        video: "musicas/exemplo2.mp4",
        destaque: false,
        data: "2026-10-25",
        plays: 890,
        downloads: 175
    },
    {
        id: 3,
        titulo: "Noite de Maputo",
        artista: "DJ Maputo",
        audio: "musicas/exemplo3.mp3",
        video: "",
        destaque: true,
        data: "2026-10-30",
        plays: 2100,
        downloads: 520
    },
    {
        id: 4,
        titulo: "Sonhos de Ouro",
        artista: "Lirica MZ",
        audio: "musicas/exemplo4.mp3",
        video: "musicas/exemplo4.mp4",
        destaque: false,
        data: "2026-10-20",
        plays: 450,
        downloads: 98
    }
];

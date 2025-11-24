const containerItem = document.querySelector("#container");
const campoBusca = document.querySelector("#campo-busca");

let data = [];

async function loadData() {
  const answer = await fetch("data.json");

  data = await answer.json();
  renderItems(data);
}

function startSearch() {
  const termoBusca = campoBusca.value.toLowerCase();
  const resultados = data.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) ||
      dado.musicas.some((musica) =>
        musica.titulo.toLowerCase().includes(termoBusca)
      )
  );

  renderItems(resultados);
}

function renderItems(renderedData) {
  containerItem.innerHTML = "";

  for (let album of renderedData) {
    let section = document.createElement("section");
    section.classList.add("container");

    // 1. Mapeia o array de músicas para um array de strings <li>
    const musicasHtml = album.musicas
      .map(
        (musica) => `
      <li>
        <a href="${musica.url}" target="_blank">${musica.titulo} <i class="fa-solid fa-link"></i></a>
      </li>
    `
      )
      .join(""); // 2. Junta todos os <li> em uma única string

    section.innerHTML = `
      <div class="container-item">
        <img src="${album.capa_url}" alt="${album.nome}" class="album-img" />
        <div class="album-desc">
          <h2 class="album-name">${album.nome}</h2>
          <p class="release-year">${album.ano_lancamento}</p>
          <button class="learn-more">Ver Musicas</button>
        </div>
      </div>
      <ul class="musics-list hidden">${musicasHtml}</ul> 
    `;

    containerItem.appendChild(section);
  }
}

containerItem.addEventListener("click", (event) => {
  // Verifica se o elemento clicado é o botão "Ver Musicas"
  if (event.target.classList.contains("learn-more")) {
    const button = event.target;
    // Encontra o elemento <section> mais próximo
    const section = button.closest("section.container");
    // Encontra a lista de musicas dentro da section
    const musicList = section.querySelector(".musics-list");
    musicList.classList.toggle("visible");
  }
});

loadData();

const screen = {
  userProfile: document.querySelector(".profile-data"),

  renderUser(user) {
    this.userProfile.innerHTML = `<div class ="info">
                                  <img src="${
                                    user.avatarUrl
                                  }" alt="Foto do perfil do usuário" />
                         <div class="data">
                             <h1>${
                               user.name ?? "Não possui nome cadastrado 😢"
                             }</h1>
                            <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                            <div class="follow">
                            <p>👥Seguidores</p>
                            <p>${user.followers}</p>
                            <p>👤Seguindo</p>
                            <p>${user.following}</p>
                            </div>                           
                          </div>
                        </div>`;

    let repositoriesItens = "";

    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href= "${repo.html_url}" target = "_blank"><div class="repositorie-name">${repo.name}</div> <div class="repositories-infos">👨‍💻${repo.language} 🍴${repo.forks} ⭐${repo.stargazers_count} 👀${repo.watchers}</div></a></li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class = "repositories section">
                            <h2>Repositórios</h2>
                            <ul>${repositoriesItens}</ul>       
                            </div>`;
    }

    let eventsItens = "";
    const getEventFilter = user.events;
    const eventFilter = getEventFilter.filter((evento) => {
      if (evento.type === "PushEvent" || evento.type === "CreateEvent") {
        return true;
      } else {
        return false;
      }
    });

    eventFilter.forEach((ev) => {
      let commitMessage = "";
      if (
        ev.payload.commits &&
        Array.isArray(ev.payload.commits) &&
        ev.payload.commits.length > 0
      ) {
        commitMessage = ev.payload.commits[0].message;
      }

      eventsItens += `<li class= "event-name">${ev.repo.name} - <span class= "event-message">${commitMessage}</span> </li>`;
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class = "repositories section">
                            <h2>Eventos</h2>
                            <ul class= "event-list">${eventsItens}</ul>
                            </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML =
      "<h3 style='color: red;'>Usuário não encontrado</h3>";
  },
};

export { screen };

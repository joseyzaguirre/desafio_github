$("form").submit(function(ev){
    ev.preventDefault();
    
    let nomUsuario = $("#nombre").val();
    let numPagina = $("#pagina").val();
    let repoPagina = $("#repoPagina").val();

    getUser(nomUsuario);
    getRepo(nomUsuario, numPagina, repoPagina);
});

async function getUser(username) {
    usuario_github = await request(username);
    
    $("#datosUser").html(" ");

    $("#datosUser").append(`
      <h1>Dato del Usuario</h1>
      <img src="${usuario_github.avatar_url}" alt="avatar" class="img-fluid w-50">
      <p>Nombre de usuario: ${usuario_github.name}</p>
      <p>Nombre de login: ${usuario_github.login}</p>
      <p>Cantidad de repositorios: ${usuario_github.public_repos}</p>
      <p>Localidad: ${usuario_github.location}</p>
      <p>Tipo de usuario: ${usuario_github.type}</p>
    `);

};

async function getRepo(username, page, perpage) {
    const repos = await request(`${username}/repos?page=${page}&per_page=${perpage}`);
    console.log(repos)

    $("#repos").html(" ")

    $("#repos").append(`
        <h1>Nombre de Repositorios</h1>
    `);

    for (repo of repos){
    $("#repos").append(`
        <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p> 
    `);
    };
}

async function request(path) {
    try {
        const datos = await fetch(`https://api.github.com/users/${path}`);
        const retorno = await datos.json();
        return retorno
    

    } catch (error) {
        console.log(error.message)
    }
};

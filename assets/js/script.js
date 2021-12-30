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

    $("#resultados").html(`
    <div class="col-6 text-left">
        <h1>Dato del Usuario</h1>
        <img src="${usuario_github.avatar_url}" alt="avatar" class="img-fluid w-50">
        <p>Nombre de usuario: ${usuario_github.name}</p>
        <p>Nombre de login: ${usuario_github.login}</p>
        <p>Cantidad de repositorios: ${usuario_github.public_repos}</p>
        <p>Localidad: ${usuario_github.location}</p>
        <p>Tipo de usuario: ${usuario_github.type}</p>
    </div>
    `)

};

async function getRepo(username, page, perpage) {
    const repos = await request(`${username}/repos?page=${page}&per_page=${perpage}`);
    console.log(repos)
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
